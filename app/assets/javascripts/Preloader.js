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
        //this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

        this.load.image('mountains-back', 'assets/mountains-back.png');
        this.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        this.load.image('mountains-mid2', 'assets/mountains-mid2.png');


        this.load.setPreloadSprite(this.preloadBar);


        /*
		this.load.image('titlepage', 'images/title.jpg');
		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        */
        this.load.image('bg', 'assets/colored_land.png');
        this.load.image('logo', 'assets/logo_title.png');

        //this.load.image('paddle', 'assets/paddleBlu.png');

        this.load.image('playButton', 'assets/buttonDefault.png');
        this.load.image('buttonOver', 'assets/buttonSelected.png');


        this.load.image('element_1_rectangle', 'assets/element_blue_rectangle.png');
        this.load.image('element_2_rectangle', 'assets/element_red_rectangle.png');
        this.load.image('element_3_rectangle', 'assets/element_grey_rectangle.png');
        this.load.image('element_4_rectangle', 'assets/element_green_rectangle.png');

        this.load.image('element_1_rectangle_glossy', 'assets/element_blue_rectangle_glossy.png');
        this.load.image('element_2_rectangle_glossy', 'assets/element_red_rectangle_glossy.png');
        this.load.image('element_3_rectangle_glossy', 'assets/element_grey_rectangle_glossy.png');
        this.load.image('element_4_rectangle_glossy', 'assets/element_green_rectangle_glossy.png');


        //this.load.image('fevertime_bar', 'assets/timer.png');
        this.load.spritesheet('timer', 'assets/timer.png', 150, 20);
        this.load.image('timer_bg', 'assets/timer_bg.png');
        this.load.image('timer_gauge', 'assets/timer_gauge.png');

        //this.load.script('webfont', '/assets/kenvector_future.ttf');

        this.load.atlas('tiles', 'assets/breakout_new.png', 'assets/breakout_new.json');
        this.load.atlas('tiles_old', 'assets/breakout.png', 'assets/breakout.json');

        this.load.audio('brickDeath', ['assets/brickDeath.mp3', 'assets/brickDeath.ogg', 'assets/brickDeath.wav']);
        this.load.audio('countdownBlip', ['assets/countdownBlip.mp3', 'assets/countdownBlip.ogg', 'assets/countdownBlip.wav']);
        this.load.audio('powerdown', ['assets/powerdown.mp3', 'assets/powerdown.ogg', 'assets/powerdown.wav']);
        this.load.audio('powerup', ['assets/powerup.mp3', 'assets/powerup.ogg', 'assets/powerup.wav']);
        this.load.audio('recover', ['assets/recover.mp3', 'assets/recover.ogg', 'assets/recover.wav']);
        this.load.audio('fevertime_sound', ['assets/fevertime_sound.mp3', 'assets/fevertime_sound.ogg', 'assets/fevertime_sound.wav']);

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

		this.preloadBar.cropEnabled = false;

        this.game.state.start('MainMenu');

	},

	update: function () {
		/*
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}
		*/

	}

};
