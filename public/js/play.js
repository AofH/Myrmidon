var playState = {
	create:function(){
	

		this.createWorld();

		//Setup player for overmap walking
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'overmap_player');
		this.player.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.player);



		this.camera.follow(this.player);


			//Add keyboard controls
		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT]);
	},

	update:function(){
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.overlap(this.player, this.teleporters, this.teleportToLevel, null, this);
		
		this.movePlayer();
	},


    render:function() {

	    //game.debug.cameraInfo(game.camera, 32, 32);
	    //game.debug.spriteCoords(this.player, 32, 100);
	    //game.debug.spriteBounds(this.player);
	    //game.debug.physicsBody(card.body);

	},

	createWorld:function(){
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('test_tile_map');
		this.map.setCollision(2);
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();

		this.teleporters = this.add.group();
		this.teleporters.enableBody = true;
		this.map.createFromObjects('Object Layer 1', 3, 'wormhole', 0, true, false, this.teleporters);

		this.teleporters.callAll('animations.add', 'animations', 'spin', [0, 1, 2], 10, true);
		this.teleporters.callAll('animations.play', 'animations', 'spin');
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

	teleportToLevel:function(player, teleporter){
		console.log(teleporter.name);
		if(teleporter.name === 'transporter1') {
			game.state.start('mapOneLoad');
		}
	},
}