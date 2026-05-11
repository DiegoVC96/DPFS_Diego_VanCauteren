module.exports = (sequelize, dataTypes) => {
    const alias = 'ProductCategory'; // 

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
        }
    };

    const config = {
        tableName: 'product_categories', 
        timestamps: false 
    };

    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    };

    return ProductCategory;
};
