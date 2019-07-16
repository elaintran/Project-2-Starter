$(document).ready(function () {
    var characters = [
        {
            name: "Character 1",
            class: "Swordmaster",
            portrait: "images/resource-images/portrait/fighter-sword-red.png",
            chibi: "images/resource-images/chibi/fighter-sword-red.png",
            stats: [{
                statName: "hp",
                value: 20
            }, {
                statName: "strength",
                value: 15
            }, {
                statName: "defense",
                value: 12
            }, {
                statName: "speed",
                value: 30
            }],
            colors: {
                dark: "#94263a",
                light: "#d24d5f"
            }
        }, {
            name: "Character 2",
            class: "Lance Fighter",
            portrait: "images/resource-images/portrait/fighter-lance-blue.png",
            chibi: "images/resource-images/chibi/fighter-lance-blue.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "#29396f",
                light: "#4c7fc4"
            }
        }, {
            name: "Character 3",
            class: "Axe Fighter",
            portrait: "images/resource-images/portrait/fighter-axe-green.png",
            chibi: "images/resource-images/chibi/fighter-axe-green.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "rgb(33, 74, 85)",
                light: "rgb(73, 136, 140)"
            }
        }, {
            name: "Character 4",
            class: "Bow Fighter",
            portrait: "images/resource-images/portrait/fighter-bow-purple.png",
            chibi: "images/resource-images/chibi/fighter-bow-purple.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "#42224e",
                light: "#805694"
            }
        }, {
            name: "Character 5",
            class: "Red Mage",
            portrait: "images/resource-images/portrait/mage-red.png",
            chibi: "images/resource-images/chibi/mage-red.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "#94263a",
                light: "#d24d5f"
            }
        }, {
            name: "Character 6",
            class: "Manakete",
            portrait: "images/resource-images/portrait/manakete-blue.png",
            chibi: "images/resource-images/chibi/manakete-blue.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "#29396f",
                light: "#4c7fc4"
            }
        }, {
            name: "Character 7",
            class: "Knight",
            portrait: "images/resource-images/portrait/knight-axe-green.png",
            chibi: "images/resource-images/chibi/knight-axe-green.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "rgb(33, 74, 85)",
                light: "rgb(73, 136, 140)"
            }
        }, {
            name: "Character 8",
            class: "Thief",
            portrait: "images/resource-images/portrait/thief-purple.png",
            chibi: "images/resource-images/chibi/thief-purple.png",
            stats: [{
                statName: "hp",
                value: 12
            }, {
                statName: "strength",
                value: 31
            }, {
                statName: "defense",
                value: 17
            }, {
                statName: "speed",
                value: 25
            }],
            colors: {
                dark: "#42224e",
                light: "#805694"
            }
        }
    ];

    var w = "100%";
    var h = 180;

    //need to write a constructor to reduce redundant code
    //display the first character and loop through and append all of the chibi ver.
    function characterDisplay() {
        characterSelect(characters[0].name, characters[0].class, characters[0].portrait, characters[0].colors.dark, characters[0].colors.light, characters[0].stats);
        for (var i = 0; i < characters.length; i++) {
            var chibiContainer = $("<div>").addClass("character-container").attr("data-class", characters[i].class);
            var characterImage = $("<img>").attr("src", characters[i].chibi);
            chibiContainer.append(characterImage);
            $(".character-list").append(chibiContainer);
        }
    }
    characterDisplay();

    //toggle between characters
    $(".character-container").on("click", function () {
        for (var i = 0; i < characters.length; i++) {
            if ($(this).attr("data-class") === characters[i].class) {
                characterSelect(characters[i].name, characters[i].class, characters[i].portrait, characters[i].colors.dark, characters[i].colors.light, characters[i].stats);
            }
        }
    });

    function characterSelect(name, characterClass, portrait, firstStop, secondStop, stats) {
        $(".character-name").text(name);
        $(".character-class").text(characterClass);
        $(".character-image").attr("src", portrait);
        $(".select-character").attr("data-class", characterClass).css("background-image", "linear-gradient(to right, " + firstStop + ", " + secondStop);
        $(".character-stats").empty();
        statsDisplay(stats, firstStop, secondStop, false, []);
    }

    $("#selectCharacter").on("click", function () {
        console.log("this button has been clicked");
        console.log($(this).attr("data-class"));

        var newUser = {
            mainClass: $(this).attr("data-class")
        };

        $.post("/api/users", newUser, function () {
            window.location.href = "/world";
        });
    });


    function statsDisplay(characterStats, firstStop, secondStop) {
        //creates a svg and appends to character stats
        var svg = d3.select(".character-stats").append("svg").attr("width", w).attr("height", h);
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

        // var newNodes = svg.selectAll(".rect")
        //     .data(addStats)
        //     .enter()
        //     .append("g")
        //     .classed("rect", true);

        nodes.append("rect")
            //apply gradient
            .attr("fill", "#363636")
            //each rectangle starts at the 0 position
            .attr("x", function (d) {
                return (d.value / 40 * 100 - 10) + "%";
            })
            //moves each rectangle down
            //i is the data point index
            .attr("y", function (d, i) {
                return i * 47 + 20;
            })
            //width of the rectangle
            //multiplied the data point to make it wider
            .attr("width", function (d) {
                return 100 - (d.value / 40 * 100) + 10 + "%";
            })
            //defines the height of the rectangle
            .attr("height", 10)
            .attr("rx", 5);

        if (statsDis) {
            nodes.append("rect")
                .data(addStats)
                //apply gradient
                .attr("fill", firstStop)
                //each rectangle starts at the 0 position
                .attr("x", 0)
                //moves each rectangle down
                //i is the data point index
                .attr("y", function (d, i) {
                    return i * 47 + 20;
                })
                //width of the rectangle
                //multiplied the data point to make it wider
                .attr("width", function (d) {
                    return (d.value / 40 * 100) + "%";
                })
                //defines the height of the rectangle
                .attr("height", 10)
                .attr("rx", 5);
        }

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
                return i * 47 + 20;
            })
            //width of the rectangle
            //multiplied the data point to make it wider
            .attr("width", function (d) {
                return (d.value / 40 * 100) + "%";
            })
            //defines the height of the rectangle
            .attr("height", 10)
            .attr("rx", 5);

        nodes.append("text")
