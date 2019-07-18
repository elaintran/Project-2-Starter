module.exports = function (sequelize, DataTypes) {
    var Main = sequelize.define("Main", {
        mainName: DataTypes.STRING,
        mainClass: DataTypes.STRING,
        mainPortrait: DataTypes.STRING,
        mainChibi: DataTypes.STRING,
        mainHp: DataTypes.INTEGER,
        mainStr: DataTypes.INTEGER,
        mainDef: DataTypes.INTEGER,
        mainSpd: DataTypes.INTEGER,
        colorDark: DataTypes.STRING,
        colorLight: DataTypes.STRING
    });
    // Main.associate = function (models) {
    //     Main.belongsTo(models.User, {
    //         through: "userMain"
    //     });
    // };

    // this works
    Main.associate = function (models) {
        Main.hasOne(models.User, {
            foreignKey: "userSelection",
        });
    };
    return Main;
};