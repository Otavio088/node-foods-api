const Roles = require('../models/Roles');
const Modules = require('../models/Modules');
const ModulesRole = require('../models/ModulesRole');

const getAll = async () => {
    return await Roles.query()
        .select('id', 'name', 'type', 'created_at')
        .withGraphFetched('modules');
}

const getById = async (roleId) => {
    const role = await Roles.query()
        .select('id', 'name', 'type', 'created_at')
        .findById(roleId)
        .withGraphFetched('modules');


    if (!role)
        throw new Error('Tipo de Usuário inexistente!');

    return role;
}

const create = async (body) => {
    const existRole = await Roles.query()
        .select('id')
        .findOne({
            name: body.name
        });

    if (existRole)
        throw new Error('Já existe um Tipo de Usuário com este nome!');

    let role;
    await Roles.transaction(async trx => {
        role = await Roles.query()
            .insert({
                name: body.name,
                type: body.type
            });

        const modulesRoleToInsert = body.modules_ids.map((moduleId) => ({
            role_id: role.id,
            module_id: moduleId
        })) || [];

        await trx('modules_role').insert(modulesRoleToInsert);
    });

    const roleUser = await Roles.query()
        .select('id', 'name', 'type', 'created_at')
        .findById(role.id)
        .withGraphFetched('modules');

    return roleUser;
}

const update = async (body, roleId) => {
    let existRole = await Roles.query()
        .select('id')
        .whereNot('id', roleId)
        .findOne({
            name: body.name.trim()
        });

    if (existRole)
        throw new Error('Já existe um Tipo de Usuário com este nome!');

    const role = await Roles.query()
        .findById(roleId);

    if (!role)
        throw new Error('Tipo de Usuário inexistente!');

    const modulesExist = await Modules.query()
        .select('id')
        .whereIn('id', body.modules_ids);

    const modulesIds = modulesExist && modulesExist.length > 0 ? 
        modulesExist.map(m => m.id) : [];

    const modulesRoleUpdateMap = new Map();
    for (const moduleId of modulesIds) {
        const key = `${role.id}_${moduleId}`;

        modulesRoleUpdateMap.set(key, {
            role_id: role.id,
            module_id: moduleId
        });
    }

    await Roles.transaction(async trx => {
        await Roles.query()
            .patch({
                name: body.name ? body.name : role.name,
                type: body.type ? body.type : role.type
            })
            .where('id', roleId);

        const modulesRoleExists = await ModulesRole.query()
            .where('role_id', role.id);

        const modulesRoleExistsMap = new Map();
        for (const moduleRole of modulesRoleExists) {
            const key = `${moduleRole.role_id}_${moduleRole.module_id}`;
            modulesRoleExistsMap.set(key, moduleRole);
        }

        const modulesRoleToInsert = [];
        for (const [key, value] of modulesRoleUpdateMap) {
            if (!modulesRoleExistsMap.has(key)) {
                modulesRoleToInsert.push({
                    role_id: value.role_id,
                    module_id: value.module_id
                });
            }
        }

        const modulesRoleToDelete = [];
        for (const [key, value] of modulesRoleExistsMap) {
            if (!modulesRoleUpdateMap.has(key)) {
                modulesRoleToDelete.push(value.id);
            }
        }

        if (modulesRoleToInsert.length > 0) {
            await trx('modules_role').insert(modulesRoleToInsert);
        }

        if (modulesRoleToDelete.length > 0) {
            await ModulesRole.query()
                .delete()
                .whereIn('id', modulesRoleToDelete);
        }
    });

    const roleUser = await Roles.query()
        .select('id', 'name', 'type', 'created_at')
        .findById(role.id)
        .withGraphFetched('modules');

    return roleUser;
}

const remove = async (roleId) => {
    const existRole = await Roles.query()
        .select('id')
        .findOne({
            id: roleId
        });

    if (!existRole)
        throw new Error('Tipo de Usuário inexistente!');

    await Roles.query()
        .deleteById(roleId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
