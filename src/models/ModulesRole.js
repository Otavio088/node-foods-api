const { Model } = require('objection');

class ModulesRole extends Model {
    static get tableName() {
        return 'modules_role';
    }
}

module.exports = ModulesRole;
