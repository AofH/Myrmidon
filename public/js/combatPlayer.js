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
		if(this.player.body.position.y < this.previousY) {
			this.nextY = this.previousY;
			this.player.body.velocity.y = 100;
		} else if(this.player.body.position.y > this.previousY){
			this.nextY = this.previousY;
			this.player.body.velocity.y = -100;
		} else if (this.player.body.position.x < this.previousX){
			this.nextX = this.previousX;
			this.player.body.velocity.x = 100;
		} else if (this.player.body.position.x > this.previousX){
			this.nextX = this.previousX;
			this.player.body.velocity.x = -100;
		}
	},

	centerPlayer:function(x,y){

		this.player.position.x = this.getClosestMultipleOfSpriteSize(x,this.player.body.height);;
		this.player.position.y = this.getClosestMultipleOfSpriteSize(y,this.player.body.width);;
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