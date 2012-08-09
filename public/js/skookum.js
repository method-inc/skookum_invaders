function Skookum() {
  this.id = randomString();
  this.name = 'logo';
  this.width = 316;
  this.height = 280;
  this.scale = 0.25;
  this.x = Math.floor(game.canvas.width / 2);
  this.y = game.canvas.height - this.height * this.scale - 50;
  this.vX = 10;
  this.vY = 7;
  this.x_direction = 0;
  this.y_direction = 0;
  this.startupSequence = true;

  this.sprites = new SpriteSheet({
    images:['img/'+this.name+'.png'],
    frames: {width:this.width, height:this.height, count:4, regX:this.width/2, regY:this.height/2},
    animations: {shoot:[0,3, "shoot", 2]}
  });

  this.animation = new BitmapAnimation(this.sprites);

  this.animation.name = this.name;
  this.animation.onAnimationEnd = function() {
    this.stop();
  };
  this.animation.x = this.x;
  this.animation.y = this.y;

  this.animation.scaleX = this.animation.scaleY = 2;

  this.animation.currentFrame = 0;
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
    _.each(game.enemies, function(e) {
      if (self.checkEnemyHit(e)) return self.die();
    });

    return this;
  },

  shoot: function() {
    this.animation.gotoAndPlay('shoot');
    game.bullets.push(new Bullet(this.animation.x, this.animation.y));
    game.sounds.shoot.play();
  },

  checkEnemyHit: function(enemy) {
    var xHitZone = [enemy.animation.x - (enemy.width*enemy.scale)/2, enemy.animation.x + (enemy.width*enemy.scale)/2];
    var yHitZone = [enemy.animation.y - (enemy.height*enemy.scale)/2, enemy.animation.y + (enemy.height*enemy.scale)/2];
    // console.log(xHitZone, yHitZone, this.animation.x, this.animation.y, this.animation.x > xHitZone[0] && this.animation.x < xHitZone[1] && this.animation.y > yHitZone[0] && this.animation.y < yHitZone[1]);

    if (this.animation.x > xHitZone[0] && 
        this.animation.x < xHitZone[1] &&
        this.animation.y > yHitZone[0] &&
        this.animation.y < yHitZone[1]
        ) {
      
      return true;
    }

    return false;
  },

  die: function() {
    console.log("I died");
    game.sounds.explosion.play();
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