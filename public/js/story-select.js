$(document).ready(function () {
    var chapters = [
        {
            name: "Chapter 1:",
            subtitle: "Into the Unknown",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem minus cupiditate autem ex dolores id! Corrupti voluptatem placeat sunt recusandae aliquid eligendi ratione necessitatibus adipisci ab mollitia.",
            previewImg: "images/resource-images/encounter/bg-forest-entrance.jpg",
            complete: true
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

    var chapterSelect;
    var chapterImg;
    var chapterUnlock = true;

    function chapterDisplay() {
        for (var i = 0; i < chapters.length; i++) {
            var col = $("<div>").addClass("col-3");
            chapterSelect = $("<div>").addClass("chapter-select").attr("data-chapter", i + 1);
            chapterImg = $("<img>").attr("src", chapters[i].previewImg).addClass("image-fit");
            if (chapters[i].complete) {
                flagDisplay("Complete", "#3e62a1");
            } else {
                if (chapterUnlock) {
                    flagDisplay("New", "#b2394c");
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

    function flagDisplay(chapterStatus, color) {
        chapterSelect.attr("data-complete", chapterStatus);
        var flagContainer = $("<div>").addClass("flag-container");
        var flag = $("<div>").addClass("flag").css("background-color", color);
        var completion = $("<p>").text(chapterStatus);
        var flagWingTop = $("<div>").addClass("flag-wing wing-top").css("border-top-color", color);
        var flagWingBottom = $("<div>").addClass("flag-wing wing-bottom").css("border-bottom-color", color);
        flag.append(completion);
        flagContainer.append(flag).append(flagWingTop).append(flagWingBottom);
        chapterSelect.append(chapterImg).append(flagContainer);
    }

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