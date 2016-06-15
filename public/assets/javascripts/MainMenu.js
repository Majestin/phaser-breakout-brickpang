
BasicGame.MainMenu = function (game) {

	this.music = null;
    this.logo = null;
	this.playButton = null;
    this.gameMessageTextGameStart = null;
    this.gameMessageTextSetting = null;
    this.playButtonText = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
        //this.game.stage.backgroundColor = '#697e96';

        // 450 * 800

        this.game.add.sprite(0, 0, 'bg');

        //로고 추가
        this.logo = this.add.sprite(this.game.world.centerX, 300, 'logo');
        //this.logo = this.add.text(this.game.world.centerX, 300, 'BRICK PANG', { font: "200 50px kenvector_future", fill: "#FFCD03", align: "center" });

        //this.logo.width = 326;
        this.logo.anchor.setTo(0.5, 0.5);

        //add text
        //this.gameMessageTextGameStart = this.add.text(this.game.world.centerX, 550, 'GAME START', { font: "200 30px kenvector_future", fill: "#000000", align: "center" });
        //this.gameMessageTextGameStart.anchor.setTo(0.5, 0);

        //add text
        //this.gameMessageText = this.add.text(	this.game.world.centerX, 370, 'during the game use: L/R arrow', { font: "20px Arial", fill: "#000000", align: "center" });
        //this.gameMessageText.anchor.setTo(0.5, 0);

        //add text
        //this.settingButton = this.add.button(this.game.width / 2 - 95, 620, 'playButton',this.setting, this);
        //this.gameMessageTextSetting = this.add.text(35, 5, 'SETTING', { font: "400 30px kenvector_future", fill: "#000000", align: "center" });
        //console.log(this.gameMessageTextSetting);

        //this.gameMessageTextSetting.anchor.setTo(0.5, 0);
        //this.settingButton.addChild(this.gameMessageTextSetting);

        //add a click handler
        //this.game.input.onDown.add(this.click, this);

		this.playButton = this.add.button(this.game.width / 2 - 95, 550, 'playButton', this.startGame, this);
        this.playButtonText = this.game.add.text(10, 5, "GAME START", {font: "400 30px kenvector_future", fill: "#000000"});

        this.playButton.addChild(this.playButtonText);
	},

	update: function () {

	},

	startGame: function (pointer) {

		//this.music.stop();

		//	And start the actual game
		this.game.state.start('Game');

	} ,
    Setting: function (pointer) {

        //this.music.stop();

        this.game.state.start('Game');

    } ,

    click: function(x, y, timedown) {
        console.log("CLICK IS MADE");
        // Game Start 버튼 클릭 시 게임 시작
        this.game.state.start('Game');
    }

};
