$(document).ready(function () {
    var userId;
    var userCharacter = [];
    var h = 220;

    $.get("api/userdata").then(function(data) {
        userId = data.userId;
        userChoice(userId);
    });

    function userChoice(userId) {
        $.get("api/users/" + userId).then(function(data) {
            var characterObj = {};
            characterObj.stats = [{
                statName: "hp",
                value: data.Main.mainHp
            }, {
                statName: "strength",
                value: data.Main.mainStr
            }, {
                statName: "defense",
                value: data.Main.mainDef
            }, {
                statName: "speed",
                value: data.Main.mainSpd
            }];
            characterObj.colors = {};
            characterObj.colors.dark = data.Main.colorDark;
            characterObj.colors.light = data.Main.colorLight;
            userCharacter.push(characterObj);
            $(".userimage").attr("src", data.Main.mainPortrait);
            $(".user-chibi").attr("src", data.Main.mainChibi);
            $(".username").text(data.userName);
            $(".select").css("background-image", "linear-gradient(to right, " + data.Main.colorDark + ", " + data.Main.colorLight);
            statsDisplay(userCharacter[0].stats, userCharacter[0].colors.dark, userCharacter[0].colors.light);
        });
    }

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
        $(".story").show();
        $(".castle-container").hide();
        $(".select").text("Select");
        $(".select").removeAttr("style");
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
        $(".story").show();
        $(".castle-container").hide();
        $(".select").text("Select");
        $(".select").removeAttr("style");
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
                $(".story").hide();
                $(".castle-container").show();
                $(".select").removeAttr("style").attr("href", "/character");
                $(".select").text("Change Class");
                $(".select").css("background-image", "linear-gradient(to right, " + userCharacter[0].colors.dark + ", " + userCharacter[0].colors.light);
                break;
            default:
                console.log("not found");
                console.log($(this).attr("class"));
        }
    });

    function statsDisplay(characterStats, firstStop, secondStop) {
        //creates a svg and appends to character stats
        var svg = d3.select(".character-stats").append("svg").attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + 350 + " " + h);
        //defs store graphical objects at a later time and are not rendered
        var svgDefs = svg.append("defs");
        //creates a linear gradient container
        var mainGradient = svgDefs.append("linearGradient")
            .attr("id", "mainGradient");
        //stops for gradient
        mainGradient.append("stop")
            .style("stop-color", firstStop)
            .attr("offset", "0");
        mainGradient.append("stop")
            .style("stop-color", secondStop)
            .attr("offset", "1");

        var nodes = svg.selectAll(".rect")
            .data(characterStats)
            .enter()
            .append("g")
            .classed("rect", true);

        nodes.append("rect")
            //apply gradient
            .attr("fill", "#363636")
            //each rectangle starts at the 0 position
            .attr("x", function (d) {
                return (d.value / 60 * 100 - 10) + "%";
            })
            //moves each rectangle down
            //i is the data point index
            .attr("y", function (d, i) {
                return i * 55 + 30;
            })
            //width of the rectangle
            //multiplied the data point to make it wider
            .attr("width", function (d) {
                return 100 - (d.value / 60 * 100) + 10 + "%";
            })
            //defines the height of the rectangle
            .attr("height", 13)
            .attr("rx", 8);

        //creates rectangles for every index in the dataset
        nodes.append("rect")
            // .data(characterStats)
            //apply gradient
            .classed("filled", true)
            //each rectangle starts at the 0 position
            .attr("x", 0)
            //moves each rectangle down
            //i is the data point index
            .attr("y", function (d, i) {
                return i * 55 + 30;
            })
            //width of the rectangle
            //multiplied the data point to make it wider
            .attr("width", function (d) {
                return (d.value / 60 * 100) + "%";
            })
            //defines the height of the rectangle
            .attr("height", 13)
            .attr("rx", 8);

        nodes.append("text")
            .style("fill", "white")
            .style("font-size", "18px")
            .text(function (d) {
                return d.statName;
            })
            .attr("dx", 0)
            .attr("class", "stat-type")
            .style("font-weight", 500)
            .style("letter-spacing", "0.5px")
            .attr("y", function (d, i) {
                return i * 55 + 20;
            });
    }
});