module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: DataTypes.STRING,
        userPassword: DataTypes.STRING,
        userSelection: DataTypes.INTEGER,
        userScore: DataTypes.INTEGER
    });
    return User;
};