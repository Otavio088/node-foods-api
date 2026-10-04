const HttpError = require('../classes/HttpError');
const ordersRepository = require('../repositories/orders.repository');
const productsRepository = require('../repositories/products.repository');

const getAll = async () => {
    return ordersRepository.getAll();
}

const getById = async (id) => {
    const data = await ordersRepository.getById(id);

    if (!data)
        throw new HttpError('Pedido inexistente!', 400);

    return data;
}

const create = async (body) => {
    const bodyFormatted = normalizeData(body);

    const productsExist = await productsRepository.getByIds(bodyFormatted.items.map(item => item.product_id));
    const productsExistIds = productsExist.map(p => p.id);

    bodyFormatted.items = bodyFormatted.items.filter(item => productsExistIds.includes(item.product_id));

    if (!bodyFormatted.items.length)
        throw new HttpError('Nenhum produto enviado é válido!', 400);

    calculateValuesItems(productsExist, bodyFormatted.items);

    calculateValueOrder(bodyFormatted.order, bodyFormatted.items);

    const newOrderId = await ordersRepository.create(bodyFormatted.order, bodyFormatted.items);

    return ordersRepository.getById(newOrderId);
}

const update = async (body, id) => {
    const orderExist = await ordersRepository.getById(id);

    if (!orderExist)
        throw new HttpError('Pedido inexistente!', 400);

    const bodyFormatted = normalizeData(body, orderExist);

    const productsExist = await productsRepository.getByIds(bodyFormatted.items.map(item => item.product_id));
    const productsExistIds = productsExist.map(p => p.id);

    bodyFormatted.items = bodyFormatted.items.filter(item => productsExistIds.includes(item.product_id));

    if (!bodyFormatted.items.length)
        throw new HttpError('Nenhum produto enviado é válido!', 400);

    calculateValuesItems(productsExist, bodyFormatted.items);

    calculateValueOrder(bodyFormatted.order, bodyFormatted.items);

    await ordersRepository.update(id, bodyFormatted.order, bodyFormatted.items, bodyFormatted.clear);

    return ordersRepository.getById(id);
}

const remove = async (id) => {
    const orderExist = await ordersRepository.getById(id);

    if (!orderExist)
        throw new HttpError('Pedido inexistente!', 400);

    ordersRepository.remove(id);
}

function normalizeData(body, order = null) {
    const orderNormalized = {
        user_id: body.user_id ? body.user_id
            : order?.user_id ? order.user_id : 0,
        type: body.type ? body.type.trim()
            : order?.type ? order.type : '',
        table_number: body.table_number ? body.table_number
            : order?.table_number ? order.table_number : null,
        city: body.city ? body.city.trim()
            : order?.city ? order.city : null,
        street: body.street ? body.street.trim()
            : order?.street ? order.street : null,
        neighborhood: body.neighborhood ? body.neighborhood.trim()
            : order?.neighborhood ? order.neighborhood : null,
        house_number: body.house_number ? body.house_number.trim()
            : order?.house_number ? order.house_number : null,
        buyer_name: body.buyer_name ? body.buyer_name.trim()
            : order?.buyer_name ? order.buyer_name : '',
        obs: body.obs ? body.obs
            : order?.buyer_name ? order?.buyer_name : ''
    }

    if (orderNormalized.type === 'dine_in' || orderNormalized === 'pickup') {
        orderNormalized.city = null;
        orderNormalized.street = null;
        orderNormalized.neighborhood = null;
        orderNormalized.house_number = null;
    } else if (orderNormalized === 'pickup' || orderNormalized === 'delivery') {
        orderNormalized.table_number = null;
    }

    let itemsMap;
    if (order?.items && order.items.length > 0) {
        itemsMap = new Map(
            order.items.map(item => [item.id, item])
        );
    }

    const itemsNormalized = body.items.map(item => {
        let existingItem;
        if (itemsMap) {
            existingItem = itemsMap.get(item.id);
        }

        const extraAdditionMap = new Map((existingItem?.order_item_extra_additions || [])
            .map(addition => [addition.id, addition]));

        return {
            id: existingItem?.id ? existingItem.id : undefined,
            product_id: item.product_id ? item.product_id
                : existingItem?.product_id ? existingItem.product_id : 0,
            product_quantity: item.quantity ? item.quantity
                : existingItem?.product_quantity ? existingItem.product_quantity : 0,
            obs: item.obs ? item.obs
                : existingItem?.obs ? existingItem.obs : '',
            extra_addition: item.extra_addition && item.extra_addition.length > 0
                ? item.extra_addition.map(addition => {
                    const existingAddition = extraAdditionMap.get(addition.id);

                    return {
                        id: existingAddition?.id ? existingAddition.id : undefined,
                        name: addition.name ? addition.name.trim()
                            : existingAddition?.name ? existingAddition.name
                            : '',
                        value: addition.value ? addition.value 
                            : existingAddition?.value ? existingAddition.value
                            : 0,
                        quantity: addition.quantity ? addition.quantity 
                            : existingAddition?.quantity ? existingAddition.quantity
                            : 0

                    };
                })
                : existingItem?.order_item_extra_additions ? existingItem.order_item_extra_additions : []
        };
    });

    return {
        order: orderNormalized,
        items: itemsNormalized,
        clear: body?.clear || false
    }
}

// Cálculo do valor de item com quantidade e valor total com adição extra
function calculateValuesItems(products, items) {
    const productsMap = new Map();

    for (const product of products) {
        productsMap.set(product.id, product.price);
    }

    for (const item of items) {
        const price = productsMap.get(item.product_id);

        item.value = price * item.product_quantity;
        item.value_total = item.value + item.extra_addition.reduce((acc, addition) => 
            acc + (addition.value * addition.quantity),
        0);
    }
}

// Calcula o valor total do pedido
function calculateValueOrder(order, items) {
    order.value_total = items.reduce((acc, item) => 
        acc + item.value_total,
    0);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
