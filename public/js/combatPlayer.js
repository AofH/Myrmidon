var CombatPlayer = function(game, player, cursor){
	this.game = game;
	this.player = player;	
	this.cursor = cursor;

	this.movingPlayer = false;
};

CombatPlayer.prototype = {
	move:function(){

		console.log(this.nextY);
		console.log(this.player.position.y);

		if(this.movingPlayer){
			if (this.player.position.y === this.nextY || this.player.position.x === this.nextX) {
				this.player.body.velocity.y = 0;
				this.player.body.velocity.x = 0;
				this.nextY = 0;
				this.nextX = 0;
				this.movingPlayer = false;
			}
		} else {
			if(this.cursor.down.isDown){
				//this.currentPosition = this.player.position.y;
				this.nextY = this.player.position.y + 40;
				this.movingPlayer = true;
				this.player.body.velocity.y = 100;
			} else if (this.cursor.up.isDown){
				this.nextY = this.player.position.y - 40;
				this.movingPlayer = true;
				this.player.body.velocity.y = -100;
			} else if(this.cursor.right.isDown){
				this.nextX = this.player.position.x + 40;
				this.movingPlayer = true;
				this.player.body.velocity.x = 100;
			} else if (this.cursor.left.isDown){
				this.nextX = this.player.position.x - 40;
				this.movingPlayer = true;
				this.player.body.velocity.x = -100;
			}
		}


	/*
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
	
		if(this.cursor.down.isDown && this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.body.velocity.y = 200;
			//this.player.frame = 1;
		} else if (this.cursor.down.isDown && this.cursor.left.isDown){
			this.player.body.velocity.x = -200;
			this.player.body.velocity.y = 200;
			//this.player.frame = 7;
		} else if (this.cursor.up.isDown && this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.body.velocity.y = -200;
		//	this.player.frame = 3;
		} else if (this.cursor.up.isDown && this.cursor.left.isDown){
			this.player.body.velocity.x = -200;
			this.player.body.velocity.y = -200;
			//this.player.frame = 5;
		} else if(this.cursor.left.isDown){
			//Move the player to the left
			this.player.body.velocity.x = -200;
			//this.player.frame = 6;
		} else if (this.cursor.right.isDown ){ //Move Right
			this.player.body.velocity.x = 200;
			//this.player.frame = 2;
		} else if (this.cursor.up.isDown){ // Move Up
			this.player.body.velocity.y = -200;
			//this.player.frame = 4;
		} else if (this.cursor.down.isDown){ // Move Down
			this.player.body.velocity.y = 200;
			//this.player.frame = 0;
		}*/
	}
}