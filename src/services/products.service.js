const productsRepository = require('../repositories/products.repository');

const getAll = async () => {
    const data = await productsRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhum Produto foi encontrado!',
            data: []
        }
    }

    return {
        message: 'Produtos encontrados com sucesso!',
        data: data
    }
}

const getById = async (productId) => {
    const data = await productsRepository.getById(productId);

    return {
        message: 'Produto encontrado com sucesso!',
        data: data
    }
}

const create = async (body) => {
    const bodyFormatted = formatBody(body);

    const data = await productsRepository.create(bodyFormatted);

    return {
        message: 'Produto cadastrado com sucesso!',
        data: data
    }
}

const update = async (body, productId) => {
    const bodyFormatted = formatBody(body);

    const data = await productsRepository.update(bodyFormatted, productId);

    return {
        message: 'Produto atualizado com sucesso!',
        data: data
    }
}

const remove = async (productId) => {
    await productsRepository.remove(productId);

    return {
        message: 'Produto excluído com sucesso!'
    }
}

function formatBody (body) {
    const productName = body.name.trim();
    const productDescription = body.description ? body.description.trim() : '';

    const bodyFormatted = {
        name: productName,
        description: productDescription,
        image: body.image ? body.image : '',
        price: body.price,
        user_id: body.user_id
    }

    return bodyFormatted;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
