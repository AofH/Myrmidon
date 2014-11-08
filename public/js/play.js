var playState = {
	create:function(){
		//Add keyboard controls
		this.cursor = game.input.keyboard.createCursorKeys();

		//Setup player for overmap walking
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'overmap_player');
		this.player.anchor.setTo(0.5,0.5);

		//this.player.animations.add('down',[0], 8, true);
		//this.player.animations.add('right',[1], 8, true);
		//this.player.animations.add('up',[2],8, true);
		//this.player.animations.add('left',[3],8, true);

		this.createWorld();

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
											Phaser.Keyboard.DOWN,
											Phaser.Keyboard.LEFT,
											Phaser.Keyboard.RIGHT]);
	},

	update:function(){
		this.movePlayer();
	},

	createWorld:function(){
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.map.setCollision(1);
	},

	movePlayer:function(){
		//if the left arrow is pressed
		if(this.cursor.left.isDown){
			//Move the player to the left
			this.player.body.velocity.x = -200;
			this.player.frame = 3;
		} else if (this.cursor.right.isDown ){
			this.player.body.velocity.x = 200;
			this.player.frame = 1;
		} else if (this.cursor.up.isDown){
			this.player.body.velocity.y = 200;
			this.player.frame = 2;
		} else if (this.cursor.down.isDown){
			this.player.body.velocity.y = -200;
			this.player.frame = 0;
		} else {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0
		}

		
	},
}