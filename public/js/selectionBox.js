var SelectionBox = function(game, selectionBox, cursor){
	this.game = game;
	this.selectionBox = selectionBox;
	this.cursor = cursor;

	this.movingCursor = false;
}

SelectionBox.prototype={
	move:function(){
		if(this.movingCursor){

			if(this.moveDirection === 'down') {
				if(this.selectionBox.position.y >= this.nextY){
					this.stopMoving();
					this.centerBoxY(this.selectionBox.position.x, this.nextY, -6.6666667);
					this.nextY = 0;
				}
			} else if (this.moveDirection === 'up'){
				if(this.selectionBox.position.y <= this.nextY){
					this.stopMoving();
					this.centerBoxY(this.selectionBox.position.x, this.nextY, 6.6666667);
					this.nextY = 0;
				}
			} else if (this.moveDirection === 'right'){
				if(this.selectionBox.position.x >= this.nextX){
					this.stopMoving();
					this.centerBoxX(this.nextX, this.selectionBox.position.y, -6.6666667);
					this.nextX = 0;
				}
			} else if (this.moveDirection === 'left'){
				if(this.selectionBox.position.x <= this.nextX){
					this.stopMoving();
					this.centerBoxX(this.nextX, this.selectionBox.position.y, 6.6666667);
					this.nextX = 0;
				}
			}
		} else {
			if(this.cursor.down.isDown){
				this.nextY = this.selectionBox.position.y + 40;
				this.movingCursor = true;
				this.moveDirection = "down";
				this.selectionBox.body.velocity.y = 400;
			} else if (this.cursor.up.isDown){
				this.nextY = this.selectionBox.position.y - 40;
				this.movingCursor = true;
				this.moveDirection = "up";
				this.selectionBox.body.velocity.y = -400;
			} else if(this.cursor.right.isDown){
				this.moveDirection = "right";
				this.nextX = this.selectionBox.position.x + 40;
				this.movingCursor = true;
				this.selectionBox.body.velocity.x = 400;
			} else if (this.cursor.left.isDown){
				this.moveDirection = "left";
				this.nextX = this.selectionBox.position.x - 40;
				this.movingCursor = true;
				this.selectionBox.body.velocity.x = -400;
			}
		}
	},

	centerBoxX:function(x,y, offset){
		this.selectionBox.position.x = this.getClosestMultipleOfSpriteSize(x,40) + offset; // 40 is the tile size 
		this.selectionBox.position.y = this.getClosestMultipleOfSpriteSize(y,40);
	},

	centerBoxY:function(x,y,offset){
		this.selectionBox.position.x = this.getClosestMultipleOfSpriteSize(x,40); // 40 is the tile size 
		this.selectionBox.position.y = this.getClosestMultipleOfSpriteSize(y,40) + offset;
	},

	stopMoving:function(){
		this.selectionBox.body.velocity.x = 0;
		this.selectionBox.body.velocity.y = 0;
		this.movingCursor = false;
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