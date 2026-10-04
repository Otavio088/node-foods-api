const { Model } = require('objection');

class OrderItemExtraAddition extends Model {
    static get tableName() {
        return 'order_item_extra_additions';
    }

    static modifiers = {
        defaultSelectsExtraAdditions(query) {
            query.select('order_item_extra_additions.id', 'order_item_extra_additions.name', 'order_item_extra_additions.quantity', 'order_item_extra_additions.value');
        }
    }
}

module.exports = OrderItemExtraAddition;
