CameraControl = function(game, cursor){
	this.game = game;
	this.cursor = cursor;


}

CameraControl.prototype = {
	move:function(){


		if(this.cursor.down.isDown){
			this.game.camera.y += 4;
		} else if(this.cursor.up.isDown){
			this.game.camera.y -= 4;
		}

		if(this.cursor.right.isDown){
			this.game.camera.x += 4;
		} else if(this.cursor.left.isDown){
			this.game.camera.x -= 4;
		}


	}
}