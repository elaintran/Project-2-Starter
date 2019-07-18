$(document).ready(function () {
    var chapters = [
        {
            name: "Chapter 1:",
            subtitle: "Into the Unknown",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest-entrance.jpg",
            complete: false
        }, {
            name: "Chapter 2:",
            subtitle: "We Meet Again",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg",
            complete: false

        }, {
            name: "Chapter 3:",
            subtitle: "Here Comes the King",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-castle.jpg",
            complete: false
        }, {
            name: "Chapter 4:",
            subtitle: "A New King",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest.jpg",
            complete: false
        }
    ];

    var chapterUnlock = true;

    function chapterDisplay() {
        for (var i = 0; i < chapters.length; i++) {
            var col = $("<div>").addClass("col-3");
            var chapterSelect = $("<div>").addClass("chapter-select").attr("data-chapter", i + 1);
            var chapterImg = $("<img>").attr("src", chapters[i].previewImg).addClass("image-fit");
            if (chapters[i].complete) {
                //need to search for where the new chapter is
                chapterSelect.attr("data-complete", "complete");
                var flag = $("<div>").addClass("flag").css("background-color", "#3e62a1");
                var completion = $("<p>").text("Complete");
                flag.append(completion);
                chapterSelect.append(chapterImg).append(flag);
            } else {
                if (chapterUnlock) {
                    chapterSelect.attr("data-complete", "new");
                    var flag = $("<div>").addClass("flag").css("background-color", "#b2394c");
                    var completion = $("<p>").text("New");
                    flag.append(completion);
                    chapterSelect.append(chapterImg).append(flag);
                    chapterUnlock = false;
                } else {
                    chapterSelect.attr("data-complete", "locked");
                    var overlay = $("<div>").addClass("overlay");
                    var lock = $("<i>").addClass("fas fa-lock");
                    overlay.append(lock);
                    chapterSelect.append(chapterImg).append(overlay);
                }
            }
            col.append(chapterSelect);
            $(".chapter-list").append(col);
        }
    }
    chapterDisplay();

    $(".chapter-select").on("click", function () {
        for (var i = 0; i < chapters.length; i++) {
            if (+$(this).attr("data-chapter") === i + 1 && $(this).attr("data-complete") !== "locked") {
                $(".chapter-number").text(chapters[i].name);
                $(".chapter-subtitle").text(chapters[i].subtitle);
                $(".chapter-description").text(chapters[i].description);
                $("button.select").attr("data-chapter", i + 1);
                $("button.select").attr("data-subtitle", chapters[i].subtitle);
                $("button.select").attr("href", "/encounter");
                $(".select").removeAttr("style");
            }
        }
    });

    $(".marker-container").on("click", function () {
        //check only the second class
        switch ($(this).attr("class").split(" ")[1]) {
            case ("item-shop"):
                $(".chapter-number").text("Item Shop");
                $(".chapter-subtitle").text("Coming Soon");
                // $(".chapter-description").text("Purchase potions here.");
                $(".select").css({
                    "background-image": "none",
                    "background-color": "#5f5f5f"
                });
                break;
            case ("armory"):
                $(".chapter-number").text("Armory");
                $(".chapter-subtitle").text("Coming Soon");
                $(".select").css({
                    "background-image": "none",
                    "background-color": "#5f5f5f"
                });
                break;
            case ("castle"):
                $(".chapter-number").text("Castle");
                $(".chapter-subtitle").empty();
                $(".select").removeAttr("style");
                break;
            default:
                console.log("not found");
                console.log($(this).attr("class"));
        }
    });
});