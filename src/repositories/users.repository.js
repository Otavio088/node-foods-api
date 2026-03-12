const Users = require('../models/Users');
const Roles = require('../models/Roles');
const RolesUser = require('../models/RolesUser');

const getAll = async () => {
    return await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('roles.modules');
}

const getById = async (userId) => {
    const user = await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findById(userId)
        .whereNull('deleted_at')
        .withGraphFetched('roles.modules');


    if (!user)
        throw new Error('Usuário inexistente!');

    return user;
}

const getByLogin = async (password, email) => {
    const user = await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findOne({
            email: email.trim(),
            deleted_at: null
        })
        .withGraphFetched('roles.modules');


    if (!user)
        throw new Error('E-mail de Usuário inexistente!');

    const bcrypt = require('bcrypt');

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
        throw new Error('Senha incorreta!');
    

    return user;
}

const create = async (body) => {
    const existUser = await Users.query()
        .select('id')
        .findOne({
            email: body.email
        });

    if (existUser)
        throw new Error('Já existe um Usuário com este e-mail!');

    let user;
    await Users.transaction(async trx => {
        user = await Users.query(trx)
            .insert({
                name: body.name,
                email: body.email,
                password: body.password,
                active: body.active
            });

        const rolesUserToInsert = body.roles_ids.map((roleId) => ({
            user_id: user.id,
            role_id: roleId
        })) || [];

        if (Array.isArray(rolesUserToInsert) && rolesUserToInsert.length > 0) {
            await trx('roles_user').insert(rolesUserToInsert);
        }
    });

    const newUser = await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findById(user.id)
        .withGraphFetched('roles.modules');

    return newUser;
}

const update = async (body, userId) => {
    const existOtherUser = await Users.query()
        .select('id')
        .whereNot('id', userId)
        .findOne({
            email: body.email
        });

    if (existOtherUser)
        throw new Error('Já existe um Usuário com este e-mail!');

    const user = await Users.query()
        .findById(userId)
        .whereNull('deleted_at');

    if (!user)
        throw new Error('Usuário inexistente!');

    const rolesExist = await Roles.query()
        .select('id')
        .whereIn('id', body.roles_ids);

    const rolesIds = rolesExist && rolesExist.length > 0 ?
        rolesExist.map(r => r.id) : [];

    const rolesUserUpdateMap = new Map();
    for (const roleId of rolesIds) {
        const key = `${user.id}_${roleId}`;
        rolesUserUpdateMap.set(key, {
            user_id: user.id,
            role_id: roleId
        });
    }

    await Users.transaction(async trx => {
        await Users.query(trx)
            .patch({
                name: body.name ? body.name : user.name,
                email: body.email ? body.email : user.email,
                password: body.password ? body.password : user.password,
                active: body.active !== undefined ? body.active : user.active,
            })
            .where('id', userId);

        const rolesUser = await RolesUser.query(trx)
            .where('user_id', user.id);

        const rolesUserMap = new Map();
        for (const moduleRole of rolesUser) {
            const key = `${moduleRole.role_id}_${moduleRole.module_id}`;
            rolesUserMap.set(key, moduleRole);
        }

        const rolesUserToInsert = [];
        for (const [key, value] of rolesUserUpdateMap) {
            if (!rolesUserMap.has(key)) {
                rolesUserToInsert.push({
                    user_id: value.user_id,
                    role_id: value.role_id
                });
            }
        }

        const rolesUserToDelete = [];
        for (const [key, value] of rolesUserMap) {
            if (!rolesUserUpdateMap.has(key)) {
                rolesUserToDelete.push(value.id);
            }
        }

        if (rolesUserToInsert.length > 0) {
            await trx('roles_user').insert(rolesUserToInsert);
        }

        if (rolesUserToDelete.length > 0) {
            await RolesUser.query(trx)
                .delete()
                .whereIn('id', rolesUserToDelete);
        }
    });

    const updatedUser = await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findById(user.id)
        .withGraphFetched('roles.modules');

    return updatedUser;
}

const remove = async (userId) => {
    const existUser = await Users.query()
        .select('id')
        .findOne({
            id: userId,
            deleted_at: null
        });

    if (!existUser)
        throw new Error('Usuário inexistente!');

    await Users.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', userId)
        .whereNull('deleted_at');
}

module.exports = {
    getAll,
    getById,
    getByLogin,
    create,
    update,
    remove
}