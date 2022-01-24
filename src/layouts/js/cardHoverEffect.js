const maxTilt = 30; // Max card tilt (deg).

$(".b-game-card")
    .mousemove(function(evt) {
        let bounding = mouseOverBoundingElem(evt);

        let posX = bounding.width / 2 - bounding.x;
        let posY = bounding.height / 2 - bounding.y;
        let hypotenuseCursor = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
        let hypotenuseMax = Math.sqrt(Math.pow(bounding.width / 2, 2) + Math.pow(bounding.height / 2, 2));
        let ratio = hypotenuseCursor / hypotenuseMax;

        $(".cover", this).css({
            transform: `rotate3d(${posY / hypotenuseCursor}, ${-posX / hypotenuseCursor}, 0, ${ratio * maxTilt}deg)`,
            filter: `brightness(${1.6 - bounding.y / bounding.height})` // 0.6 = offset, brightness will be from 0.6 to 1.6
        });
        $(".gloss", this).css({
            transform: `translateX(${posX * ratio * 0.75}px) translateY(${posY * ratio}px)` // 0.75 = offset
        });
    })
    .mouseleave(function() {
        let css = {
            transform: "",
            filter: ""
        };
        $(".cover, .gloss", this).css(css);
    });

function mouseOverBoundingElem(evt) {
    let bounding = evt.target.getBoundingClientRect();
    let x = evt.originalEvent.pageX - Math.round(bounding.left);
    let y = evt.originalEvent.pageY - Math.round(bounding.top);

    return {
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: Math.round(bounding.width),
        height: Math.round(bounding.height)
    };
}
