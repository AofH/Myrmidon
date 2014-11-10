var CombatPlayer = function(game, player, cursor){
	this.game = game;
	this.player = player;	
	this.cursor = cursor;
};

CombatPlayer.prototype = {
	move:function(){
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
	
		if(this.cursor.down.isDown && this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.body.velocity.y = 200;
			this.player.frame = 1;
		} else if (this.cursor.down.isDown && this.cursor.left.isDown){
			this.player.body.velocity.x = -200;
			this.player.body.velocity.y = 200;
			this.player.frame = 7;
		} else if (this.cursor.up.isDown && this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.body.velocity.y = -200;
			this.player.frame = 3;
		} else if (this.cursor.up.isDown && this.cursor.left.isDown){
			this.player.body.velocity.x = -200;
			this.player.body.velocity.y = -200;
			this.player.frame = 5;
		} else if(this.cursor.left.isDown){
			//Move the player to the left
			this.player.body.velocity.x = -200;
			this.player.frame = 6;
		} else if (this.cursor.right.isDown ){ //Move Right
			this.player.body.velocity.x = 200;
			this.player.frame = 2;
		} else if (this.cursor.up.isDown){ // Move Up
			this.player.body.velocity.y = -200;
			this.player.frame = 4;
		} else if (this.cursor.down.isDown){ // Move Down
			this.player.body.velocity.y = 200;
			this.player.frame = 0;
		}
	}
}