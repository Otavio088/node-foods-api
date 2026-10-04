const { Model } = require('objection');

class Orders extends Model {
    static get tableName() {
        return 'orders';
    }

    static get relationMappings() {
        const Users = require('./Users');
        const OrderItems = require('./OrderItems');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },
            items: {
                relation: Model.HasManyRelation,
                modelClass: OrderItems,
                join: {
                    from: 'orders.id',
                    to: 'order_items.order_id'
                }
            }
        }
    }
}

module.exports = Orders;
