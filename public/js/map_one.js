mapOneLoadState = {
	preload:function(){
		//Add a loading label to the screen
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading...',{
			font:"30px Arial",
			fill:"#ffffff"
		});
		loadingLabel.anchor.setTo(0.5,0.5);

		//Display the progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200,'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);


		//game.load.spritesheet('sidescroll_player', 'assets/monster_character.png',20,20);
		game.load.spritesheet('sidescroll_player', 'assets/big_monster_char.png',40,40);

		game.load.image('map_one_tilemap','assets/map_one_tilemap.png');
		game.load.tilemap('map_one', 'assets/map_one.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create:function(){
		game.state.start('mapOne');
	}
}

mapOneState = {
	create:function(){
		this.createWorld();

		this.sidescrollPlayer = game.add.sprite(80,600,'sidescroll_player');
		this.sidescrollPlayer.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.sidescrollPlayer);
		this.sidescrollPlayer.animations.add('right',[1,2],8,true);
		this.sidescrollPlayer.animations.add('left',[3,4],8,true);
		this.sidescrollPlayer.body.gravity.y = 500;


		this.camera.follow(this.sidescrollPlayer);

		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT]);

	},

	update:function(){
		game.physics.arcade.collide(this.sidescrollPlayer, this.mapOneLayer);


		this.movePlayer();

	},

	render:function(){
		game.debug.spriteCoords(this.sidescrollPlayer, 32, 32);
		//game.debug.spriteBounds(this.sidescrollPlayer);
	},

	createWorld:function(){
		this.mapOne = game.add.tilemap('map_one');
		this.mapOne.addTilesetImage('map_one_tilemap');
		this.mapOne.setCollision(2);
		this.mapOneLayer = this.mapOne.createLayer('Tile Layer 1');
		this.mapOneLayer.resizeWorld();
	},

	movePlayer:function(){
		//if the left arrow is pressed
		

		if(this.cursor.left.isDown){
			//Move the player to the left
			this.sidescrollPlayer.body.velocity.x = -200;
			this.sidescrollPlayer.animations.play('left');
		} else if (this.cursor.right.isDown){
			this.sidescrollPlayer.body.velocity.x = 200;
			this.sidescrollPlayer.animations.play('right');
		} else {
			this.sidescrollPlayer.body.velocity.x = 0;
			this.sidescrollPlayer.animations.stop();
			this.sidescrollPlayer.frame = 0;
		}

		if(this.cursor.up.isDown && this.sidescrollPlayer.body.onFloor()){
			this.sidescrollPlayer.body.velocity.y = -320;
		}
	}
}