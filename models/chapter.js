module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define("Chapter", {
        chapterName: DataTypes.STRING,
        chapterSubtitle: DataTypes.STRING,
        chapterDescription: DataTypes.STRING,
        chapterImg: DataTypes.STRING,
        chapterComplete: DataTypes.BOOLEAN
    });
    return Chapter;
};