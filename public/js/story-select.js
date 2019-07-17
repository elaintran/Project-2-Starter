$(document).ready(function() {
    var chapters = [
        {
            name: "Chapter 1:",
            subtitle: "Into the Unknown",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg"
        }, {
            name: "Chapter 2:",
            subtitle: "We Meet Again",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg"
        }, {
            name: "Chapter 3:",
            subtitle: "Here Comes the King",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg"
        }, {
            name: "Chapter 4:",
            subtitle: "A New King",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg"
        }
    ];

    function chapterDisplay() {
        for (var i = 0; i < chapters.length; i++) {
            var col = $("<div>").addClass("col-3");
            var chapterSelect = $("<div>").addClass("chapter-select").attr("data-chapter", i+1);
            var chapterImg = $("<img>").attr({
                "src": chapters[i].previewImg,
                "width": "100%"
            });
            chapterSelect.append(chapterImg);
            col.append(chapterSelect);
            $(".chapter-list").append(col);
        }
    }
    chapterDisplay();

    $(".chapter-select").on("click", function() {
        for (var i = 0; i < chapters.length; i++) {
            if (+$(this).attr("data-chapter") === i+1) {
                $(".chapter-number").text(chapters[i].name);
                $(".chapter-subtitle").text(chapters[i].subtitle);
                $(".chapter-description").text(chapters[i].description);
            }
        }
    });
});