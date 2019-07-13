$(document).ready(function() {
    var characters = [
        {
            name: "Character 1",
            class: "Swordmaster",
            portrait: "images/resource-images/portrait/fighter-sword-red.png",
            chibi: "images/resource-images/chibi/fighter-sword-red.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#94263a",
                light: "#d24d5f"
            }
        }, {
            name: "Character 2",
            class: "Lance Fighter",
            portrait: "images/resource-images/portrait/fighter-lance-blue.png",
            chibi: "images/resource-images/chibi/fighter-lance-blue.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#29396f",
                light: "#4c7fc4"
            }
        }, {
            name: "Character 3",
            class: "Axe Fighter",
            portrait: "images/resource-images/portrait/fighter-axe-green.png",
            chibi: "images/resource-images/chibi/fighter-axe-green.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "rgb(33, 74, 85)",
                light: "rgb(73, 136, 140)"
            }
        }, {
            name: "Character 4",
            class: "Bow Fighter",
            portrait: "images/resource-images/portrait/fighter-bow-purple.png",
            chibi: "images/resource-images/chibi/fighter-bow-purple.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#42224e",
                light: "#805694"
            }
        }, {
            name: "Character 5",
            class: "Red Mage",
            portrait: "images/resource-images/portrait/mage-red.png",
            chibi: "images/resource-images/chibi/mage-red.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#94263a",
                light: "#d24d5f"
            }
        }, {
            name: "Character 6",
            class: "Blue Mage",
            portrait: "images/resource-images/portrait/mage-blue.png",
            chibi: "images/resource-images/chibi/mage-blue.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#29396f",
                light: "#4c7fc4"
            }
        }, {
            name: "Character 7",
            class: "Knight",
            portrait: "images/resource-images/portrait/knight-axe-green.png",
            chibi: "images/resource-images/chibi/knight-axe-green.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "rgb(33, 74, 85)",
                light: "rgb(73, 136, 140)"
            }
        }, {
            name: "Character 8",
            class: "Thief",
            portrait: "images/resource-images/portrait/thief-purple.png",
            chibi: "images/resource-images/chibi/thief-purple.png",
            stats: {
                hp: 10,
                strength: 10,
                magic: 10,
                defense: 10,
                speed: 10
            },
            colors: {
                dark: "#42224e",
                light: "#805694"
            }
        }
    ]

    //need to write a constructor to reduce redundant code
    //display the first character and loop through and append all of the chibi ver.
    function characterDisplay() {
        $(".character-name").text(characters[0].name);
        $(".character-class").text(characters[0].class);
        $(".character-image").attr("src", characters[0].portrait);
        $(".select-character").css("background-image", `linear-gradient(to right, ${characters[0].colors.dark}, ${characters[0].colors.light})`);
        for (var i = 0; i < characters.length; i++) {
            var chibiContainer = $("<div>").addClass("character-container").attr("data-class", characters[i].class);
            var characterImage = $("<img>").attr("src", characters[i].chibi);
            chibiContainer.append(characterImage);
            $(".character-list").append(chibiContainer);
        }
    }
    characterDisplay();

    //toggle between characters
    $(".character-container").on("click", function() {
        for (var i = 0; i < characters.length; i++) {
            if ($(this).attr("data-class") === characters[i].class) {
                $(".character-name").text(characters[i].name);
                $(".character-class").text(characters[i].class);
                $(".character-image").attr("src", characters[i].portrait);
                $(".select-character").css("background-image", `linear-gradient(to right, ${characters[i].colors.dark}, ${characters[i].colors.light})`);
            }
        }
    })
})