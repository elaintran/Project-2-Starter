$("#knight_head > .cls-1").hover(function() {
    $(".attack-head").css('cursor','pointer').css('visibility', 'visible');
}, function() {
    $(".attack-head").css('cursor','auto').css('visibility', 'hidden');
});

$("#knight_body > .cls-1").hover(function() {
    $(".attack-body").css('cursor','pointer').css('visibility', 'visible');
}, function() {
    $(".attack-body").css('cursor','auto').css('visibility', 'hidden');
});

$("#knight_legs > .cls-1").hover(function() {
    $(".attack-legs").css('cursor','pointer').css('visibility', 'visible');
}, function() {
    $(".attack-legs").css('cursor','auto').css('visibility', 'hidden');
});