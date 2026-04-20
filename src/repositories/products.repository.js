const Products = require('../models/Products');
const ProductIngredients = require('../models/ProductIngredients');

const getAll = async () => {
    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');
}

const getById = async (productId) => {
    const product = await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productId)
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');


    if (!product)
        throw new Error('Produto inexistente!');

    return product;
}

const create = async (body) => {
    let product;
    await Products.transaction(async trx => {
        product = await Products.query(trx)
            .insert(body.data);

        if (body.ingredients.length > 0) {
            const productIngredients = body.ingredients.map((i) => ({
                product_id: product.id,
                ingredient_id: i.ingredient_id,
                quantity: i.quantity
            }));

            await trx('product_ingredients').insert(productIngredients);
        }
    });

    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(product.id)
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');
}

const update = async (body, productId) => {
    const productToUpdate = await Products.query()
        .select('id')
        .findById(productId)
        .whereNull('deleted_at');

    if (!productToUpdate)
        throw new Error('Produto inexistente!');

    // Ingredientes enviados para update
    const productIngredientsToUpdateMap = new Map();
    for (const ingredient of body.ingredients) {
        const key = `${productToUpdate.id}_${ingredient.ingredient_id}`;

        productIngredientsToUpdateMap.set(key, {
            product_id: productToUpdate.id,
            ingredient_id: ingredient.ingredient_id,
            quantity: Number(ingredient.quantity)
        });
    }

    await Products.transaction(async trx => {
        await Products.query(trx)
            .patch(body.data)
            .where('id', productToUpdate.id);

        // Ingredientes de Produtos que já existem
        const productIngredientsExist = await ProductIngredients.query(trx)
            .select('id', 'product_id', 'ingredient_id', 'quantity')
            .where('product_id', productToUpdate.id);

        // Organiza formato map
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

        // Validação para inserções e atualizações
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

        // Validação para deleções
        const productIngredientsIdsToDelete = [];
        for (const [key, value] of productIngredientsExistMap) {
            if (!productIngredientsToUpdateMap.has(key)) {
                productIngredientsIdsToDelete.push(value.id);
            }
        }

        if (productIngredientsToInsert.length > 0) {
            await trx('product_ingredients').insert(productIngredientsToInsert);
        }

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

        if (productIngredientsIdsToDelete.length > 0) {
            await ProductIngredients.query(trx)
                .delete()
                .whereIn('id', productIngredientsIdsToDelete);
        }
    });

    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productToUpdate.id)
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), user(defaultSelectsUser)]');
}

const remove = async (productId) => {
    const existProduct = await Products.query()
        .select('id')
        .findById(productId)
        .whereNull('deleted_at');

    if (!existProduct)
        throw new Error('Produto inexistente!');

    await Products.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', productId);

    await ProductIngredients.query()
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
