var SelectionBox = function(game, selectionBox, cursor){
	this.game = game;
	this.selectionBox = selectionBox;
	this.cursor = cursor;

	this.moveTimer = this.game.time.create(false);
			this.moveTimer.loop(1000, function(){
				this.moveAvailable = true;
				this.moveTimer.stop();
			}, this);

	this.moveAvailable = true;
}

SelectionBox.prototype={
	move:function(){
		if(this.moveAvailable){
			if(this.cursor.down.isDown){
				this.moveAvailable = false;
				this.moveTimer.start();
				this.selectionBox.position.y = this.selectionBox.position.y + 40;
				this.centerPlayer(this.selectionBox.position.x, this.selectionBox.position.y);
			} else if (this.cursor.up.isDown){
				this.moveAvailable = false;
				this.moveTimer.start();
				this.selectionBox.position.y = this.selectionBox.position.y - 40;
				this.centerPlayer(this.selectionBox.position.x, this.selectionBox.position.y);
			} else if(this.cursor.right.isDown){
				this.moveAvailable = false;
				this.moveTimer.start();
				this.selectionBox.position.x = this.selectionBox.position.x + 40;
				this.centerPlayer(this.selectionBox.position.x, this.selectionBox.position.y);
			} else if (this.cursor.left.isDown){
				this.moveAvailable = false;
				this.moveTimer.start();
				this.selectionBox.position.x = this.selectionBox.position.x - 40;
				this.centerPlayer(this.selectionBox.position.x, this.selectionBox.position.y);
			}
		}
	},

	centerPlayer:function(x,y){
		
		this.selectionBox.position.x = this.getClosestMultipleOfSpriteSize(x,40) + 4; // 40 is the tile size and 4 is the offset for 32x32 tiles
		this.selectionBox.position.y = this.getClosestMultipleOfSpriteSize(y,40) + 4;
		
	},

	getClosestMultipleOfSpriteSize:function(number, size){
		var upperValue = size * (Math.ceil(Math.abs(number/size)));
		var lowerValue = size * (Math.floor(Math.abs(number/size)));


		var upperDifference = Math.abs(number - upperValue);
		var lowerDifference = Math.abs(number - lowerValue);

		if (upperDifference > lowerDifference) {
			return lowerValue;
		} else {
			return upperValue;
		}
	},
}