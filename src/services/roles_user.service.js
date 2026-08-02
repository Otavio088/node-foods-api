const rolesUserRepository = require('../repositories/roles_user.repository');
const HttpError = require('../classes/HttpError');

const getAll = async () => {
    return rolesUserRepository.getAll();
}

const getById = async (roleId) => {
    const data = await rolesUserRepository.getById(roleId);

    if (!data)
        throw new HttpError('Papel de Usuário inexistente!', 404);

    return data;
}

const create = async (body) => {
    const roleExist = await rolesUserRepository.getByName(body.name.trim());

    if (roleExist)
        throw new HttpError('Já existe um Tipo de Usuário com este nome!', 409);

    const bodyFormatted = normalizeData(body);

    const newRoleId = await rolesUserRepository.create(bodyFormatted);

    return rolesUserRepository.getById(newRoleId);
}

const update = async (body, roleId) => {
    const roleExist = await rolesUserRepository.getById(roleId);

    if (!roleExist)
        throw new HttpError('Papel de Usuário inexistente!', 404);

    if (body.name) {
        const roleExistEmail = await rolesUserRepository.getByName(body.name.trim(), roleId);

        if (roleExistEmail)
            throw new HttpError('Já existe um Papel de Usuário com este nome!', 409);
    }

    const bodyFormatted = normalizeData(body, roleExist);

    await rolesUserRepository.update(bodyFormatted, roleId);

    return rolesUserRepository.getById(roleId);
}

const remove = async (roleId) => {
    const roleExist = await rolesUserRepository.getById(roleId);

    if (!roleExist)
        throw new HttpError('Papel de Usuário inexistente!', 404);

    rolesUserRepository.remove(roleId);
}

function normalizeData (body, role = null) {
    return {
        name: body.name ? body.name.trim() 
            : role?.name ? role.name : '',
        modules_ids: body.modules_ids ? body.modules_ids 
            : role?.modules ? role.modules.map(m => m.id) : []
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
