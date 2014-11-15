Unit = function(game, x, y, spriteName){
	Phaser.Sprite.call(this, game, x *40 + 4, y * 40 + 4, spriteName);

	this.moveSpeed = 3;
	this.health = 1
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

