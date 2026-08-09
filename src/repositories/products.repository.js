const Products = require('../models/Products');
const ProductIngredients = require('../models/ProductIngredients');
const ProductCategories = require('../models/ProductCategories');
const ProductCategoriesProducts = require('../models/ProductCategoriesProducts');

const getAll = async () => {
    return Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), categories(defaultSelectsCategory), user(defaultSelectsUser)]');
}

const getById = async (productId) => {
    return Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productId)
        .whereNull('deleted_at')
        .withGraphFetched('[ingredients(defaultSelectsIngredients).unit_type(defaultSelectsUnitTypes), categories(defaultSelectsCategory), user(defaultSelectsUser)]');
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

        if (body.categories.length > 0) {
            const productCategories = body.categories.map((categoryId) => ({
                product_id: product.id,
                category_id: categoryId
            }));

            await trx('product_categories_products').insert(productCategories);
        }
    });

    return product.id;
}

const update = async (body, productId) => {
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

        await productIngredientsSetup(body, productId, trx);
        await productCategoriesSetup(body, productId, trx);
    });
}

const productIngredientsSetup = async (body, productId, trx) => {
    // Ingredientes para update
    const productIngredientsToUpdateMap = new Map();
    for (const ingredient of body.ingredients) {
        const key = `${productId}_${ingredient.ingredient_id}`;

        productIngredientsToUpdateMap.set(key, {
            product_id: productId,
            ingredient_id: ingredient.ingredient_id,
            quantity: Number(ingredient.quantity)
        });
    }

    // Vínculos existentes no banco
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

    // Validação se vai inserir ou atualizar
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

    // Validação se vai deletar
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
}

const productCategoriesSetup = async (body, productId, trx) => {
    // Categorias para update
    const productCategoriesToUpdateMap = new Map();
    for (const categoryId of body.categories) {
        const key = `${productId}_${categoryId}`;

        productCategoriesToUpdateMap.set(key, {
            product_id: productId,
            category_id: categoryId
        });
    }

    // Vínculos existentes no banco
    const productCategoriesExist = await ProductCategoriesProducts.query()
        .where('product_id', productId)

    const productCategoriesExistMap = new Map();
    for (const productCategory of productCategoriesExist) {
        const key = `${productCategory.product_id}_${productCategory.category_id}`;

        productCategoriesExistMap.set(key, {
            id: productCategory.id,
            product_id: productCategory.product_id,
            category_id: productCategory.category_id
        });
    }

    // Validação se vai inserir
    const productCategoriesToInsert = [];
    for (const [key, value] of productCategoriesToUpdateMap) {
        if (!productCategoriesExistMap.has(key)) {
            productCategoriesToInsert.push({
                product_id: value.product_id,
                category_id: value.category_id
            });
        }
    }

    // Validação se vai deletar
    const productCategoriesIdsToDelete = [];
    for (const [key, value] of productCategoriesExistMap) {
        if (!productCategoriesToUpdateMap.has(key)) {
            productCategoriesIdsToDelete.push(value.id);
        }
    }

    if (productCategoriesToInsert.length > 0)
        await trx('product_categories_products').insert(productCategoriesToInsert);

    if (productCategoriesIdsToDelete.length > 0)
        await ProductCategoriesProducts.query(trx).delete().whereIn('id', productCategoriesIdsToDelete);
}

const remove = async (productId) => {
    await Products.query()
        .patch({ deleted_at: new Date() })
        .where('id', productId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
