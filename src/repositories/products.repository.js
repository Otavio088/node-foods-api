const Products = require('../models/Products');
const ProductIngredients = require('../models/ProductIngredients');

const getAll = async () => {
    return Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');
}

const getById = async (productId) => {
    return Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productId)
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');
}

const create = async (body) => {
    let product;

    await Products.transaction(async trx => {
        product = await Products.query(trx)
            .insert({
                name: body.name,
                price: body.price,
                user_id: body.user_id,
                description: body.description,
                image: body.image,
            });

        if (body.ingredients.length > 0) {
            const productIngredients = body.ingredients.map((i) => ({
                product_id: product.id,
                ingredient_id: i.ingredient_id,
                quantity: i.quantity
            }));

            await trx('product_ingredients').insert(productIngredients);
        }
    });

    return product.id;
}

const update = async (body, productId) => {
    const productIngredientsToUpdateMap = new Map();
    for (const ingredient of body.ingredients) {
        const key = `${productId}_${ingredient.ingredient_id}`;

        productIngredientsToUpdateMap.set(key, {
            product_id: productId,
            ingredient_id: ingredient.ingredient_id,
            quantity: Number(ingredient.quantity)
        });
    }

    await Products.transaction(async trx => {
        await Products.query(trx)
            .patch({
                name: body.name,
                price: body.price,
                user_id: body.user_id,
                description: body.description,
                image: body.image,
            })
            .where('id', productId);

        const productIngredientsExist = await ProductIngredients.query(trx)
            .select('id', 'product_id', 'ingredient_id', 'quantity')
            .where('product_id', productId);

        const productIngredientsExistMap = new Map();
        for (const productIngredient of productIngredientsExist) {
            const key = `${productIngredient.product_id}_${productIngredient.ingredient_id}`;

            productIngredientsExistMap.set(key, {
                id: productIngredient.id,
                product_id: productIngredient.product_id,
                ingredient_id: productIngredient.ingredient_id,
                quantity: Number(productIngredient.quantity)
            });
        }

        const productIngredientsToInsert = [];
        const productIngredientsToUpdate = [];
        for (const [key, value] of productIngredientsToUpdateMap) {
            if (!productIngredientsExistMap.has(key)) {
                productIngredientsToInsert.push({
                    product_id: value.product_id,
                    ingredient_id: value.ingredient_id,
                    quantity: Number(value.quantity)
                });
            } else if (productIngredientsExistMap.has(key) && Number(productIngredientsExistMap.get(key).quantity) !== Number(value.quantity)) {
                productIngredientsToUpdate.push({
                    product_id: value.product_id,
                    ingredient_id: value.ingredient_id,
                    quantity: Number(value.quantity)
                });
            }
        }

        const productIngredientsIdsToDelete = [];
        for (const [key, value] of productIngredientsExistMap) {
            if (!productIngredientsToUpdateMap.has(key)) {
                productIngredientsIdsToDelete.push(value.id);
            }
        }

        if (productIngredientsToInsert.length > 0)
            await trx('product_ingredients').insert(productIngredientsToInsert);

        if (productIngredientsToUpdate.length > 0) {
            for (const productIngredient of productIngredientsToUpdate) {
                await ProductIngredients.query(trx)
                    .patch({
                        quantity: productIngredient.quantity
                    })
                    .where('product_id', productIngredient.product_id)
                    .where('ingredient_id', productIngredient.ingredient_id);
            }
        }

        if (productIngredientsIdsToDelete.length > 0)
            await ProductIngredients.query(trx).delete().whereIn('id', productIngredientsIdsToDelete);
    });
}

const remove = async (productId) => {
    await Products.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', productId);

    ProductIngredients.query()
        .delete()
        .where('product_id', productId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
