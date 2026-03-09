const Roles = require('../models/Roles');

const getAll = async () => {
    return await Roles.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('modules');
}

const create = async (body) => {
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
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .findById(role.id)
        .withGraphFetched('modules');

    return roleUser;
}

module.exports = {
    getAll,
    create
}