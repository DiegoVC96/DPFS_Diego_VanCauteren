module.exports = (sequelize, dataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        order_id: dataTypes.INTEGER,
        product_id: dataTypes.INTEGER,
        quantity: dataTypes.INTEGER,
        price_at_time: dataTypes.DECIMAL(12, 2)
    }, { 
        tableName: 'order_items',
        timestamps: false 
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'order_id' });
        OrderItem.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
    };
    return OrderItem;
};
