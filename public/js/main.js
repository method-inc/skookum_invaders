var KEYCODE_SPACE = 32;
var KEYCODE_UP    = 38;
var KEYCODE_DOWN  = 40;
var KEYCODE_LEFT  = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W     = 87;
var KEYCODE_A     = 65;
var KEYCODE_D     = 68;
var KEYCODE_P     = 80;

var config = {
  fps: 60,
  startLevel: 1,
  rewardInterval: 5000, 
  rewardLevel: 1
};

window.game = {
  handleKeyDown: function(e) {
    //cross browser issues exist
    if (!e) { e = window.event; }
    switch (e.keyCode) {
      case KEYCODE_LEFT:
          this.skookum.x_direction = -1;
          break;
      case KEYCODE_RIGHT:
          this.skookum.x_direction = 1;
          break;
      case KEYCODE_UP:
          this.skookum.y_direction = -1;
          break;
      case KEYCODE_DOWN:
          this.skookum.y_direction = 1;
          break;
      case KEYCODE_SPACE:
          this.skookum.shoot();
          break;
      case KEYCODE_P:
          game.paused = !game.paused;
          break;
    }
  },

  handleKeyUp: function(e) {
    //cross browser issues exist
    if (!e) { e = window.event; }
    switch (e.keyCode) {
      case KEYCODE_LEFT:
      case KEYCODE_RIGHT:
        this.skookum.x_direction = 0;
        break;
      case KEYCODE_UP:
      case KEYCODE_DOWN:
        this.skookum.y_direction = 0;
        break;
      case KEYCODE_SPACE:
        break;
    }
  },

  spawnEnemy: function(x, y) {
    game.items.push(new RedEnemy(x || 350, y || 150));
  },

  buildNewEnemyGroup: function(num) {
    var spacing = 100;

    game.spawnEnemy();

    //_.each(_.range(num || 2), function(n) {
    //  for(var i = 0; i < 8; i++) {
    //    game.spawnEnemy(100 * i + 150, (n*spacing)+spacing);
    //  }
    //});
  },

  drawGrid: function() {
    
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

    // draw horizontal rows
    for(var i = 10, max = this.canvas.height; i < max; i += 10) {
      this.ctx.beginPath();
      this.ctx.moveTo(0,i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }

    // draw vertical rows
    for(i = 10, max = this.canvas.height; i < max; i += 10) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
      this.ctx.stroke();
    }
  },

  drawStars: function() {
    game.starField = new Container();
    game.starField.name = 'starfield';
    for(var i = 0; i < 300; i++) {
      var x = Math.random()*game.canvas.width,
          y = Math.random()*game.canvas.height,
          r = Math.random()*2;
      
      var star = new Shape();
      star.graphics.beginFill(Graphics.getRGB(255,255,255));
      star.graphics.drawCircle(0,0,r);
      star.x = x;
      star.y = y;
      game.starField.addChild(star);
    }
    game.stage.addChild(game.starField);
  },

  playSound: function(sound) {
    game.sounds[sound].pause();
    game.sounds[sound].currentTime = 0;
    game.sounds[sound].play();
  }
};


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
  game.canvas = document.getElementById("game");

  game.canvas.width =  game.canvas.parentNode.clientWidth;
  game.canvas.height = game.canvas.parentNode.clientHeight;

  game.ctx = game.canvas.getContext("2d");
  game.stage = new Stage(game.canvas);

  game.over = false;

  game.drawStars();

  game.skookum = new Skookum();

  game.score = 0;
  game.level = config.startLevel;
  game.rewardInterval = config.rewardInterval;
  game.rewardLevel = config.rewardLevel;
  game.numEnemyGroups = 2;
  game.paused = false;

  game.items = [];
  game.deadItems = [];

  game.buildNewEnemyGroup(game.numEnemyGroups++);

  game.scoreboard = new Scoreboard();
  game.sounds = {
    launch: new Audio("sounds/launch.wav"),
    shoot: new Audio("sounds/shoot2.wav"),
    hit: new Audio("sounds/hit.wav"),
    explosion: new Audio("sounds/explosion.wav")
  };

  Ticker.setFPS(config.fps);
  Ticker.addListener(tick);

  document.onkeydown = function (e) {
    game.handleKeyDown(e);
  };

  document.onkeyup = function (e) {
    game.handleKeyUp(e);
  };

  game.sounds.launch.play();

})();


function stringify(array) {
  var str = "[";
  for(var i = 0; i < array.length; i++) {
    str += " "+array[i].id+", ";
  }
  str += "]";
  return str;
}