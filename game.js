function createEntity(element) {
    return {
        element: element,
        game: null,
        richtung: 0,
        geschwindigkeit: 1,
        speed: function() { return this.geschwindigkeit; },
        positionX: function() { return this.element.offset().left; },
        positionY: function() { return this.element.offset().top; },
        height: function() { return this.element.height(); },
        width: function() { return this.element.width(); },
        setPosition: function(x, y) { this.element.css({left: x + this.game.left(), top: y + this.game.top() }); },
        move: function() { this.element.css({left: this.positionX() + cos2(this.richtung) * this.speed(), top: this.positionY() - sin2(this.richtung) * this.speed() }); },
      collision: function(b) {
        return !(
          ((this.positionY() + this.height()) < (b.positionY())) ||
          (this.positionY() > (b.positionY() + b.height())) ||
          ((this.positionX() + this.width()) < b.positionX()) ||
          (this.positionX() > (b.positionX() + b.width()))
        );
      }
    };
}

function createGame(element) {
  return {
    element: element,
    entities: [],
    add: function(entity) {
      this.entities.push(entity);
      entity.game = this;
      this.element.append(entity.element);
    },
    top: function() {
      return this.element.offset().top;
    },
    left: function() {
      return this.element.offset().left;
    }
  };
}

function sin2(deg) {
    return Math.sin(deg * (Math.PI / 180));
}

function cos2(deg) {
    return Math.cos(deg * (Math.PI / 180));
}
