module.exports = function (sequelize, DataTypes) {
    var Enemy = sequelize.define("Enemy", {
        enemyName: DataTypes.STRING,
        enemyClass: DataTypes.STRING,
        enemyHp: DataTypes.INTEGER,
        enemyStr: DataTypes.INTEGER,
        enemyMag: DataTypes.INTEGER,
        enemyDef: DataTypes.INTEGER,
        enemySpd: DataTypes.INTEGER,
        enemyLvl: DataTypes.INTEGER
    });
    return Enemy;
};