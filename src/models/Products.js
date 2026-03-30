const { Model } = require('objection');

class Products extends Model {
    static get tableName() {
        return 'products';
    }

    static get relationMappings() {
        const Users = require('./Users');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'products.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Products;
