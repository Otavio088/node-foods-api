const { Model } = require('objection');

class Modules extends Model {
    static get tableName() {
        return 'modules';
    }
}

module.exports = Modules;
