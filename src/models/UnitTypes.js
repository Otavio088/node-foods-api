const { Model } = require('objection');

class UnitTypes extends Model {
    static get tableName() {
        return 'unit_types';
    }

    static modifiers = {
        defaultSelects(query) {
            query.select('id', 'name', 'type')
            .whereNull('deleted_at');
        }
    }
}

module.exports = UnitTypes;
