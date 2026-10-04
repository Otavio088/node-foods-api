const { Model } = require('objection');

class OrderItems extends Model {
    static get tableName() {
        return 'order_items';
    }

    static get relationMappings() {
        const Products = require('./Products');
        const OrderItemExtraAdditions = require('./OrderItemExtraAdditions');

        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'order_items.product_id',
                    to: 'products.id'
                }
            },
            order_item_extra_additions: {
                relation: Model.HasManyRelation,
                modelClass: OrderItemExtraAdditions,
                join: {
                    from: 'order_items.id',
                    to: 'order_item_extra_additions.order_item_id'
                }
            }
        }
    }

    static modifiers = {
        defaultSelectsItems(query) {
            query.select('order_items.id', 'order_items.product_quantity', 'order_items.value', 'order_items.value_total', 'order_items.obs');
        }
    }
}

module.exports = OrderItems;
