var KEYCODE_SPACE = 32;
var KEYCODE_UP    = 38;
var KEYCODE_DOWN  = 40;
var KEYCODE_LEFT  = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W     = 87;
var KEYCODE_A     = 65;
var KEYCODE_D     = 68;
var KEYCODE_P     = 80;

function Game(options) {
  this.config = {
    startLevel: options.startLevel || 1,
    rewardInterval: options.rewardInterval || 5000, 
    rewardLevel: options.rewardLevel || 1
  };


  this.canvas = document.getElementById("game");

  this.canvas.width =  this.canvas.parentNode.clientWidth;
  this.canvas.height = this.canvas.parentNode.clientHeight;

  this.ctx = this.canvas.getContext("2d");
  this.stage = new Stage(this.canvas);

  this.over = false;

  this.score = 0;
  this.level = this.config.startLevel;
  this.rewardInterval = this.config.rewardInterval;
  this.rewardLevel = this.config.rewardLevel;
  this.numEnemyGroups = 2;
  this.paused = false;

  this.items = new Container();
  this.items.name = "gameItems";
  this.stage.addChild(this.items);
  
  this.enemies = new Container();
  this.enemies.name = "gameEnemies";
  this.stage.addChild(this.enemies);

  this.sounds = {
    launch: new Audio("sounds/launch.wav"),
    shoot: new Audio("sounds/shoot2.wav"),
    hit: new Audio("sounds/hit.wav"),
    explosion: new Audio("sounds/explosion.wav")
  };
}

Game.prototype = {
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
          this.paused = !this.paused;
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
    new RedEnemy(x || 350, y || 150);
  },

  buildNewEnemyGroup: function(num) {
    var self = this,
        spacing = 100;

    _.each(_.range(num || 2), function(n) {
     for(var i = 0; i < 8; i++) {
       self.spawnEnemy(100 * i + 150, (n*spacing)+spacing);
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
    this.starField = new Container();
    this.starField.name = 'starfield';
    for(var i = 0; i < 300; i++) {
      var x = Math.random()*this.canvas.width,
          y = Math.random()*this.canvas.height,
          r = Math.random()*2;
      
      var star = new Shape();
      star.graphics.beginFill(Graphics.getRGB(255,255,255));
      star.graphics.drawCircle(0,0,r);
      star.x = x;
      star.y = y;
      this.starField.addChild(star);
    }
    this.stage.addChild(this.starField);
  },

  playSound: function(sound) {
    this.sounds[sound].pause();
    this.sounds[sound].currentTime = 0;
    this.sounds[sound].play();
  }
};