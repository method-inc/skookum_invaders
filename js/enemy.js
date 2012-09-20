function Enemy() {}

Enemy.prototype = new Actor();

// tick method
Enemy.prototype.onTick = function() {
    
  if (this.dead) {
    if (this.currentFrame == this.deadFrame) game.enemies.removeChild(this);
    return;
  }

  if (this.top() > game.canvas.height) this.die();

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
    this.gotoAndPlay(this.health_animations[this.health]);
    game.score += this.points.hit;
  }
};

// die method
Enemy.prototype.die = function() {
  game.playSound('explosion');
  this.gotoAndPlay('dead');
  this.dead = true;
};
