module.exports = function (sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        itemName: DataTypes.STRING,
        itemClass: DataTypes.INTEGER,
        itemPotency: DataTypes.INTEGER
    });
    return Inventory;
};