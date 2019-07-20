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
            allowNull: true
        },
        userScore: DataTypes.INTEGER,
        chapter: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        chapterOne: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        chapterTwo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        chapterThree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        chapterFour: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // this works
    User.associate = function (models) {
        User.belongsTo(models.Main, {
            foreignKey: "userSelection"
        });
    };

    // User.associate = function (models) {
    //     User.belongsToMany(models.Main, {
    //         through: "userMain",
    //         as: "mains",
    //         foreignKey: "userSelection",
    //         otherKey: "id"
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