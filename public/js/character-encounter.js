// populate enemy portrait dynamically on page load
// possibly store enemy svg data within a javascript object

// event handler for displaying popups when hovering over the parts of the enemy's body
$(".cls-1").each(function() {    
    var target = ($(this).parent().attr("data-part"));
    // console.log(target);
    $(this).hover(function() {
        $(".attack-" + target).css({
            "opacity": "1",
            "left": "0"
        });
        $(this).css({"fill":"#f006"});
    },function() {
        $(".attack-" + target).css({
            "opacity": "0",
            "left": "-1vw"
        });
        $(this).css({"fill":"transparent",});
    });
});