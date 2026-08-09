const { Model } = require('objection');

class ProductCategoriesProducts extends Model {
    static get tableName() {
        return 'product_categories_products';
    }
}

module.exports = ProductCategoriesProducts;