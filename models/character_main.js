module.exports = function (sequelize, DataTypes) {
    var Main = sequelize.define("Main", {
        mainClass: DataTypes.STRING,
        mainHp: DataTypes.INTEGER,
        mainStr: DataTypes.INTEGER,
        mainDef: DataTypes.INTEGER,
        mainSpd: DataTypes.INTEGER
    });
    return Main;
};