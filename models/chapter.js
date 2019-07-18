module.exports = function (sequelize, DataTypes) {
    var Chapter = sequelize.define("Chapter", {
        chapterNum: DataTypes.STRING,
        chapterSubtitle: DataTypes.STRING,
        chapterDescription: DataTypes.STRING,
        chapterImg: DataTypes.STRING,
        chapterUrl: DataTypes.STRING
    });

    return Chapter;
};