(function(window) {
logo_instance_1 = function() {
	this.initialize();
}
logo_instance_1._SpriteSheet = new SpriteSheet({images: ["logo.png"], frames: [[0,0,270,224,0,42.9,43.85],[270,0,270,224,0,42.9,43.85],[540,0,270,224,0,42.9,43.85],[0,224,270,224,0,42.9,43.85],[270,224,270,224,0,42.9,43.85],[540,224,270,224,0,42.9,43.85],[0,448,270,224,0,42.9,43.85],[270,448,270,224,0,42.9,43.85]]});
var logo_instance_1_p = logo_instance_1.prototype = new BitmapAnimation();
logo_instance_1_p.BitmapAnimation_initialize = logo_instance_1_p.initialize;
logo_instance_1_p.initialize = function() {
	this.BitmapAnimation_initialize(logo_instance_1._SpriteSheet);
	this.paused = false;
}
window.logo_instance_1 = logo_instance_1;
}(window));

