module.exports = (sequelize, dataTypes) => {
    const Order = sequelize.define('Order', {
        id: { 
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false 
        },
        total_price: dataTypes.DECIMAL(15, 2),
        status: dataTypes.STRING,
        user_id: dataTypes.INTEGER
    }, { 
        tableName: 'orders',
        timestamps: false 
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        Order.hasMany(models.OrderItem, { as: 'items', foreignKey: 'order_id' });
    };
    return Order;
};
