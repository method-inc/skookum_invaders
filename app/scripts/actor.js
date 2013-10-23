function Actor() {
  this.initialize();
}

Actor.prototype = new BitmapAnimation();

// constructor:
Actor.prototype.BitmapAnimation_initialize = Actor.prototype.initialize;

Actor.prototype.checkHit = function(item) {
  if (item.dead) return false;
  return this.intersects(item);
};


Actor.prototype.left = function () {
  return parseInt(this.x - this.width/2, 10);
};

Actor.prototype.right = function () {
  return parseInt(this.x + this.width/2, 10);
};

Actor.prototype.top = function () {
  return parseInt(this.y - this.height/2, 10);
};

Actor.prototype.bottom = function () {
  return parseInt(this.y + this.height/2, 10);
};

// Checking if the targetted rectangle intersects with this rectangle
Actor.prototype.intersects = function (targetRectangle) {
  if (targetRectangle.left() < this.right() && this.left() < targetRectangle.right() && targetRectangle.top() < this.bottom()) {
    return this.top() < targetRectangle.bottom();
  }
    
  return false;
};