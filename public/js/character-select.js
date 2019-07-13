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
            }
        }
    ]

    function characterDisplay() {
        for (var i = 0; i < characters.length; i++) {
            var chibiContainer = $("<div>").addClass("character-container");
            var characterImage = $("<img>").attr({
                "src": characters[i].chibi,
                "data-class": characters[i].class
            })
            chibiContainer.append(characterImage);
            $(".character-list").append(chibiContainer);
        }
    }
    characterDisplay();

    // $(".character-container").on("click", function() {
    //     for (var i = 0; i < characters.length; i++) {
    //         if ($(this))
    //     }
    // })
})