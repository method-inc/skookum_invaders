function RedEnemy(x, y) {
  this.initialize(x, y);
}

RedEnemy.prototype = new Enemy();

RedEnemy.prototype.initialize = function(x,y) {
  var self = this;

  this.id = randomString();
  this.name = 'red_enemy';
  this.enemy = true;
  this.frameWidth = 230;
  this.frameHeight = 230;
  this.dead = false;
  this.points = {
    hit:10,
    kill:25
  };
  this.health = 3;
  this.health_animations = {
    3: "idle",
    2: "damaged",
    1: "dying"
  };
  this.deadFrame = 9;

  var spriteSheet = new SpriteSheet({
    images:['img/'+this.name+'.png'],
    frames: {width:this.frameWidth, height:this.frameHeight, count:10, regX:this.frameWidth/2, regY:this.frameHeight/2},
    animations: {
      idle:[0,1, "idle", 8], 
      damaged:[2,3, "damaged", 12], 
      dying:[4,5, "dying", 25],
      dead:[6,9, "dead", 8]
    }
  });

  this.BitmapAnimation_initialize(spriteSheet);

  this.gotoAndPlay('idle');

  this.x = x;
  this.y = y;
  this.scale = 0.2;
  this.width = parseInt((this.frameWidth * this.scale) * 0.75, 10);
  this.height = parseInt((this.frameHeight * this.scale) * 0.75, 10);
  this.vY = 50;
  this.vX = 2;
  this.scaleX = this.scaleY = this.scale;
  this.direction = 1;
  this.movement_padding = 20;

  this.onAnimationEnd = function(instance, anim) {
    if (anim == "dead") {
      this.gotoAndStop(9);
    }
  };
  
  this.currentFrame = 0;
  game.enemies.addChild(this);

  return this;
};

RedEnemy.prototype.move = function() {
  
  if (this.top() > game.canvas.height) {
    game.skookum.takeDamage();
  }

  if (!game.skookum.invincable && this.intersects(game.skookum)) {
    game.skookum.takeDamage();
    this.takeDamage(); 
  }

  this.x += this.vX * this.direction * this.health;
  if (this.x > game.canvas.width - this.movement_padding || this.x < this.movement_padding) {
    this.direction *= -1;
    this.y += this.vY;
  }
  return this;
};


// shoot method
RedEnemy.prototype.shoot = function() {

};

