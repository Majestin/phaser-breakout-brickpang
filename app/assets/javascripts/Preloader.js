/**
 * Created by majestin on 2016. 5. 16..
 */
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

        // Boot.js에서 로딩한 이미지 설정
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);



		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
        /*
		this.load.image('titlepage', 'images/title.jpg');
		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        */
        this.load.image('bg', 'assets/bg_prerendered.png');
        this.load.image('logo', 'assets/preloader_progressbar.png');
        //this.load.script('webfont', '/assets/kenvector_future.ttf');

        this.load.atlas('tiles', 'assets/breakout.png', 'assets/breakout.json');

        this.load.audio('brickDeath', ['assets/brickDeath.mp3', 'assets/brickDeath.ogg', 'assets/brickDeath.wav']);
        this.load.audio('countdownBlip', ['assets/countdownBlip.mp3', 'assets/countdownBlip.ogg', 'assets/countdownBlip.wav']);
        this.load.audio('powerdown', ['assets/powerdown.mp3', 'assets/powerdown.ogg', 'assets/powerdown.wav']);
        this.load.audio('powerup', ['assets/powerup.mp3', 'assets/powerup.ogg', 'assets/powerup.wav']);
        this.load.audio('recover', ['assets/recover.mp3', 'assets/recover.ogg', 'assets/recover.wav']);

		//	+ lots of other required assets here

        var arPreventedKeys = [
            Phaser.Keyboard.SPACEBAR,
            , Phaser.Keyboard.UP
            , Phaser.Keyboard.DOWN
            , Phaser.Keyboard.LEFT
            , Phaser.Keyboard.RIGHT
        ];
        this.input.keyboard.addKeyCapture(arPreventedKeys);

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

        this.game.state.start('MainMenu');

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		/*
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}
		*/

	}

};
