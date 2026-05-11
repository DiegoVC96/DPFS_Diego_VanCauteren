module.exports = (sequelize, dataTypes) => {
    const alias = 'UserCategory'; 

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
        tableName: 'user_categories', 
        timestamps: false
    };

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
        UserCategory.hasMany(models.User, {
            as: 'users',
            foreignKey: 'category_id'
        });
    };

    return UserCategory;
};
