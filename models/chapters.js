module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define("Chapter", {
        chapterName: DataTypes.INTEGER
    });
    return Chapter;
};