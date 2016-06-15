/**
 * Created by majestin on 2016. 5. 16..
 */
BasicGame = {};

BasicGame.Boot = function (game) {
    ;
};

BasicGame.Boot.prototype = {

    preload: function () {

        // 배경 이미지와 로딩 프로그레스바 이미지 preloader
        this.load.image('preloaderBackground', 'assets/preloader_bg.png');
        this.load.image('preloaderBar', 'assets/preloader_bar.png');

    },

    create: function () {

        // 터치 포인터 최대 수 설정
        this.game.input.maxPointers = 1;

        // 자동 일시정지 활성화
        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            // 데스크탑 - 여백 기준 설정
            this.game.stage.scale.pageAlignHorizontally = true;
        }
        else
        {

            // 모바일 - 초기화 설정 16:9
            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.game.physics.arcade.enableBody(this);

            this.game.stage.scale.minWidth = 450;
            this.game.stage.scale.minHeight = 800;
            this.game.stage.scale.maxWidth = 750;
            this.game.stage.scale.maxHeight = 1334;
            this.game.stage.scale.forceLandscape = true;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.setScreenSize(true);

        }

        // 프리로더 시작
        this.game.state.start('Preloader');

    }

};
