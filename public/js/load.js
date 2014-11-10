var loadState = {

	preload:function (){
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

		//Load our various assets here
		game.load.spritesheet('overmap_player','assets/eight_frame_test_char.png',20,20);
		game.load.spritesheet('wormhole', 'assets/wormhole_animation.png',40,40);	

		game.load.image('test_tile_map', 'assets/test_tile_map.png');
		game.load.tilemap('map', 'assets/walkabout_test_map.json', null, Phaser.Tilemap.TILED_JSON);


	},

	create:function(){
		game.state.start('menu');
	}

}