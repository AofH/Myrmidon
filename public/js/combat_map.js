combatMapLoadState = {
	preload:function(){
		//Add a loading label to the screen
		var loadingLabel = game.add.text(100, 150, 'Loading...',{
			font:"30px Arial",
			fill:"#ffffff"
		});
		loadingLabel.anchor.setTo(0.5,0.5);

		//Display the progress bar
		var progressBar = game.add.sprite(100, 200,'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);


		game.load.spritesheet('combat_player', 'assets/eight_frame_test_char.png',20,20);
		game.load.spritesheet('walking_rouge', 'assets/walking_rouge.png', 32, 32);
		game.load.spritesheet('big_walking_rouge', 'assets/40x40_walking_rouge.png',40,40);

		game.load.image('griddedTilemap', 'assets/test_grid_tilemap.png');
		game.load.tilemap('combatmap', 'assets/small_walkabout_grid.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create:function(){
		game.state.start('combatMapPlayState');
	},


}

combatMapPlayState = {
	create:function(){
		this.createWorld();
		this.setupPlayer();
		
		this.camera.follow(this.player);

		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT]);
		this.combatPlayer = new CombatPlayer(this.game, this.player, this.cursor);
		console.log(this.combatPlayer);
		


	},

	update:function(){
		game.physics.arcade.collide(this.player, this.layer);
		this.combatPlayer.move();
	},

	render:function(){
		

	},

	createWorld:function(){
		this.map = game.add.tilemap('combatmap');
		this.map.addTilesetImage('griddedTilemap');
		this.map.setCollision(2);
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		//this.layer.debug = true;
	},

	setupPlayer:function(){
		//this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'combat_player');

		this.player = game.add.sprite(9*40, 9*40, 'big_walking_rouge');
		//this.player.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(this.player);

		this.player.animations.add('idle', [0,1], 2, true);
		this.player.animations.play('idle');
	},


}