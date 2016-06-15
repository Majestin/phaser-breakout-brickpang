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

        //this.load.image('mountains-back', 'assets/mountains-back.png');
        //this.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        //this.load.image('mountains-mid2', 'assets/mountains-mid2.png');


        this.load.setPreloadSprite(this.preloadBar);


        /*
		this.load.image('titlepage', 'images/title.jpg');
		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        */
        this.load.image('bg', 'assets/images/colored_land.png');
        this.load.image('logo', 'assets/images/logo_title.png');

        //this.load.image('paddle', 'assets/paddleBlu.png');

        this.load.image('playButton', 'assets/images/buttonDefault.png');
        this.load.image('buttonOver', 'assets/images/buttonSelected.png');


        this.load.image('element_1_rectangle', 'assets/images/element_blue_rectangle.png');
        this.load.image('element_2_rectangle', 'assets/images/element_red_rectangle.png');
        this.load.image('element_3_rectangle', 'assets/images/element_grey_rectangle.png');
        this.load.image('element_4_rectangle', 'assets/images/element_green_rectangle.png');

        this.load.image('element_1_rectangle_glossy', 'assets/images/element_blue_rectangle_glossy.png');
        this.load.image('element_2_rectangle_glossy', 'assets/images/element_red_rectangle_glossy.png');
        this.load.image('element_3_rectangle_glossy', 'assets/images/element_grey_rectangle_glossy.png');
        this.load.image('element_4_rectangle_glossy', 'assets/images/element_green_rectangle_glossy.png');


        //this.load.image('fevertime_bar', 'assets/timer.png');
        this.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);
        this.load.image('timer_bg', 'assets/images/timer_bg.png');
        this.load.image('timer_gauge', 'assets/images/timer_gauge.png');

        //this.load.script('webfont', '/assets/images/kenvector_future.ttf');

        this.load.atlas('tiles', 'assets/images/breakout_new.png', 'assets/images/breakout_new.json');
        this.load.atlas('tiles_old', 'assets/images/breakout.png', 'assets/images/breakout.json');

        this.load.audio('brickDeath', ['assets/sfx/brickDeath.mp3', 'assets/sfx/brickDeath.ogg', 'assets/sfx/brickDeath.wav']);
        this.load.audio('countdownBlip', ['assets/sfx/countdownBlip.mp3', 'assets/sfx/countdownBlip.ogg', 'assets/sfx/countdownBlip.wav']);
        this.load.audio('powerdown', ['assets/sfx/powerdown.mp3', 'assets/sfx/powerdown.ogg', 'assets/sfx/powerdown.wav']);
        this.load.audio('powerup', ['assets/sfx/powerup.mp3', 'assets/sfx/powerup.ogg', 'assets/sfx/powerup.wav']);
        this.load.audio('recover', ['assets/sfx/recover.mp3', 'assets/sfx/recover.ogg', 'assets/sfx/recover.wav']);
        this.load.audio('fevertime_sound', ['assets/sfx/fevertime_sound.mp3', 'assets/sfx/fevertime_sound.ogg', 'assets/sfx/fevertime_sound.wav']);

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
