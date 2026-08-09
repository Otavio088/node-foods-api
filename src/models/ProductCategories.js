const { Model } = require('objection');

class ProductCategories extends Model {
    static get tableName() {
        return 'product_categories';
    }

    static modifiers = {
        defaultSelectsCategory(query) {
            query.select('product_categories.code', 'product_categories.name')
            .whereNull('product_categories.deleted_at');
        }
    }
}

module.exports = ProductCategories;