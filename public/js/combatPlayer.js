var CombatPlayer = function(game, player, cursor){
	this.game = game;
	this.player = player;
	this.cursor = cursor;

	this.movingPlayer = false;
};

CombatPlayer.prototype = {
	move:function(){


		if(this.movingPlayer){

			//console.log("NextX: "+ this.nextX);
			//console.log("NextY: "+ this.nextY);

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
				//this.currentPosition = this.player.position.y;
				this.nextY = this.player.position.y + 40;
				//console.log("Player Position y: "+this.player.position.y);
				this.movingPlayer = true;
				this.moveDirection = "down";
				this.player.body.velocity.y = 100;
			} else if (this.cursor.up.isDown){
				this.nextY = this.player.position.y - 40;
				//console.log("Player Position y: "+this.player.position.y);
				this.movingPlayer = true;
				this.moveDirection = "up";
				this.player.body.velocity.y = -100;
			} else if(this.cursor.right.isDown){
				this.nextX = this.player.position.x + 40;
				this.movingPlayer = true;
				this.moveDirection = "right";
				this.player.body.velocity.x = 100;
			} else if (this.cursor.left.isDown){
				this.nextX = this.player.position.x - 40;
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

	centerPlayer:function(x,y){

		var newX = this.getClosestMultipleOfSpriteSize(x,40);
		var newY = this.getClosestMultipleOfSpriteSize(y,40);

		this.player.position.x = newX;
		this.player.position.y = newY;
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
	}
}