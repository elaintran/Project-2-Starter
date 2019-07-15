module.exports = function (sequelize, DataTypes) {
    var Main = sequelize.define("Main", {
        classType: DataTypes.STRING,
        hp: DataTypes.INTEGER,
        str: DataTypes.INTEGER,
        def: DataTypes.INTEGER,
        spd: DataTypes.INTEGER
    });
    return Main;
};