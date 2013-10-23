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
    fps: options.fps || 30,
    startLevel: options.startLevel || 1,
    rewardInterval: options.rewardInterval || 5000, 
    rewardLevel: options.rewardLevel || 1
  };

  this.canvas = document.getElementById("game");

  // this.canvas.width =  this.canvas.parentNode.clientWidth;
  this.canvas.width =  800;
  // this.canvas.height = this.canvas.parentNode.clientHeight;
  this.canvas.height = 600;

  this.ctx = this.canvas.getContext("2d");
  this.stage = new Stage(this.canvas);

  this.over = false;

  this.score = 0;
  this.level = this.config.startLevel;
  this.rewardInterval = this.config.rewardInterval;
  this.rewardLevel = this.config.rewardLevel;
  this.numEnemyGroups = 2;
  this.paused = false;

  this.sounds = {
    launch: new Audio("sounds/launch.wav"),
    shoot: new Audio("sounds/shoot2.wav"),
    hit: new Audio("sounds/hit.wav"),
    explosion: new Audio("sounds/explosion.wav")
  };
}

Game.prototype = {

  initialize: function(options) {
    // initialize background
    this.drawStars();

    // 
    this.skookum = new Skookum();

    this.items = new Container();
    this.items.name = "gameItems";
    this.stage.addChild(this.items);
    
    this.enemies = new Container();
    this.enemies.name = "gameEnemies";
    this.stage.addChild(this.enemies);

    // initialize scoreboard
    this.scoreboard = new Scoreboard();

    // initialize first wave of enemies
    this.buildNewEnemyGroup(this.numEnemyGroups++);
    this.sounds.launch.play();

    // listen for keypresses
    document.onkeydown = function (e) { game.handleKeyDown(e); };
    document.onkeyup = function (e) { game.handleKeyUp(e); };
    
    // start ticker  
    Ticker.setFPS(this.config.fps);
    Ticker.addListener(tick);
  },

  handleKeyDown: function(e) {
    //cross browser issues exist
    if (!e) { e = window.event; }
    switch (e.keyCode) {
      case KEYCODE_LEFT:
          e.preventDefault();
          this.skookum.x_direction = -1;
          break;
      case KEYCODE_RIGHT:
          e.preventDefault();
          this.skookum.x_direction = 1;
          break;
      case KEYCODE_UP:
          e.preventDefault();
          this.skookum.y_direction = -1;
          break;
      case KEYCODE_DOWN:
          e.preventDefault();
          this.skookum.y_direction = 1;
          break;
      case KEYCODE_SPACE:
          e.preventDefault();
          this.skookum.shoot();
          break;
      case KEYCODE_P:
          e.preventDefault();
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
        rows = num || 2,
        cols = 10,
        y_spacing = 60,
        x_spacing = 71;

    for(var r = 1; r <= rows; r++) {
     for(var c = 1; c <= cols; c++) {
       self.spawnEnemy(x_spacing * c, y_spacing * r + 50);
     }
    }
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