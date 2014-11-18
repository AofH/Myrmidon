Unit = function(game, x, y, spriteName){
	Phaser.Sprite.call(this, game, x *40 + 4, y * 40 + 4, spriteName);

	this.boxX = x;
	this.boxY = y;

	this.moveSpeed = 4;
	this.health = 1
	this.selected = false;
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function(){

}