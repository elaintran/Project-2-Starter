//global variables
//populate characters with get request
var characters = [];
var newStats = [];
//height of d3 chart
var h = 180;
//total stats to distribute
var statPoints = 10;
//stats distributed default value set to false
var statsDis = false;

$(document).ready(function () {
    //push all of the character info from database into array
    $.get("api/character").then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var characterObj = {};
            characterObj.name = data[i].mainName;
            characterObj.class = data[i].mainClass;
            characterObj.portrait = data[i].mainFullPortrait;
            characterObj.chibi = data[i].mainChibi;
            characterObj.stats = [{
                statName: "hp",
                value: data[i].mainHp
            }, {
                statName: "strength",
                value: data[i].mainStr
            }, {
                statName: "defense",
                value: data[i].mainDef
            }, {
                statName: "speed",
                value: data[i].mainSpd
            }];
            characterObj.colors = {};
            characterObj.colors.dark = data[i].colorDark;
            characterObj.colors.light = data[i].colorLight;
            characters.push(characterObj);
        }
        characterDisplay();
    });

    //display characters onto page upon load
    function characterDisplay() {
        //display the first character on the page
        characterSelect(characters[0].name, 1, characters[0].class, characters[0].portrait, characters[0].colors.dark, characters[0].colors.light, characters[0].stats);
        //loop through array and append all of the sprite version
        for (var i = 0; i < characters.length; i++) {
            var chibiContainer = $("<div>").addClass("character-container").attr({
                "data-class": characters[i].class,
                "data-key": i + 1
            });
            var characterImage = $("<img>").attr("src", characters[i].chibi);
            chibiContainer.append(characterImage);
            $(".character-list").append(chibiContainer);
        }
    }

    //toggle between characters
    $(".character-list").on("click", ".character-container", function () {
        for (var i = 0; i < characters.length; i++) {
            //if the class of the sprite clicked matches the class in the array
            if ($(this).attr("data-class") === characters[i].class) {
                //display the selected character
                characterSelect(characters[i].name, (i + 1), characters[i].class, characters[i].portrait, characters[i].colors.dark, characters[i].colors.light, characters[i].stats);
            }
        }
    });

    function characterSelect(name, id, characterClass, portrait, firstStop, secondStop, stats) {
        //clear newStats
        newStats = [];
        //reset statPoints to distribute
        statPoints = 10;
        //prevent added stats to show
        statsDis = false;
        //reset point text to current stat points
        $(".stat-points").text(statPoints);
        //clear d3 stats
        $(".character-stats").empty();
        //display all of select character information
        $(".character-name").text(name);
        $(".character-class").text(characterClass);
        $(".character-image").attr("src", portrait);
        $(".select-character").attr("data-class", characterClass).css("background-image", "linear-gradient(to right, " + firstStop + ", " + secondStop);
        //added data attributes to confirm button to send as a put request
        $("#confirmCharacter").attr("data-class", characterClass);
        $("#confirmCharacter").attr("data-name", name);
        $("#confirmCharacter").attr("data-id", id);
        //append new stats from d3 object
        statsDisplay(stats, characterClass, firstStop, secondStop);
    }

    function statsDisplay(characterStats, characterClass, firstStop, secondStop) {
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
            //use the data from characters[i].stats
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
                return i * 47 + 20;
            })
            //width of the rectangle
            //multiplied the data point by 100 to make it wider
            .attr("width", function (d) {
                return 100 - (d.value / 60 * 100) + 10 + "%";
            })
            //defines the height of the rectangle
            .attr("height", 10)
            //rounds the rectangle
            .attr("rx", 5);

        //if user is currently adding points to the stats
        if (statsDis) {
            nodes.append("rect")
                //use the newStats array instead of characters[i].stats array
                .data(newStats)
                //use the darker color to fill in the new stat bars
                .attr("fill", firstStop)
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return i * 47 + 20;
                })
                .attr("width", function (d) {
                    return (d.value / 60 * 100) + "%";
                })
                .attr("height", 10)
                .attr("rx", 5);
        }

        //current stats bar
        nodes.append("rect")
            //apply gradient
            .classed("filled", true)
            .attr("x", 0)
            .attr("y", function (d, i) {
                return i * 47 + 20;
            })
            .attr("width", function (d) {
                return (d.value / 60 * 100) + "%";
            })
            .attr("height", 10)
            .attr("rx", 5);

        //text container
        nodes.append("text")
            .attr("class", "stat-name")
            .style("fill", "white")
            .style("font-size", "13px")
            .append("tspan")
            //append caret-left as a text span to text to subtract stats
            .attr("class", "fas stat-dist minus")
            .attr("data-class", characterClass)
            .attr("y", function (d, i) {
                return i * 47 + 10;
            })
            .text("\uf0d9");

        //name of the stat type
        nodes.select(".stat-name")
            .append("tspan")
            .attr("class", "stat-type")
            //set margins
            .attr("dx", 10)
            .text(function (d) {
                return d.statName;
            })
            .style("font-weight", 500)
            .style("letter-spacing", "0.5px");

        //append caret-right to text span to add stats
        nodes.select(".stat-name")
            .append("tspan")
            .attr("class", "fas stat-dist plus")
            .attr("data-class", characterClass)
            .attr("dx", 10)
            .text("\uf0da");
    }

    //distribute stats
    $(".character-stats").on("click", ".stat-dist", function () {
        for (var i = 0; i < characters.length; i++) {
            //check for character class from data attribute on button
            if ($(this).attr("data-class") === characters[i].class) {
                //double loop to through the stats array inside the character object
                for (var j = 0; j < characters[i].stats.length; j++) {
                    //prevents from appending more stats onto the array
                    if (newStats.length < characters[i].stats.length) {
                        //set an empty obj
                        //if push data directly into array, new array will reference the previous array and override the data 
                        var characterStats = {};
                        characterStats.statName = characters[i].stats[j].statName;
                        characterStats.value = characters[i].stats[j].value;
                        newStats.push(characterStats);
                    }
                    //check if the plus button is clicked
                    if ($(this).attr("class").split(" ")[2] === "plus") {
                        //checks the stat name
                        if ($(this).prev().text() === characters[i].stats[j].statName) {
                            //if user still has remaining stat points
                            if (statPoints !== 0 && newStats[j].value !== 60) {
                                //add point to stats
                                newStats[j].value += 2;
                                //remove from statPoints
                                statPoints--;
                            }
                        }
                        //check if the minus button is clicked
                    } else if ($(this).attr("class").split(" ")[2] === "minus") {
                        //checks the stat name
                        if ($(this).next().text() === characters[i].stats[j].statName) {
                            //if user has the original amount of points and new stat value is not equal to old stat value
                            //prevents user from subtracting from base stats
                            if (statPoints !== 10 && newStats[j].value !== characters[i].stats[j].value) {
                                newStats[j].value -= 2;
                                statPoints++;
                            }
                        }
                    }
                }
                //show d3 bar of added stats
                statsDis = true;
                //change the text of statpoints according to current number of points
                $(".stat-points").text(statPoints);
                //clear d3 object to reflect the new stats
                $(".character-stats").empty();
                //display d3 stats
                statsDisplay(characters[i].stats, characters[i].class, characters[i].colors.dark, characters[i].colors.light);
                // console.log(newStats);
                console.log("hp is: " + newStats[0].value);
                console.log("str is: " + newStats[1].value);
                console.log("def is: " + newStats[2].value);
                console.log("spd is: " + newStats[3].value);
                $("#confirmCharacter").attr("data-hp", newStats[0].value);
                $("#confirmCharacter").attr("data-str", newStats[1].value);
                $("#confirmCharacter").attr("data-def", newStats[2].value);
                $("#confirmCharacter").attr("data-spd", newStats[3].value);
            }
        }
    });

    // change modal text on character select page based on stats
    $(".select-character").on("click", function () {
        //if user still has remaining points to distribute
        if(statPoints > 0 && statPoints <= 10) {
            $("#modaltext").text("Please distribute all of your remaining stat points!");
            $(".confirm").hide();
            $(".cancel").text("Continue");
            $(".cancel").removeAttr("style");
        } else {
            $("#modaltext").text("Are you sure you wish to continue with this class?");
            $(".confirm").show();
            $(".cancel").text("Cancel");  
            $(".cancel").css({
                "background-image": "none",
                "background-color": "transparent"
            });
        }
    });

    // $("#selectCharacter").on("click", function () {
    //     console.log("this button has been clicked");
    //     console.log($(this).attr("data-class"));
    //     var newUser = {
    //         mainClass: $(this).attr("data-class")
    //     };
    //     $.post("/api/users", newUser, function () {
    //         window.location.href = "/world";
    //     });
    // });
});