<<<<<<< HEAD
            .text(function (d) {
                return d.statName;
            })
            .style("fill", "white")
            .style("font-size", "12px")
            .style("font-weight", 500)
            .style("letter-spacing", "0.5px")
            .attr("y", function (d, i) {
=======
            .attr("class", "stat-name")
            .style("fill", "white")
            .style("font-size", "12px")
            .append("tspan")
            .attr("class", "fas minus")
            .text("\uf0d9")
            .attr("y", function(d, i) {
>>>>>>> origin
                return i * 47 + 10;
            });

        nodes.select(".stat-name")
            .append("tspan")
            .text(function (d) {
                return d.statName;
            })
            .attr("dx", 10)
            .style("font-weight", 500)
            .style("letter-spacing", "0.5px");

        nodes.select(".stat-name")
            .append("tspan")
            .attr("class", "fas plus")
            .attr("dx", 10)
            .text("\uf0da");
    }

    var characterContainer = [];
    $(".character-stats").on("click", ".plus", function () {
        for (var i = 0; i < characters[0].stats.length; i++) {
            var characterStats = {};
            characterStats.statName = characters[0].stats[i].statName;
            characterStats.value = characters[0].stats[i].value;
            characterContainer.push(characterStats);
        }
        characterContainer[0].value++;
        $(".character-stats").empty();
        statsDisplay(characters[0].stats, characters[0].colors.dark, characters[0].colors.light, true, characterContainer);
        //when the plus sign is clicked on
        //set base stats as variables
        //loop through the character object array
        //find the data attribute for class
        //if data attribute for class = characters[i].class
        //push characters[i] into empty array
        //$(".character-stats").empty(); to clear out stats container so it doesn't keep appending
        //check the data attribute for stats
        //if data attribute for stat = newCharacter[0].stats[0].name
        //add one to newCharacter[0].stats[0].value (hp value)
        //call statsDisplay(newCharacters[0].stats, newCharacters[0].colors.dark, newCharacters[0].colors.light);
        //to update stats
    });
    //if click on new character, need to reset the value
    //need to set a conditional so that it does not go below the base stat
    //need to set a conditional so that it does not go above 40
    //newCharacter array will be sent as a post request once confirmed
    //display an error message if user tries to submit when there are still remaining stat points
    //need to display remaining stat points
});

//issues
//if we use handlebars, mark will need to conform to bootstrap
//if we have an item/armory, how will users purchase items? will enemies drop gold?