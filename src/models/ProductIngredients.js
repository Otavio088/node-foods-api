const { Model } = require('objection');

class ProductIngredients extends Model {
    static get tableName() {
        return 'product_ingredients';
    }
}

module.exports = ProductIngredients;
