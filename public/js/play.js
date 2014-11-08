var playState = {
	create:function(){
		//Add keyboard controls
		this.cursor = game.input.keyboard.createCursorKeys();

		this.createWorld();

		//Setup player for overmap walking
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'overmap_player');
		this.player.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.player);

		this.camera.follow(this.player);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT]);
	},

	update:function(){
		game.physics.arcade.collide(this.player, this.layer);
		this.movePlayer();

	},


    render:function() {

	    game.debug.cameraInfo(game.camera, 500, 32);
	    //game.debug.spriteCoords(this.player, 32, 32);
	    // game.debug.physicsBody(card.body);

	},

	createWorld:function(){

		//game.world.setBounds(0, 0, 1312, 1312);
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('test_tile_map');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		//this.map.setCollision(2);
	},

	movePlayer:function(){
		
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
	},
}