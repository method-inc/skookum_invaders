function Scoreboard() {

  this.scoreDisplay = new Text();
  this.scoreDisplay.color = "#fff";
  this.scoreDisplay.font = "bold 24px Arial";
  this.scoreDisplay.text = '0';
  this.scoreDisplay.x = 10;
  this.scoreDisplay.y = 25;
  game.stage.addChild(this.scoreDisplay);

}

Scoreboard.prototype = {
  tick: function() {
    this.scoreDisplay.text = game.score;
  }
};
