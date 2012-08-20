function Scoreboard() {
  this.initialize();
}

Scoreboard.prototype = new Text();

Scoreboard.prototype.initialize = function() {
  this.color = "#fff";
  this.font = "bold 24px Arial";
  this.text = 'SCORE:  0';
  this.x = 10;
  this.y = 25;
  this.name = 'scoreboard';
  game.stage.addChild(this);
};

Scoreboard.prototype.onTick = function() {
  this.text = 'SCORE:  ' + game.score;
};
