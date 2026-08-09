const { Model } = require('objection');

class Products extends Model {
    static get tableName() {
        return 'products';
    }

    static get relationMappings() {
        const Users = require('./Users');
        const Ingredients = require('./Ingredients');
        const ProductCategories = require('./ProductCategories');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'products.user_id',
                    to: 'users.id'
                }
            },
            ingredients: {
                relation: Model.ManyToManyRelation,
                modelClass: Ingredients,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'product_ingredients.product_id',
                        to: 'product_ingredients.ingredient_id'
                    },
                    to: 'ingredients.id'
                }
            },
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: ProductCategories,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'product_categories_products.product_id',
                        to: 'product_categories_products.category_id'
                    },
                    to: 'product_categories.id'
                }
            }
        }
    }
}

module.exports = Products;
