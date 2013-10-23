function Bullet(x, y) {
  this.initialize(x, y);
}

Bullet.prototype = new Actor();

Bullet.prototype.initialize = function(x, y) {

  this.id = randomString();
  this.name = 'bullet';
  this.frameWidth = 50;
  this.frameHeight = 100;
  this.dead = false;

  var spriteSheet = new createjs.SpriteSheet({
    images:['images/'+this.name+'.png'],
    frames: {width:this.frameWidth, height:this.frameHeight, count:2, regX:this.frameWidth/2, regY:this.frameHeight/2},
    animations: {shoot:[0,1, "shoot", 8]}
  });

  this.BitmapAnimation_initialize(spriteSheet);

  this.gotoAndPlay('shoot');

  this.x = x;
  this.y = y;
  this.scale = 0.2;
  this.width = parseInt((this.frameWidth * this.scale) * 0.35, 10);
  this.height = parseInt((this.frameHeight * this.scale) * 0.8, 10);
  this.vY = 4;
  this.scaleX = this.scaleY = this.scale;
  this.currentFrame = 0;

  game.items.addChild(this);
  return this;
};

// tick function
Bullet.prototype.onTick = function() {
  var self = this;

  if (this.dead) return game.items.removeChild(this);

  this.y -= this.vY;
  this.vY *= 1.03;

  // console.log(this.BoundingRectangle(), this.frame);

  if (this.bottom() < -(this.height)) this.die();
  else {
    _.each(game.enemies.children, function(e) {
      if (self.checkHit(e)) {
        e.takeDamage();
        self.die();
      }
    });
  }

  return this;
};

// die function
Bullet.prototype.die = function() {
  this.dead = true;
};