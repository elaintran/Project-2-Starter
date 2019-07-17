module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define("Chapter", {
        chapterNum: DataTypes.INTEGER,
        chapterSubtitle: DataTypes.STRING,
        chapterDescription: DataTypes.TEXT,
        chapterImg: DataTypes.STRING
    });

    return Chapter;
};