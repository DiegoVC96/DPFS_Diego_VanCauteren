module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: dataTypes.STRING,
        lastName: dataTypes.STRING,
        email: { type: dataTypes.STRING, unique: true },
        password: dataTypes.STRING,
        image: dataTypes.STRING,
        category_id: dataTypes.INTEGER
    }, { tableName: 'users',
        timestamps: false 
     });

    User.associate = (models) => {
    User.belongsTo(models.UserCategory, {
        as: 'category',
        foreignKey: 'category_id'
    });

    User.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'user_id'
    });
};
return User
};
