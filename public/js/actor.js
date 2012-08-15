function Actor() {}

Actor.prototype = {

  checkHit: function(item) {

    if (item.dead) return false;

    var xHitZone = [item.animation.x - (item.width*item.scale)/2, item.animation.x + (item.width*item.scale)/2];
    var yHitZone = [item.animation.y - (item.height*item.scale)/2, item.animation.y + (item.height*item.scale)/2];

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