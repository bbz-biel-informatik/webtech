var jmp = false;

function createEntity(element) {
  element.css({position: 'absolute'});
    return {
        element: element,
        game: null,
        richtung: 0,
        vs: 0,
        geschwindigkeit: 1,
        speed: function() { return this.geschwindigkeit; },
        positionX: function() { return this.element.offset().left - this.game.left(); },
        positionY: function() { return this.element.offset().top - this.game.top(); },
        height: function() { return this.element.height(); },
        width: function() { return this.element.width(); },
        setPosition: function(x, y) { this.element.css({left: x + this.game.left(), top: y + this.game.top() }); },
        jump: function(force) { this.vs = -4 * force; jmp = true; },
        weightless: false,
        colliding: function() {
          for(var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if(this == entity) {
              continue;
            }
            if(this.collision(entity)) {
              return entity;
            }
          }
          return false;
        },
        move: function() {
          var left = this.positionX() + this.game.left() + cos2(this.richtung) * this.speed();
          var top = this.positionY() + this.game.top() - sin2(this.richtung) * this.speed();
          
          if(this.game.gravity > 0 && this.weightless === false) {
            var a = this.colliding();
            if(a && !jmp) {
              this.vs = 0;
              top = a.element.position().top - this.element.height();
            } else {
              this.vs += 0.2 * this.game.gravity;
              top += (this.vs * this.game.gravity);
              jmp = false;
            }
          }

          this.element.css({
            left: left,
            top: top
          });
        },
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
    remove: function(entity) {
      this.element.remove(entity.element);
      var index = this.entities.indexOf(entity);
      if (index > -1) {
        this.entities.splice(index, 1);
      }
    },
    top: function() {
      return this.element.offset().top;
    },
    left: function() {
      return this.element.offset().left;
    },
    gravity: 0,
      move: function() {
        for(var i = 0; i < this.entities.length; i++) {
          this.entities[i].move();
        }
      }
  };
}

function sin2(deg) {
    return Math.sin(deg * (Math.PI / 180));
}

function cos2(deg) {
    return Math.cos(deg * (Math.PI / 180));
}
