const Roles = require('../models/Roles');
const Modules = require('../models/Modules');
const ModulesRole = require('../models/ModulesRole');

const getAll = async () => {
    return Roles.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .withGraphFetched('modules');
}

const getById = async (roleId) => {
    return Roles.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .findById(roleId)
        .withGraphFetched('modules');
}

const getByIds = async (rolesIds) => {
    return Roles.query()
        .select('id')
        .whereIn('id', rolesIds);
}

const getByName = async (name, roleId = null) => {
    const query = Roles.query()
        .select('id')
        .findOne({ name });

    if (roleId)
        query.whereNot('id', roleId);

    return query;
}

const create = async (body) => {
    let role;

    await Roles.transaction(async trx => {
        role = await Roles.query(trx)
            .insert({
                name: body.name
            });

        const modulesRoleToInsert = body.modules_ids.map((moduleId) => ({
            role_id: role.id,
            module_id: moduleId
        })) || [];

        await trx('modules_role').insert(modulesRoleToInsert);
    });

    return role.id;
}

const update = async (body, roleId) => {
    const modulesExist = await Modules.query()
        .select('id')
        .whereIn('id', body.modules_ids);

    const modulesIds = modulesExist && modulesExist.length > 0 ? 
        modulesExist.map(m => m.id) : [];

    const modulesRoleUpdateMap = new Map();
    for (const moduleId of modulesIds) {
        const key = `${roleId}_${moduleId}`;

        modulesRoleUpdateMap.set(key, {
            role_id: roleId,
            module_id: moduleId
        });
    }

    await Roles.transaction(async trx => {
        await Roles.query(trx)
            .patch({ name: body.name })
            .where('id', roleId);

        const modulesRoleExists = await ModulesRole.query(trx)
            .where('role_id', roleId);

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

        const modulesRoleIdsToDelete = [];
        for (const [key, value] of modulesRoleExistsMap) {
            if (!modulesRoleUpdateMap.has(key)) {
                modulesRoleIdsToDelete.push(value.id);
            }
        }

        if (modulesRoleToInsert.length > 0)
            await trx('modules_role').insert(modulesRoleToInsert);

        if (modulesRoleIdsToDelete.length > 0)
            await ModulesRole.query(trx).delete().whereIn('id', modulesRoleIdsToDelete);
    });
}

const remove = async (roleId) => {
    Roles.query()
        .deleteById(roleId);
}

module.exports = {
    getAll,
    getById,
    getByIds,
    getByName,
    create,
    update,
    remove
}
