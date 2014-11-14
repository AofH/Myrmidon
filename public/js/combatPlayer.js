var CombatPlayer = function(game, player, cursor){
	this.game = game;
	this.player = player;
	this.cursor = cursor;

	this.movingPlayer = false;
};

CombatPlayer.prototype = {
	move:function(){


		if(this.movingPlayer){

			if(this.moveDirection === 'down') {
				if(this.player.position.y >= this.nextY){
					this.stopMoving();
					this.centerPlayer(this.player.position.x, this.nextY);
					this.nextY = 0;
				}
			} else if (this.moveDirection === 'up'){
				if(this.player.position.y <= this.nextY){
					this.stopMoving();
					this.centerPlayer(this.player.position.x, this.nextY);
					this.nextY = 0;
				}
			} else if (this.moveDirection === 'right'){
				if(this.player.position.x >= this.nextX){
					this.stopMoving();
					this.centerPlayer(this.nextX, this.player.position.y);
					this.nextX = 0;
				}
			} else if (this.moveDirection === 'left'){
				if(this.player.position.x <= this.nextX){
					this.stopMoving();
					this.centerPlayer(this.nextX, this.player.position.y);
					this.nextX = 0;
				}
			}
		} else {
			if(this.cursor.down.isDown){
				this.nextY = this.player.position.y + 40;
				this.previousY = this.player.position.y;
				this.movingPlayer = true;
				this.moveDirection = "down";
				this.player.body.velocity.y = 100;
			} else if (this.cursor.up.isDown){
				this.nextY = this.player.position.y - 40;
				this.previousY = this.player.position.y;
				this.movingPlayer = true;
				this.moveDirection = "up";
				this.player.body.velocity.y = -100;
			} else if(this.cursor.right.isDown){
				this.nextX = this.player.position.x + 40;
				this.previousX = this.player.position.x;
				this.movingPlayer = true;
				this.moveDirection = "right";
				this.player.body.velocity.x = 100;
			} else if (this.cursor.left.isDown){
				this.nextX = this.player.position.x - 40;
				this.previousX = this.player.position.x;
				this.movingPlayer = true;
				this.moveDirection = "left";
				this.player.body.velocity.x = -100;
			}
		}
	},

	stopMoving:function(){
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		this.movingPlayer = false;
	},

	moveToPreviousPosition:function(){
		this.movingPlayer = true;

		console.log("nextX: "+ this.nextX + " previousX: "+this.previousX);
		console.log("nextY: "+ this.nextY + " previousY: "+this.previousY);
		console.log("X: " +this.player.body.position.x + " Y: "+this.player.body.position.y);

		if(this.player.body.position.y < this.previousY) {
			this.nextY = this.previousY;
			this.player.body.velocity.y = 100;
		} else if(this.player.body.position.y > this.previousY){
			this.nextY = this.previousY;
			this.player.body.velocity.y = -100;
		} else if(this.player.body.position.y === this.previousY){ // if the y value is the same don't move 
			this.movingPlayer = false;
		} else if (this.player.body.position.x < this.previousX){
			this.nextX = this.previousX;
			this.player.body.velocity.x = 100;
		} else if (this.player.body.position.x > this.previousX){
			this.nextX = this.previousX;
			this.player.body.velocity.x = -100;
		} else if (this.player.body.position.x === this.previousX){ // if the x value is the same don't move 
			this.movingPlayer = false;
		}
	},

	centerPlayer:function(x,y){
		console.log("x: " +x+ " height: "+this.player.body.height);
		console.log("x: " +y+ " height: "+this.player.body.width);
		this.player.position.x = this.getClosestMultipleOfSpriteSize(x,40) + 4; // 40 is the tile size and 4 is the offset for 32x32 tiles
		this.player.position.y = this.getClosestMultipleOfSpriteSize(y,40) + 4;
		console.log("rounded x: " + this.player.position.x);
		console.log("rounded y: " + this.player.position.y);
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