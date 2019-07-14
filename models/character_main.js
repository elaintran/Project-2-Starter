module.exports = function (sequelize, DataTypes) {
    var Main = sequelize.define("Main", {
        mainName: DataTypes.STRING,
        mainClass: DataTypes.STRING,
        mainHp: DataTypes.INTEGER,
        mainStr: DataTypes.INTEGER,
        mainMag: DataTypes.INTEGER,
        mainDef: DataTypes.INTEGER,
        mainSpd: DataTypes.INTEGER,
        mainLvl: DataTypes.INTEGER,
        mainExp: DataTypes.INTEGER
    });
    return Main;
};