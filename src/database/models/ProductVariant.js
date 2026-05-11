module.exports = (sequelize, dataTypes) => {
    const alias = 'ProductVariant';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'product_variants',
        timestamps: false
    };

    const ProductVariant = sequelize.define(alias, cols, config);

    ProductVariant.associate = (models) => {
        ProductVariant.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    };

    return ProductVariant;
};
