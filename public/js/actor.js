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

// Checking if the targetted rectangle is contained in this rectangle
Actor.prototype.contains = function (targetRectangle) {
  if (this.x <= targetRectangle.x && targetRectangle.x + targetRectangle.width <= this.x + this.width && this.y <= targetRectangle.y)
    return targetRectangle.y + targetRectangle.height <= this.y + this.height;
  else
    return false;
};

// Checking if the targetted point is contained in this rectangle
Actor.prototype.containsPoint = function(targetPoint) {
  if (this.x <= targetPoint.x && targetPoint.x < this.x + this.width && this.y <= targetPoint.y)
    return targetPoint.y < this.y + this.height;
  else
    return false;
};

// Checking if the targetted rectangle intersects with this rectangle
Actor.prototype.intersects = function (targetRectangle) {
  if (targetRectangle.left() < this.right() && this.left() < targetRectangle.right() && targetRectangle.top() < this.bottom()) {
    return this.top() < targetRectangle.bottom();
  }
    
  return false;
};