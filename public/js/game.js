var game = new Phaser.Game(640,480, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('mapOneLoad', mapOneLoadState);
game.state.add('mapOne', mapOneState);

game.state.add('combatMapLoadState', combatMapLoadState);
game.state.add('combatMapPlayState', combatMapPlayState);

game.state.start('boot');