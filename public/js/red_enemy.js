function RedEnemy(x, y) {
  var self = this;

  this.id = randomString();
  this.name = 'red_enemy';
  this.width = 230;
  this.height = 230;
  this.scale = 0.25;
  this.vY = 50;
  this.vX = 2;
  this.direction = 1;
  this.movement_padding = 100;
  this.dead = false;
  this.health = 3;

  this.sprites = new SpriteSheet({
    images:['img/'+this.name+'.png'],
    frames: {width:this.width, height:this.height, count:10, regX:this.width/2, regY:this.height/2},
    animations: {
      idle:[0,1, "idle", 8], 
      damaged:[2,3, "damaged", 12], 
      dying:[4,5, "dying", 25],
      dead:[6,9, "dead", 8]
    }
  });

  this.animation = new BitmapAnimation(this.sprites);

  this.animation.gotoAndPlay('idle');

  this.animation.name = this.name;
  this.animation.x = x;
  this.animation.y = y;

  this.animation.onAnimationEnd = function(instance, anim) {
    if (anim == "dead") {
      this.gotoAndStop(9);
    }
  };

  this.animation.scaleX = this.animation.scaleY = this.scale;
  this.animation.currentFrame = 0;
  game.stage.addChild(this.animation);

  return this;
}

RedEnemy.prototype = {

  tick: function() {
    
    if (this.dead) {
      if (this.animation.currentFrame == 9) game.deadEnemies.push(this);
      return;
    }

    this.animation.x += this.vX * this.direction * this.health;
    if (this.animation.x > game.canvas.width - this.movement_padding || this.animation.x < this.movement_padding) {
      this.direction *= -1;
      this.animation.y += this.vY;
    }

    return this;
  },

  takeDamage: function() {
    this.health--;
    if(this.health === 2) this.animation.gotoAndPlay('damaged');
    if(this.health === 1) this.animation.gotoAndPlay('dying');
    game.sounds.hit.pause();
    game.sounds.hit.currentTime = 0;
    game.sounds.hit.play();
    if(this.health < 1) {
      this.die();
      game.score += 25;
    }
    else {
      game.score += 10;
    }
  },

  die: function() {
    game.sounds.explosion.pause();
    game.sounds.explosion.currentTime = 0;
    game.sounds.explosion.play();
    this.animation.gotoAndPlay('dead');
    this.dead = true;
  }

};