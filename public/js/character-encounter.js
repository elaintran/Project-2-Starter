$(".cls-1").each(function() {
    
    var target = ($(this).parent().attr("data-part"));
    // console.log(target);
    $(this).hover(function() {
        $(".attack-" + target).css({
            "opacity": "1",
            "left": "0"
        });
    },function() {
        $(".attack-" + target).css({
            "opacity": "0",
            "left": "-1vw"
        });
    });
});