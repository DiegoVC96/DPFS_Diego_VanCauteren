module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Product', {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: dataTypes.STRING,
        description: dataTypes.TEXT,
        price: dataTypes.DECIMAL(12, 2),
        image: dataTypes.STRING,
        category_id: dataTypes.INTEGER,
        brand_id: dataTypes.INTEGER
    }, { tableName: 'products',
        timestamps: false
     });

    Product.associate = (models) => {
        Product.belongsTo(models.ProductCategory, { as: 'category', foreignKey: 'category_id' });
        Product.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brand_id' });
        Product.hasMany(models.ProductVariant, { as: 'variants', foreignKey: 'product_id' });
    };
    return Product;
};
