function Bullet(x, y) {
  this.id = randomString();
  this.name = 'bullet';
  this.width = 50;
  this.height = 100;
  this.scale = 0.25;
  this.vY = 15;
  this.dead = false;

  this.sprites = new SpriteSheet({
    images:['img/'+this.name+'.png'],
    frames: {width:this.width, height:this.height, count:2, regX:this.width/2, regY:this.height/2},
    animations: {shoot:[0,1, "shoot", 8]}
  });

  this.animation = new BitmapAnimation(this.sprites);

  this.animation.gotoAndPlay('shoot');

  this.animation.name = this.name;
  this.animation.x = x;
  this.animation.y = y;

  this.animation.scaleX = this.animation.scaleY = this.scale;
  this.animation.currentFrame = 0;
  game.stage.addChild(this.animation);

  return this;
}

// inherit actor methods
Bullet.prototype = new Actor();

// tick function
Bullet.prototype.tick = function() {
    
  if (this.dead) {
    return game.deadItems.push(this);
  }

  this.animation.y -= this.vY;

  if (this.animation.y < -this.height) {
    this.die();
  }

  else {
    for(var i = 0, num = game.items.length; i < num; i++) {
      if (game.items[i].enemy && this.checkHit(game.items[i])) {
        game.items[i].takeDamage();
        this.die();
      }
    }
  }

  return this;
};

// die function
Bullet.prototype.die = function() {
  this.dead = true;
};