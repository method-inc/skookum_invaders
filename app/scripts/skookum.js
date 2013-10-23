function Skookum() {
  this.initialize();
}

Skookum.prototype = new Actor();

Skookum.prototype.initialize = function() {

  this.id = randomString();
  this.name = 'skookum';
  this.startupSequence = true;
  this.shield = true;
  this.frameWidth = 270;
  this.frameHeight = 220;

  var spriteSheet = new createjs.SpriteSheet({
    images:['images/'+this.name+'.png'],
    frames: {width:this.frameWidth, height:this.frameHeight, count:8, regX:this.frameWidth/2, regY:this.frameHeight/2},
    animations: {
      shoot_without_shield:[0,3, "shoot_without_shield", 5],
      shoot_with_shield:[4,7, "shoot_with_shield", 5]
    }
  });

  this.BitmapAnimation_initialize(spriteSheet);

  this.scale = 0.25;
  this.width = parseInt((this.frameWidth * this.scale) * 0.8, 10);
  this.height = parseInt((this.frameHeight * this.scale) * 0.8, 10);
  this.vX = 10;
  this.vY = 7;
  this.x_direction = 0;
  this.y_direction = 0;
  this.hitTimeout = 0;
  this.invincable = false;
  this.timeoutLength = 120;

  this.onAnimationEnd = function() {
    this.stop();
  };

  this.x = Math.floor(game.canvas.width / 2);
  this.y = game.canvas.height - this.frameHeight * this.scale - 50;
  this.scaleX = this.scaleY = 2;
  this.currentFrame = 4;
  game.stage.addChild(this);
};


Skookum.prototype.onTick = function() {

  if (this.dead) {
    game.over = true;
    return game.stage.removeChild(this);
  }

  if (this.startupSequence) {
    var newScale = this.scaleX - 0.025;
    this.scaleX = this.scaleY = newScale;
    if (newScale <= this.scale) this.startupSequence = false;
    return this;
  }

  // move ship if key down
  if (this.x_direction !== 0 && this.testBoundsX()) {
    this.x += this.vX * this.x_direction;
  }

  if (this.y_direction !== 0 && this.testBoundsY()) {
    this.y += this.vY * this.y_direction;
  }

  var self = this;
  if (this.hitTimeout > 0) {
    this.hitTimeout++;
    this.alpha = Math.random();
  }

  if (this.hitTimeout >= this.timeoutLength) {
    this.hitTimeout = 0;
    this.invincable = false;
    this.alpha = 1;
  }


  return this;
};

Skookum.prototype.shoot = function() {
  if (this.shield) this.gotoAndPlay('shoot_with_shield');
  else this.gotoAndPlay('shoot_without_shield');
  new Bullet(this.x, this.y);
  game.playSound('shoot');
};

Skookum.prototype.takeDamage = function() {
  if (this.invincable) return;

  this.hitTimeout = 1;
  this.invincable = true;

  if (this.shield) {
    this.shield = false;
    this.gotoAndStop(0);
  }
  else {
    this.die();
  }
};

Skookum.prototype.die = function() {
  game.playSound('explosion');
  this.dead = true;
};

Skookum.prototype.testBoundsX = function() {
  if (this.right() + 20 > game.canvas.width && this.x_direction === 1) {
    return false;
  }
  else if (this.left() - 20 < 1 && this.x_direction === -1) {
    return false;
  }
  return true;
};

Skookum.prototype.testBoundsY = function() {
  if (this.bottom() + 20 > game.canvas.height && this.y_direction === 1) {
    return false;
  }
  else if (this.y < game.canvas.height/2 && this.y_direction === -1) {
    return false;
  }
  return true;
};
