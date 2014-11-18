MovementOverlay = function(game, x, y){
	Phaser.Sprite.call(this, game, x * 40, y * 40, 'walk_overlay');

	this.boxX = x;
	this.boxY = y;


	this.alpha = 0.5;
	this.selected = false;
}

MovementOverlay.prototype = Object.create(Phaser.Sprite.prototype);
MovementOverlay.prototype.constructor = MovementOverlay;

MovementOverlay.prototype.update = function(){

}
