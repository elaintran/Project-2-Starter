var bcrypt = require("bcryptjs");

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
    User.prototype.validPassword = function (userPassword) {
        return bcrypt.compareSync(userPassword, this.userPassword);
    };

    User.addHook("beforeCreate", function (userName) {
        userName.password = bcrypt.hashSync(userName.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};