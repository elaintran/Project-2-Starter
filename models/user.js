module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userSelection: DataTypes.INTEGER,
        userScore: DataTypes.INTEGER
    });
    return User;
};