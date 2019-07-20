module.exports = function (sequelize, DataTypes) {
    var Main = sequelize.define("Main", {
        mainName: DataTypes.STRING,
        mainClass: DataTypes.STRING,
        mainFullPortrait: DataTypes.STRING,
        mainPortrait: DataTypes.STRING,
        mainChibi: DataTypes.STRING,
        mainHp: DataTypes.INTEGER,
        mainStr: DataTypes.INTEGER,
        mainDef: DataTypes.INTEGER,
        mainSpd: DataTypes.INTEGER,
        colorDark: DataTypes.STRING,
        colorLight: DataTypes.STRING
    });
    //this works
    Main.associate = function (models) {
        Main.hasOne(models.User, {

        });
    };


    // Main.associate = function (models) {
    //     Main.belongsToMany(models.User, {
    //         through: "userMain",
    //         as: "users",
    //         foreignKey: "id",
    //         otherKey: "userSelection"
    //     });
    // };
    return Main;
};