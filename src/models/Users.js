const { Model } = require('objection');

class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Roles = require('./Roles');
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Roles,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'roles_user.user_id',
                        to: 'roles_user.role_id'
                    },
                    to: 'roles.id'
                }
            }
        }
    }

    static modifiers = {
        defaultSelectsUser(query) {
            query.select('users.id', 'users.name', 'users.email', 'users.active')
            .whereNull('users.deleted_at');
        }
    }
}

module.exports = Users;
