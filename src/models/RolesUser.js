const { Model } = require('objection');

class RolesUser extends Model {
    static get tableName() {
        return 'roles_user';
    }
}

module.exports = RolesUser;
