(function(window) {
Symbol_1_instance_1 = function() {
	this.initialize();
}
Symbol_1_instance_1._SpriteSheet = new SpriteSheet({images: ["red_enemy.png"], frames: [[0,0,233,228,0,2.75,52.7],[233,0,233,228,0,2.75,52.7],[466,0,233,228,0,2.75,52.7],[699,0,233,228,0,2.75,52.7],[0,228,233,228,0,2.75,52.7],[233,228,233,228,0,2.75,52.7],[466,228,233,228,0,2.75,52.7],[699,228,233,228,0,2.75,52.7],[0,456,233,228,0,2.75,52.7],[233,456,233,228,0,2.75,52.7]]});
var Symbol_1_instance_1_p = Symbol_1_instance_1.prototype = new BitmapAnimation();
Symbol_1_instance_1_p.BitmapAnimation_initialize = Symbol_1_instance_1_p.initialize;
Symbol_1_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(Symbol_1_instance_1._SpriteSheet);
	this.paused = false;
}
window.Symbol_1_instance_1 = Symbol_1_instance_1;
}(window));

