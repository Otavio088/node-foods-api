const { Model } = require('objection');

class Roles extends Model {
    static get tableName() {
        return 'roles';
    }

    static get relationMappings() {
        const Modules = require('./Modules');

        return {
            modules: {
                relation: Model.ManyToManyRelation,
                modelClass: Modules,
                join: {
                    from: 'roles.id',
                    through: {
                        from: 'modules_role.role_id',
                        to: 'modules_role.module_id'
                    },
                    to: 'modules.id'
                }
            }
        }
    }
}

module.exports = Roles;
