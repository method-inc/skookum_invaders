var KEYCODE_SPACE = 32;
var KEYCODE_UP    = 38;
var KEYCODE_DOWN  = 40;
var KEYCODE_LEFT  = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W     = 87;
var KEYCODE_A     = 65;
var KEYCODE_D     = 68;


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
    game.enemies.push(new RedEnemy(x || 50, y || 50));
  },

  buildNewEnemyGroup: function(num) {
    var spacing = 100;

    _.each(_.range(num || 2), function(n) {
      for(var i = 0; i < 8; i++) {
        game.spawnEnemy(100 * i + 150, (n*spacing)+spacing);
      }
    });
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
    for(var i = 0; i < 300; i++) {
      var x = Math.random()*game.canvas.width,
          y = Math.random()*game.canvas.height,
          r = Math.random()*2;
      
      var star = new Shape();
      star.graphics.beginFill(Graphics.getRGB(255,255,255));
      star.graphics.drawCircle(0,0,r);
      star.x = x;
      star.y = y;
      game.stage.addChild(star);
    }
  }
};


function tick() {
  
  if (game.over) return;

  // update enemies
  for(var i = 0, num = game.enemies.length; i < num; i++) {
    game.enemies[i].tick();
  }

  // update bullets
  for(i = 0, num = game.bullets.length; i < num; i++) {
    game.bullets[i].tick();
  }

  // update player and bullets
  game.skookum.tick();


  var lastOne, index;

  // remove all dead enemies
  while(game.deadEnemies.length > 0) {
    lastOne = game.deadEnemies[game.deadEnemies.length - 1];
    game.deadEnemies.splice(0, 1);
    game.enemies.splice(findIndexById(game.enemies, lastOne.id), 1);
  }

  // remove all dead bullets
  while(game.deadBullets.length > 0) {
    lastOne = game.deadBullets[game.deadBullets.length - 1];
    game.deadBullets.splice(0, 1);
    game.bullets.splice(findIndexById(game.bullets, lastOne.id), 1);
  }

  // clean up stragglers on stage
  _.each(game.stage.children, function(child) {
    
    var found;

    if (child.name == "bullet") {
      // if all bullets should be gone, just remove
      if(game.bullets.length === 0) return game.stage.removeChild(child);
      
      // look through bullets still in game and see if this bullet is there
      found = _.find(game.bullets, function(b) {
        return b.animation.id === child.id;
      });

      // didn't find it, remove from stage
      if (!found) game.stage.removeChild(child);
    } 
    
    if (child.name == "red_enemy") {
      // if all enemies should be gone, just remove
      if (game.enemies.length === 0) return game.stage.removeChild(child);

      // look through enemies still in game and see if this enemy is there
      found = _.find(game.enemies, function(b) {
        return b.animation.id === child.id;
      });

      // didn't find it, remove from stage
      if (!found) {
        game.stage.removeChild(child);
      }
    }
      

  });

  if (game.enemies.length < 1 && game.bullets.length < 1) {
    game.score += 1000; // clear level point bonus
    game.level++;
    game.buildNewEnemyGroup(game.numEnemyGroups++);
  }

  // update scoreboard
  game.scoreboard.tick();

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
  game.level = 1;
  game.numEnemyGroups = 2;

  game.enemies = [];
  game.deadEnemies = [];
  game.bullets = [];
  game.deadBullets = [];

  game.buildNewEnemyGroup(game.numEnemyGroups++);

  game.scoreboard = new Scoreboard();
  game.sounds = {
    launch: new Audio("sounds/launch.wav"),
    shoot: new Audio("sounds/shoot2.wav"),
    hit: new Audio("sounds/hit.wav"),
    explosion: new Audio("sounds/explosion.wav")
  };

  Ticker.setFPS(60);
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