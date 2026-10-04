const Orders = require('../models/Orders');
const OrderItems = require('../models/OrderItems');
const OrderItemExtraAddition = require('../models/OrderItemExtraAdditions');

const getAll = async () => {
    return Orders.query()
        .select('id', 'type', 'table_number', 'city', 'street', 'neighborhood', 'house_number', 
            'buyer_name', 'value_total', 'obs', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('[user(defaultSelectsUser), items(defaultSelectsItems).order_item_extra_additions(defaultSelectsExtraAdditions)]');
}

const getById = async (id) => {
    return Orders.query()
        .select('id', 'type', 'table_number', 'city', 'street', 'neighborhood', 'house_number', 
            'buyer_name', 'value_total', 'obs', 'created_at', 'updated_at')
        .findById(id)
        .whereNull('deleted_at')
        .withGraphFetched('[user(defaultSelectsUser), items(defaultSelectsItems).[product(defaultSelectsProducts), order_item_extra_additions(defaultSelectsExtraAdditions)]]');
}

const create = async (bodyOrder, bodyItems) => {
    let order;

    await Orders.transaction(async trx => {
        order = await Orders.query(trx)
            .insert(bodyOrder);

        const items = bodyItems.map((item) => ({
            order_id: order.id,
            product_id: item.product_id,
            product_quantity: item.product_quantity,
            value: item.value,
            value_total: item.value_total,
            obs: item.obs
        }));

        await trx('order_items').insert(items);

        const newItems = await OrderItems.query(trx)
            .select('id', 'product_id')
            .where('order_id', order.id);

        const itemsMap = new Map();
        for (const item of newItems) {
            itemsMap.set(item.product_id, item.id);
        }

        const extraAddition = bodyItems.flatMap(item => {
            const orderItemId = itemsMap.get(item.product_id);

            return item.extra_addition.map(addition => ({
                order_item_id: orderItemId,
                name: addition.name,
                quantity: addition.quantity,
                value: addition.value
            }));
        });

        await trx('order_item_extra_additions').insert(extraAddition);
    });

    return order.id;
}

const update = async (id, bodyOrder, bodyItems, clear) => {
    await Orders.transaction(async trx => {
        await Orders.query(trx)
            .patch(bodyOrder)
            .where('id', id);

        // Items

        const items = bodyItems.map((item) => ({
            id: item?.id ? item.id : undefined,
            order_id: id,
            product_id: item.product_id,
            product_quantity: item.product_quantity,
            value: item.value,
            value_total: item.value_total,
            obs: item.obs
        }));

        const itemsToInsert = items.filter(item => !item.id);
        const itemsToUpdate = items.filter(item => item.id).map(item => ({
            order_id: id,
            product_id: item.product_id,
            product_quantity: item.product_quantity,
            value: item.value,
            value_total: item.value_total,
            obs: item.obs
        }));
        const itemsIdsToUpdate = items.map(item => item.id).filter(Boolean);

        if (clear) {
            await OrderItems.query(trx)
                .delete()
                .where('order_id', id);
        }

        if (itemsToInsert.length > 0)
            await trx('order_items').insert(itemsToInsert);

        if (itemsToUpdate.length > 0) {
            await OrderItems.query(trx)
                .delete()
                .whereIn('id', itemsIdsToUpdate);

            await trx('order_items').insert(itemsToUpdate);
        }

        // Adições extras

        const allItems = await OrderItems.query(trx)
            .select('id', 'product_id')
            .where('order_id', id);

        const itemsMap = new Map();
        for (const item of allItems) {
            itemsMap.set(item.product_id, item.id);
        }

        const extraAdditions = bodyItems.flatMap(item => {
            const orderItemId = itemsMap.get(item.product_id);

            return item.extra_addition.map(addition => ({
                id: addition?.id ? addition.id : undefined,
                order_item_id: orderItemId,
                name: addition.name,
                quantity: addition.quantity,
                value: addition.value
            }));
        });

        const extraAdditionToInsert = extraAdditions.filter(extraAddition => !extraAddition.id);
        const extraAdditionToUpdate = extraAdditions.filter(extraAddition => extraAddition.id).map(extraAddition => ({
            order_item_id: extraAddition.order_item_id,
            name: extraAddition.name,
            quantity: extraAddition.quantity,
            value: extraAddition.value
        }));
        const extraAdditionIdsToUpdate = items.map(extraAddition => extraAddition.id).filter(Boolean);

        if (clear) {
            const orderItemsIds = extraAdditions.map(extraAddition => extraAdditions.order_item_id).filter(Boolean);
            console.log('orderItemsIds: ', orderItemsIds);
            await OrderItemExtraAddition.query(trx)
                .delete()
                .whereIn('order_item_id', orderItemsIds);
        }

        if (extraAdditionToInsert.length > 0)
            await trx('order_item_extra_additions').insert(extraAdditionToInsert);

        if (extraAdditionToUpdate.length > 0) {
            await OrderItemExtraAddition.query(trx)
                .delete()
                .whereIn('id', extraAdditionIdsToUpdate);

            await trx('order_item_extra_additions').insert(extraAdditionToUpdate);
        }
    });
}

const remove = async (id) => {
    await Orders.query()
        .patch({ deleted_at: new Date() })
        .where('id', id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
