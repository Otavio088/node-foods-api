const { Model } = require('objection');

class UnitTypes extends Model {
    static get tableName() {
        return 'unit_types';
    }

    static modifiers = {
        defaultSelectsUnitTypes(query) {
            query.select('unit_types.id', 'unit_types.name', 'unit_types.type')
            .whereNull('unit_types.deleted_at');
        }
    }
}

module.exports = UnitTypes;
