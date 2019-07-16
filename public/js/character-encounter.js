var showTooltip = function(part) {
    $(".attack-" + part).css({
        'opacity': '1',
        'left': '0'
    });
};

var hideTooltop = function(part) {
    $(".attack-" + part).css({
        'opacity': '0',
        'left': '-1vw'
    });
};

$("#knight_head > .cls-1").hover(showTooltip(head), hideTooltop(head));
$("#knight_body > .cls-1").hover(showTooltip(body), hideTooltop(body));
$("#knight_legs > .cls-1").hover(showTooltip(legs), hideTooltop(legs));