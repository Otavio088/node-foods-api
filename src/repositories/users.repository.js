const Users = require('../models/Users');
const Roles = require('../models/Roles');
const RolesUser = require('../models/RolesUser');

const getAll = async () => {
    return Users.query()
        .select('id', 'name', 'email', 'active', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('roles.modules');
}

const getById = async (userId) => {
    return Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findById(userId)
        .whereNull('deleted_at')
        .withGraphFetched('roles.modules');
}

const getByEmail = async (email, userId = null) => {
    const query = Users.query()
        .select('id')
        .findOne({ email })
        .whereNull('deleted_at');

    if (userId)
        query.whereNot('id', userId);

    return query;
}

const getRolesIdsExist = async (rolesIds) => {
    const rolesExist = await Roles.query()
        .select('id')
        .whereIn('id', rolesIds);

    return rolesExist && rolesExist.length > 0 ?
        rolesExist.map(r => r.id) : [];
}

const create = async (body) => {
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
        }));
console.log('rolesUserToInsert: ',rolesUserToInsert);
        if (Array.isArray(rolesUserToInsert) && rolesUserToInsert.length > 0)
            await trx('roles_user').insert(rolesUserToInsert);
    });

    return user.id;
}

const update = async (body, userId) => {
    const rolesExist = await Roles.query()
        .select('id')
        .whereIn('id', body.roles_ids);

    const rolesIds = rolesExist && rolesExist.length > 0 ?
        rolesExist.map(r => r.id) : [];

    const rolesUserUpdateMap = new Map();
    for (const roleId of rolesIds) {
        const key = `${userId}_${roleId}`;
        rolesUserUpdateMap.set(key, {
            user_id: userId,
            role_id: roleId
        });
    }

    await Users.transaction(async trx => {
        await Users.query(trx)
            .patch({
                name: body.name,
                email: body.email,
                password: body.password,
                active: body.active,
            })
            .where('id', userId);

        const rolesUser = await RolesUser.query(trx)
            .where('user_id', userId);

        const rolesUserMap = new Map();
        for (const roleUser of rolesUser) {
            const key = `${roleUser.user_id}_${roleUser.role_id}`;
            rolesUserMap.set(key, roleUser);
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
}

const remove = async (userId) => {
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
    getByEmail,
    getRolesIdsExist,
    create,
    update,
    remove
}