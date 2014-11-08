var bootState = {
	preload:function(){
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create:function(){
		game.stage.backgroundColor = '#681A1F';

		game.state.start('load');
	},
}