//global variables
//gets the id of the user currently logged in
var userId;
//display the character information user selected in world
var userCharacter = [];
//stores chapter information for display
var chapters = [];
//height of the d3 stats
var h = 220;
//set global to use in constructor
var chapterSelect;
var chapterImg;
//check which chapter is new from the incomplete chapters
var chapterUnlock = true;

$(document).ready(function () {
    //get request for user id from api
    $.get("api/userdata").then(function (data) {
        userId = data.userId;
        userChoice(userId);
    });

    //use id to get the character user selected
    function userChoice(userId) {
        $.get("api/users/" + userId).then(function (data) {
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
            //display user information on page
            $(".userimage").attr("src", data.Main.mainPortrait);
            $(".user-chibi").attr("src", data.Main.mainChibi);
            $(".username").text(data.userName);
            $(".select").css("background-image", "linear-gradient(to right, " + data.Main.colorDark + ", " + data.Main.colorLight);
            //display stats on page
            statsDisplay(userCharacter[0].stats, userCharacter[0].colors.dark, userCharacter[0].colors.light);

            //get chapter status from user

            if (data.chapterOne === true) {
                console.log("chapter one is completed");
                $(".chapter-select.1").attr("data-complete", "New");
                $(".chapter-select.1 > .overlay").remove();
            }
            if (data.chapterTwo === true) {
                console.log("chapter two is completed");
                $(".chapter-select.2").attr("data-complete", "New");
                $(".chapter-select.2 > .overlay").remove();
            }
            if (data.chapterThree === true) {
                console.log("chapter three is completed");
                $(".chapter-select.3").attr("data-complete", "New");
                $(".chapter-select.3 > .overlay").remove();
            }
            if (data.chapterFour === true) {
                console.log("chapter four is completed");
                $(".chapter-select.4").attr("data-complete", "New");
                $(".chapter-select.4 > .overlay").remove();
            }
        });
    }

    //get request for a list of all of the chapter
    $.get("api/chapter").then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var chapterObj = {};
            chapterObj.name = data[i].chapterName;
            chapterObj.subtitle = data[i].chapterSubtitle;
            chapterObj.description = data[i].chapterDescription;
            chapterObj.previewImg = data[i].chapterImg;
            chapterObj.complete = data[i].chapterComplete;
            chapters.push(chapterObj);
        }
        //display the complete, new, and locked chapters onto page
        chapterDisplay();
    });

    function chapterDisplay() {
        for (var i = 0; i < chapters.length; i++) {
            //append preview images for the chapter
            var col = $("<div>").addClass("col-3");
            chapterSelect = $("<div>").addClass("chapter-select " + (i + 1)).attr("data-chapter", i + 1);
            chapterImg = $("<img>").attr("src", chapters[i].previewImg).addClass("image-fit");
            //if chapter is complete, display a flag indicating complete
            if (chapters[i].complete) {
                flagDisplay("Complete", "#3e62a1");
                //if chapter is incomplete
            } else {
                //unlock the first locked chapter and indicate new playable chapter
                if (chapterUnlock) {
                    flagDisplay("New", "#b2394c");
                    //restrict unlocking the rest of the chapters
                    chapterUnlock = false;
                    //lock the remaining chapters
                } else {
                    chapterSelect.attr("data-complete", "locked");
                    var overlay = $("<div>").addClass("overlay");
                    var lock = $("<i>").addClass("fas fa-lock");
                    overlay.append(lock);
                    chapterSelect.append(chapterImg).append(overlay);
                }
            }
            //append all chapters to page
            col.append(chapterSelect);
            $(".chapter-list").append(col);
        }
    }

    //flag display for complete and new chapters
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

    //display chapter information when clicking on the preview
    $(".chapter-list").on("click", ".chapter-select", function () {
        //display selected chapter information
        for (var i = 0; i < chapters.length; i++) {
            if (+$(this).attr("data-chapter") === i + 1 && $(this).attr("data-complete") !== "locked") {
                resetDisplay();
                $(".chapter-number").text(chapters[i].name);
                $(".chapter-subtitle").text(chapters[i].subtitle);
                $(".chapter-description").text(chapters[i].description);
                //data information for routing
                $("button.select").attr("data-chapter", i + 1);
                $("button.select").attr("data-subtitle", chapters[i].subtitle);
                //navigate to chapter on click
                $("button.select").attr("href", "/encounter");
            }
        }
    });

    //map marker
    $(".marker-container").on("click", function () {
        resetDisplay();
        switch ($(this).attr("class").split(" ")[1]) {
            case ("item-shop"):
                $(".chapter-number").text("Item Shop");
                $(".chapter-subtitle").text("Coming Soon");
                $(".chapter-description").text("You purchase potions here.");
                //remove gradient and show disabled button color
                $(".select").css({
                    "background-image": "none",
                    "background-color": "#5f5f5f"
                });
                break;
            case ("armory"):
                $(".chapter-number").text("Armory");
                $(".chapter-subtitle").text("Coming Soon");
                $(".chapter-description").text("You purchase weapons here.");
                $(".select").css({
                    "background-image": "none",
                    "background-color": "#5f5f5f"
                });
                break;
            //display character and stats
            case ("castle"):
                $(".story").hide();
                $(".castle-container").show();
                //change route back to character select
                $(".select").removeAttr("style").attr("href", "/character");
                $(".select").text("Change Class");
                $(".select").css("background-image", "linear-gradient(to right, " + userCharacter[0].colors.dark + ", " + userCharacter[0].colors.light);
                break;
            default:
                console.log("not found");
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

        //create nodes for each stat
        var nodes = svg.selectAll(".rect")
            .data(characterStats)
            .enter()
            .append("g")
            .classed("rect", true);

        //background of stats bar
        nodes.append("rect")
            //apply gray color to background
            .attr("fill", "#363636")
            //start position begins right before the stats bar ends
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
            //rounds the rectangle
            .attr("rx", 8);

        //current stats bar
        nodes.append("rect")
            //apply gradient
            .classed("filled", true)
            .attr("x", 0)
            .attr("y", function (d, i) {
                return i * 55 + 30;
            })
            .attr("width", function (d) {
                return (d.value / 60 * 100) + "%";
            })
            .attr("height", 13)
            .attr("rx", 8);

        //text container
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

    function resetDisplay() {
        //display story container
        $(".story").show();
        //hides user stat from container
        $(".castle-container").hide();
        //change "change class" text to select
        $(".select").text("Select");
        //remove gradient from select
        $(".select").removeAttr("style").removeAttr("href");
    }
});