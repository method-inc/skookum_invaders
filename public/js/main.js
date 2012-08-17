

function tick() {
  
  if (game.over || game.paused) return;

  // update items
  for(var i = 0, num = game.items.length; i < num; i++) {
    game.items[i].tick();
  }

  // update player
  game.skookum.tick();

  // remove all dead items
  while(game.deadItems.length > 0) {
    var lastOne = game.deadItems[game.deadItems.length - 1];
    game.deadItems.splice(0, 1);
    game.items.splice(findIndexById(game.items, lastOne.id), 1);
  }

  // clean up stragglers on stage
  _.each(game.stage.children, function(child) {
    
    if (child.name == 'skookum' || child.name == 'starfield') return;

    var found;

    // if all items should be gone, just remove
    if(game.items.length === 0) return game.stage.removeChild(child);
    
    // look through items still in game and see if this item is there
    found = _.find(game.items, function(b) {
      return b.animation.id === child.id;
    });

    // didn't find it, remove from stage
    if (!found) game.stage.removeChild(child);

  });

  // all items and items off of screen, start next level
  if (game.items.length < 1) {
    game.score += 1000; // clear level point bonus
    game.level++;
    game.buildNewEnemyGroup(game.numEnemyGroups++);
  }

  // update scoreboard
  game.scoreboard.tick();

  // reward for points
  if (game.score > game.rewardInterval * game.rewardLevel) {
    game.rewardLevel++;
    game.skookum.shield = true;
    game.skookum.animation.gotoAndStop(4);
  }

  game.stage.update();
}


(function() {

  window.game = new Game({
    fps: 60,
    startLevel: 1,
    rewardInterval: 5000, 
    rewardLevel: 1
  });

  document.onkeydown = function (e) {
    game.handleKeyDown(e);
  };

  document.onkeyup = function (e) {
    game.handleKeyUp(e);
  };

  // initialize player, background, and first wave of enemies
  game.drawStars();
  game.skookum = new Skookum();
  game.buildNewEnemyGroup(this.numEnemyGroups++);
  game.sounds.launch.play();

  // initialize scoreboard
  game.scoreboard = new Scoreboard();

  Ticker.setFPS(60);
  Ticker.addListener(tick);

})();


function stringify(array) {
  var str = "[";
  for(var i = 0; i < array.length; i++) {
    str += " "+array[i].id+", ";
  }
  str += "]";
  return str;
}