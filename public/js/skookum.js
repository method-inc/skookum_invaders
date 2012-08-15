function Skookum() {
  this.id = randomString();
  this.name = 'skookum';
  this.width = 270;
  this.height = 220;
  this.scale = 0.3;
  this.x = Math.floor(game.canvas.width / 2);
  this.y = game.canvas.height - this.height * this.scale - 50;
  this.vX = 10;
  this.vY = 7;
  this.x_direction = 0;
  this.y_direction = 0;
  this.startupSequence = true;
  this.shield = true;
  this.hitTimeout = 0;
  this.timeoutLength = 120;

  this.sprites = new SpriteSheet({
    images:['img/'+this.name+'.png'],
    frames: {width:this.width, height:this.height, count:8, regX:this.width/2, regY:this.height/2},
    animations: {
      shoot_without_shield:[0,3, "shoot_without_shield", 5],
      shoot_with_shield:[4,7, "shoot_with_shield", 5]
    }
  });

  this.animation = new BitmapAnimation(this.sprites);

  this.animation.name = this.name;
  this.animation.onAnimationEnd = function() {
    this.stop();
  };
  this.animation.x = this.x;
  this.animation.y = this.y;

  this.animation.scaleX = this.animation.scaleY = 2;

  this.animation.currentFrame = 4;
  game.stage.addChild(this.animation);
}

Skookum.prototype = {

  tick: function() {

    if (this.dead) {
      game.over = true;
      return game.stage.removeChild(this.animation);
    }

    if (this.startupSequence) {
      var newScale = this.animation.scaleX - 0.025;
      this.animation.scaleX = this.animation.scaleY = newScale;
      if (newScale <= this.scale) this.startupSequence = false;
      return this;
    }

    // move ship if key down
    if (this.x_direction !== 0 && this.testBoundsX()) {
      this.animation.x += this.vX * this.x_direction;  
    }

    if (this.y_direction !== 0 && this.testBoundsY()) {
      this.animation.y += this.vY * this.y_direction;  
    }

    var self = this;
    if (this.hitTimeout === 0) {
      _.each(game.enemies, function(e) {
        if (self.checkEnemyHit(e)) {
          e.takeDamage();
          return self.takeDamage(e);
        }
      });  
    }
    else {
      this.hitTimeout++;
      this.animation.alpha = Math.random();
    }

    if (this.hitTimeout >= this.timeoutLength) {
      this.hitTimeout = 0;
      this.animation.alpha = 1;
    }
    

    return this;
  },

  shoot: function() {
    if (this.shield) this.animation.gotoAndPlay('shoot_with_shield');
    else this.animation.gotoAndPlay('shoot_without_shield');
    game.items.push(new Bullet(this.animation.x, this.animation.y));
    game.playSound('shoot');
  },

  checkEnemyHit: function(enemy) {
    var xHitZone = [enemy.animation.x - (enemy.width*enemy.scale)/2, enemy.animation.x + (enemy.width*enemy.scale)/2];
    var yHitZone = [enemy.animation.y - (enemy.height*enemy.scale)/2, enemy.animation.y + (enemy.height*enemy.scale)/2];

    if (this.animation.x > xHitZone[0] && 
        this.animation.x < xHitZone[1] &&
        this.animation.y > yHitZone[0] &&
        this.animation.y < yHitZone[1]
        ) {
      
      return true;
    }

    return false;
  },

  takeDamage: function() {

    this.hitTimeout = 1;

    if (this.shield) {
      this.shield = false;
      this.animation.gotoAndStop(0);
    }
    else {
      this.die();
    }
  },

  die: function() {
    game.playSound('explosion');
    this.dead = true;
  },

  testBoundsX: function() {
    if (this.animation.x > game.canvas.width && this.x_direction === 1) {
      return false;
    }
    else if (this.animation.x < 1 && this.x_direction === -1) {
      return false;
    }
    return true;
  },

  testBoundsY: function() {
    if (this.animation.y + (this.height * this.animation.scaleX) > game.canvas.height && this.y_direction === 1) {
      return false;
    }
    else if (this.animation.y < game.canvas.height/2 && this.y_direction === -1) {
      return false;
    }
    return true;
  }

};