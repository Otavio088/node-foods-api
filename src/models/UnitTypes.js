const { Model } = require('objection');

class UnitTypes extends Model {
    static get tableName() {
        return 'unit_types';
    }
}

module.exports = UnitTypes;
