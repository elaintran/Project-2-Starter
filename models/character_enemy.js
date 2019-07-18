module.exports = function (sequelize, DataTypes) {
    var Enemy = sequelize.define("Enemy", {
        enemyName: DataTypes.STRING,
        enemyClass: DataTypes.STRING,
        enemyPortrait: DataTypes.STRING,
        enemyChibi: DataTypes.STRING,
        enemyHp: DataTypes.INTEGER,
        enemyStr: DataTypes.INTEGER,
        enemyDef: DataTypes.INTEGER,
        enemySpd: DataTypes.INTEGER,
        colorDark: DataTypes.STRING,
        colorLight: DataTypes.STRING
    });

    Enemy.associate = function (models) {
        Enemy.hasOne(models.Chapter, {
        });
    };
    return Enemy;
};