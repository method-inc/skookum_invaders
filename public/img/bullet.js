(function(window) {
Symbol_1_instance_1 = function() {
	this.initialize();
}
Symbol_1_instance_1._SpriteSheet = new SpriteSheet({images: ["bullet.png"], frames: [[0,0,52,91,0,-0.8,-1.95],[52,0,52,91,0,-0.8,-1.95]]});
var Symbol_1_instance_1_p = Symbol_1_instance_1.prototype = new BitmapAnimation();
Symbol_1_instance_1_p.BitmapAnimation_initialize = Symbol_1_instance_1_p.initialize;
Symbol_1_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(Symbol_1_instance_1._SpriteSheet);
	this.paused = false;
}
window.Symbol_1_instance_1 = Symbol_1_instance_1;
}(window));

