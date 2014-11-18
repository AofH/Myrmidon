var SelectionBox = function(game, selectionBox, cursor, characterSprites, movementGroup){
	this.game = game;
	this.selectionBox = selectionBox;
	this.cursor = cursor;
	this.characterSprites = characterSprites;
	this.movementGroup = movementGroup;


	this.movingCursor = false;
	this.characterSelected = false;
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
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
				
					
				if(this.characterSelected){
					this.movementGroup.forEach(function(movementSprite){
						if(this.boxOverlaps(movementSprite)){
							console.log("MOvement Overlap");
						}
					}, this);
				} else {
					this.characterSprites.forEach(function(item){
						if(this.boxOverlaps(item) && item.selected === false){
							item.selected = true;
							this.drawMovementOverlay(item.boxX, item.boxY, item.moveSpeed);
							this.characterSelected = true;
						}

					}, this);
				}

			}

		}
	},

	boxOverlaps:function(sprite){
		var selectionBoxBounds = this.selectionBox.getBounds();
		var spriteBounds = sprite.getBounds();
		return Phaser.Rectangle.intersects(selectionBoxBounds, spriteBounds);
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

	drawMovementOverlay:function(x,y,speed){
		console.log("Drawing Movment");
		var movementSprite = null;

		var startX = 0;
		var finishX = 0;
		var startY = y - speed;
		var finishY = y + speed;

		var maxLengthReached = false;
		var branchLength = 0;

		for(var loopY = startY; loopY <= finishY; loopY++)
		{
			startX = x - branchLength;
			finishX = x + branchLength;

			for(var loopX = startX; loopX <= finishX; loopX++){
				movementSprite = new MovementOverlay(this.game, loopX, loopY);
				//movementSprite.alpha = 0.50
				this.movementGroup.add(movementSprite);
			}

			if(branchLength === speed){
				maxLengthReached = true;
			}

			if(maxLengthReached){
				branchLength--;
			} else {
				branchLength++;
			}
		}
	},
}