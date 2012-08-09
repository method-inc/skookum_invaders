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

Bullet.prototype = {

  tick: function() {
    
    if (this.dead) {
      return game.deadBullets.push(this);
    }

    this.animation.y -= this.vY;

    if (this.animation.y < -this.height) {
      this.die();
    }

    else {
      for(var i = 0, num = game.enemies.length; i < num; i++) {
        if (this.checkHit(game.enemies[i])) {
          game.enemies[i].takeDamage();
          this.die();
        }
      }
    }

    return this;
  },

  die: function() {
    this.dead = true;
  },

  checkHit: function(enemy) {
    if (enemy.dead) return false;

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
  }

};