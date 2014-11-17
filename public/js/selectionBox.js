var SelectionBox = function(game, selectionBox, cursor, characterSprites, movementGroup){
	this.game = game;
	this.selectionBox = selectionBox;
	this.cursor = cursor;
	this.characterSprites = characterSprites;
	this.movementGroup = movementGroup;


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
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)){
				console.log("CONTROL");
				this.characterSprites.forEach(function(item){
					//console.log(item);

					if(this.boxOverlaps(item) && item.selected === false){
						console.log("OVERLAP WORKS");
						item.selected = true;
						console.log(item.moveSpeed);
						this.drawMovement(item.boxX, item.boxY, item.moveSpeed);
					}


				}, this);
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

	drawMovement:function(x,y,speed){
		console.log("Drawing Movment");
		var movementSprite = null;

		var  startX = x - speed;
		if(startX < 0){
			startX = 0;
		}
		var finishX = x + speed;

		console.log(startX * 40);
		console.log(finishX * 40);

		
		for(var i = startX; i <= finishX; i++) {
			movementSprite = game.add.sprite(i * 40, y * 40, 'walk_overlay');
			movementSprite.alpha = 0.50
			this.movementGroup.add(movementSprite);
		}

		//this.characterSprites.bringToTop();

		/*
		movementSprite = game.add.sprite(startX * 40 , y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 40 , y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 80, y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 120, y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 160, y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 200, y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75;
		movementSprite = game.add.sprite(startX * 40 + 240, y * 40, 'walk_overlay');
		movementSprite.alpha = 0.75; */


		/*for(var i = startX * 40; i <= finishX * 40; i + 40 ){
			console.log(i);
			//movementSprite = game.add.sprite(i, y * 40, 'walk_overlay');
			//this.activeMovementBox.add(movementSprite);
		}*/


	},
}