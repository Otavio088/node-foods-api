const { Model } = require('objection');

class Ingredients extends Model {
    static get tableName() {
        return 'ingredients';
    }

    static get relationMappings() {
        const UnitTypes = require('./UnitTypes');

        return {
            unit_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: UnitTypes,
                join: {
                    from: 'ingredients.unit_type_id',
                    to: 'unit_types.id'
                }
            }
        }
    }

    static modifiers = {
        defaultSelectsIngredients(query) {
            query.select('ingredients.id', 'ingredients.name', 'product_ingredients.quantity')
            .whereNull('ingredients.deleted_at');
        }
    }
}

module.exports = Ingredients;