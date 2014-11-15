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
		game.load.spritesheet('walk_overlay', 'assets/walk_overlay.png',40,40);
		game.load.spritesheet('selection_square', 'assets/selection_square.png', 40, 40);
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
		this.setupSelectionBox();

		this.activeCharacters = this.game.add.group();
		this.activeCharacters.enableBody = true;
		this.activeCharacters.physicsBodyType = Phaser.Physics.ARCADE;

		this.setupUnits();
		
		//this.camera.follow(this.player);

		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT,
											Phaser.Keyboard.CONTROL]);
		this.selectionBox = new SelectionBox(this.game, this.selectionSquare, this.cursor, this.activeCharacters);
	},

	update:function(){
		game.physics.arcade.collide(this.player, this.layer);
		this.selectionBox.move();
	},

	render:function(){
		game.debug.spriteCoords(this.selectionSquare, 32, 32);

	},

	createWorld:function(){
		this.map = game.add.tilemap('combatmap');
		this.map.addTilesetImage('griddedTilemap');
		this.map.setCollision(2);
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();

		this.map.setTileIndexCallback(2,this.hitWall, this);
		//this.layer.debug = true;
	},

	setupUnits:function(){
		var unit = new Unit(this.game, 9, 9, 'walking_rouge');
		this.activeCharacters.add(unit);

		this.activeCharacters.callAll('animations.add', 'animations', 'idle', [0,1],2 , true);
		this.activeCharacters.callAll('animations.play', 'animations', 'idle');	
	},

	setupSelectionBox:function(){
		this.selectionSquare = game.add.sprite(40,40, 'selection_square');
		this.camera.follow(this.selectionSquare);
		game.physics.arcade.enable(this.selectionSquare);
	},

	hitWall:function(sprite, tile){
		this.combatPlayer.stopMoving();
		console.log(sprite);
		this.combatPlayer.moveToPreviousPosition();
		console.log("HIT WALL");
		return false;
	},

	characterClicked:function(sprite, pointer){
		this.camera.follow(this.sprite);
		console.log("Character Clicked");
	},
}