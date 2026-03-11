const Users = require('../models/Users');

const getAll = async () => {
    const users = Users.query()
        .whereNull('deleted_at');

    return users;
}

const create = async (body) => {
    console.log('body: ', body);

    const existUser = await Users.query()
        .select('id')
        .findOne({
            email: body.email
        });

    if (existUser)
        throw new Error('Já existe um Usuário com este e-mail!');

    let role;
    await Users.transaction(async trx => {
        role = await Users.query()
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

module.exports = {
    getAll,
    create
}