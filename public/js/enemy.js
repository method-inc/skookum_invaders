function Enemy() {}

Enemy.prototype = new Actor();

// tick method
Enemy.prototype.tick = function() {
    
  if (this.dead) {
    if (this.animation.currentFrame == this.deadFrame) game.deadItems.push(this);
    return;
  }

  this.move();
  
  return this;
};


// take damage when hit
Enemy.prototype.takeDamage = function() {
  this.health--;

  game.playSound('hit');
  if(this.health < 1) {
    this.die();
    game.score += this.points.kill;
  }
  else {
    this.animation.gotoAndPlay(this.health_animations[this.health]);
    game.score += this.points.hit;
  }
};

// die method
Enemy.prototype.die = function() {
  game.playSound('explosion');
  this.animation.gotoAndPlay('dead');
  this.dead = true;
};
