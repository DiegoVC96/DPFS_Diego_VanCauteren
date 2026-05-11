module.exports = (sequelize, dataTypes) => {
    const alias = 'Brand'; 

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
        tableName: 'brands', 
        timestamps: false  
    };

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models) => {
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        });
    };

    return Brand;
};
