function createEntity(element) {
    return {
        element: element,
        richtung: 0,
        geschwindigkeit: 1,
        speed: function() { return this.geschwindigkeit; },
        positionX: function() { return this.element.offset().left; },
        positionY: function() { return this.element.offset().top; },
        setPosition: function(x, y) { this.element.css({left: x, top: y }); },
        move: function() { this.element.css({left: this.positionX() + cos2(this.richtung) * this.speed(), top: this.positionY() + sin2(this.richtung) * this.speed() }); }
    };
}

function sin2(deg) {
    return Math.sin(deg * (Math.PI / 180));
}

function cos2(deg) {
    return Math.cos(deg * (Math.PI / 180));
}
