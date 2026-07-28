const usersRepository = require('../repositories/users.repository');
const HttpError = require('../classes/HttpError');

const getAll = async () => {
    return usersRepository.getAll();
}

const getById = async (userId) => {
    const data = await usersRepository.getById(userId);

    if (!data)
        throw new HttpError('Usuário inexistente!', 404);

    delete data.password;

    return data;
}

const create = async (body) => {
    const userExist = await usersRepository.getByEmail(body.email.trim());

    if (userExist)
        throw new HttpError('Já existe um Usuário com este e-mail!', 409);

    const rolesIdsExist = await usersRepository.getRolesIdsExist(body.roles_ids);

    if (rolesIdsExist.length === 0)
        throw new HttpError('Nenhum role_id informado é válido. Envie IDs existentes!', 400);

    bodyFormatted.roles_ids = rolesIdsExist;

    const bodyFormatted = await normalizeData(body);

    const newUserId = await usersRepository.create(bodyFormatted);

    const data = await usersRepository.getById(newUserId);
    
    delete data.password;

    return data;
}

const update = async (body, userId) => {
    const userExist = await usersRepository.getById(userId);

    if (!userExist)
        throw new HttpError('Usuário inexistente!', 404);

    const bodyFormatted = await normalizeData(body, userExist);

    const userExistEmail = await usersRepository.getByEmail(bodyFormatted.email, userId);

    if (userExistEmail)
        throw new HttpError('Já existe um Usuário com este e-mail!', 409);

    await usersRepository.update(bodyFormatted, userId);

    const data =  await usersRepository.getById(userId);

    delete data.password;

    return data;
}

const remove = async (userId) => {
    const data = await usersRepository.getById(userId);

    if (!data)
        throw new HttpError('Usuário inexistente!', 404);

    await usersRepository.remove(userId);
}

const normalizeData = async (body, user = null) => {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt();
    const password = body.password ? String(body.password).trim() : '';

    return {
        name: body.name ? body.name.trim() 
            : user?.name ? user.name : '',
        roles_ids: body.roles_ids && body.roles_ids.length > 0 ? body.roles_ids 
            : user?.roles && user?.roles.length > 0 ? user.roles.map(role => role.id)
            : [],
        email: body.email ? body.email.trim()
            : user?.email ? user.email : '',
        password:password ? await bcrypt.hash(password, salt)
            : user?.password ? user.password : '',
        active: body.active !== undefined ? body.active 
            : user?.active !== undefined ? user.active 
            : true,
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}