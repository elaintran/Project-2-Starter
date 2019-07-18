var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
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
        userSelection: {
            type: DataTypes.INTEGER,
        },
        userProgression: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userScore: DataTypes.INTEGER
    });

    // User.associate = function (models) {
    //     User.belongsToMany(models.Main, {
    //         through: "userMain"
    //     });
    // };

    User.associate = function (models) {
        User.belongsTo(models.Main, {
            foreignKey: "userSelection"
        });
        User.belongsToMany(models.Chapter, {
            through: "userChapterUnlock",
            foreignKey: "userProgression"
        });
    };

    // User.associate = function (models) {
    //     User.hasMany(models.Chapter, {
    //         foreignKey: "userProgression"
    //     });
    // };


    User.prototype.validPassword = function (userPassword) {
        return bcrypt.compareSync(userPassword, this.userPassword);
    };

    User.addHook("beforeCreate", function (user) {
        user.userPassword = bcrypt.hashSync(user.userPassword, bcrypt.genSaltSync(10), null);
    });
    return User;
};