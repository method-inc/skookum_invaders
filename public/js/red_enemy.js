function RedEnemy(x, y) {
  var self = this;

  this.id = randomString();
  this.name = 'red_enemy';
  this.enemy = true;
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

// inherit actor methods
RedEnemy.prototype = new Actor();

// tick method
RedEnemy.prototype.tick = function() {
    
  if (this.dead) {
    if (this.animation.currentFrame == 9) game.deadItems.push(this);
    return;
  }

  // this.animation.x += this.vX * this.direction * this.health;
  if (this.animation.x > game.canvas.width - this.movement_padding || this.animation.x < this.movement_padding) {
    this.direction *= -1;
    this.animation.y += this.vY;
  }

  return this;
};

// take damage when hit
RedEnemy.prototype.takeDamage = function() {
  this.health--;
  if(this.health === 2) this.animation.gotoAndPlay('damaged');
  if(this.health === 1) this.animation.gotoAndPlay('dying');
  game.playSound('hit');
  if(this.health < 1) {
    this.die();
    game.score += 25;
  }
  else {
    game.score += 10;
  }
};

// shoot method
RedEnemy.prototype.shoot = function() {

};

// die method
RedEnemy.prototype.die = function() {
  game.playSound('explosion');
  this.animation.gotoAndPlay('dead');
  this.dead = true;
};