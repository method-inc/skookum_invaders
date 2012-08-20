

function tick() {
  
  if (game.over || game.paused) return;

  // all items and items off of screen, start next level
  if (game.enemies.children.length < 1) {
    game.score += 1000; // clear level point bonus
    game.level++;
    game.buildNewEnemyGroup(game.numEnemyGroups++);
  }

  // reward for points
  if (game.score > game.rewardInterval * game.rewardLevel) {
    game.rewardLevel++;
    game.skookum.shield = true;
    game.skookum.gotoAndStop(4);
  }

  game.stage.update();
}


(function() {

  // initialize game
  window.game = new Game({
    fps: 60,
    startLevel: 1,
    rewardInterval: 5000, 
    rewardLevel: 1
  });

  // initialize scoreboard
  game.scoreboard = new Scoreboard();

  // initialize player, background, and first wave of enemies
  game.drawStars();
  game.skookum = new Skookum();
  game.buildNewEnemyGroup(game.numEnemyGroups++);
  game.sounds.launch.play();

  // listen for keypresses
  document.onkeydown = function (e) { game.handleKeyDown(e); };
  document.onkeyup = function (e) { game.handleKeyUp(e); };
  
  // start ticker  
  Ticker.setFPS(60);
  Ticker.addListener(tick);

})();