BasicGame.Game = function (game) {


    this.game;
    this.add;
    this.camera;
    this.cache;
    this.input;
    this.load;
    this.math;
    this.sound;
    this.stage;
    this.time;
    this.tweens;
    this.world;
    this.particles;
    this.physics;
    this.rnd;

    this.debug = false;

    this.brickDeath = null;
    this.countdownBlip = null;
    this.powerdown = null;
    this.powerup = null;
    this.recover = null;
    this.fevertimesound = null;

    this.countDown;
    this.countDownTime = 3;
    this.countDownTimeElapsed = 0;
    this.countDownInitialX = 215;
    this.countDownInitialY = 300;
    this.isCountDownOff = false;
    this.countDownTimeInterval = 1000;

    this.countDownsecondTick = 1;

    this.paddle;
    this.paddleDefaultWidth = 48;
    this.paddleSmallWidth = 32;

    this.paddleSpeed = 200;

    this.paddleInitialX = 0;
    this.paddleInitialY = 700;

    this.dropItemCount = 3;
    this.dropItemLimit = 5;
    this.isPaddleBuffed = false;
    this.isPaddleNerfed = false;
    //TODO paddleNerfTime 변경해야함
    this.paddleNerfTime = 2000;
    this.recoverTimeout = null;

    this.balls;
    this.ballsCount = 0;
    this.bricks;
    this.items;
    this.bricksWithItems = [];

    this.scorePerBrick = 100;
    this.scorePerLevel = 1000;

    //0 is 1 becasue levels are in array
    this.currentLevel = 0;

    //TODO ballSpeed 변경
    this.ballSpeed = 800;
    this.ballMaxVel = 300;

    this.ballInitialX = 235;
    this.ballInitialY = 300

    this.initialDirection = 1;

    this.wallWidth = 16;

    this.mouseControl = true;

    this.lives = 3;
    this.score = 0;

    this.scoreText;
    this.livesText;
    this.levelText;
    this.gameMessageText;

    this.aKey;
    this.dKey;
    this.leftKey;
    this.rightKey;

    this.vKey;
    this.sKey;
    this.bKey;

    this.breakoutLevels;

    this.shakeEffect = true;


    this.fevertime_bar_gauge;
    this.fevertime_bar_bg;

    // TODO Fever time change
    this.feverscore_max = 500;
    this.feverscore = 0;

    this.fevertime = 7000;
    this.isfevertime = false;
    this.feverTimeout = null;

};

BasicGame.Game.prototype = {

    create: function () {

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.initGameVars();

        this.loadLevels();

        this.createSoundsAndMusic();

        this.game.add.sprite(0, 0, 'bg');

        //reset some game vars
        this.ballsCount = 0;
        this.lives = 3;
        this.score = 0;
        this.countDownTime = 1;
        this.countDownTimeElapsed = 0;

        this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //remove the camera bounds so we can shake it later ;)
        this.game.camera.bounds = null;


        //Fever Time Bar Initializing
        this.fevertime_bar_bg = this.game.add.sprite(this.game.width - 50, this.game.height - 400, 'timer_bg');
        this.fevertime_bar_gauge = this.game.add.sprite(this.game.width - 50, this.game.height - 250, 'timer_gauge');
        this.fevertime_bar_gauge.height = 0;
        this.feverscore = 0;
        this.isfevertime = false;

        this.createPaddle();

        //Bricks
        this.bricks = this.game.add.group();

        //Brick drops buff/nerf items
        this.items = this.game.add.group();

        this.createHUD();

        this.populateLevel(0);

        this.balls = this.game.add.group();
        this.createBall();

        this.createCounter();

        //add a click event listener
        this.game.input.onDown.add(this.click, this);

        //other keys
        this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.vKey.onDown.add(this.createBall, this);
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.sKey.onDown.add(this.toggleshakeEffect, this);
        this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.bKey.onDown.add(this.toggleMouseKeyboardControls, this);

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.leftKey.onDown.add(this.prevLevel, this);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.rightKey.onDown.add(this.nextLevel, this);

        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        //this.fevertime_bar = this.game.add.sprite(this.game.width - 50, 200, 'timer');
        //this.fevertime_bar.rotation = .90;
        //fevertime_bar.width = 10;
        //this.fevertime_bar = new Phaser.Rectangle(100, 100, 40, 200);
        //this.rect.width = 10;
        //this.fevertime_bar.crop(this.rect);


    },

    update: function () {

        this.paddleUpdate();

        this.countDownUpdate();

        this.bricksUpdate();

        if (this.isCountDownOff) {
            //if(this.balls.countLiving() > 0) {
            this.balls.forEachAlive(this.ballUpdate, this);
            //}
        }

        this.game.physics.arcade.collide(this.balls, this.balls, this.ballHitBallHandler, this.ballHitBallProcess, this);

        this.game.physics.arcade.collide(this.balls, this.bricks, this.ballHitBrickHandler, this.ballHitBricklProcess, this);

        this.game.physics.arcade.collide(this.paddle, this.balls, this.paddleHitBallHandler, this.paddleHitBallProcess, this);

        this.game.physics.arcade.collide(this.paddle, this.items, this.paddleHitItemHandler, this.paddleHitItemProcess, this);

        this.game.onRenderCallback = this.render;
    },

    render: function () {

        if (this.debug) {

            //this.game.debug.renderInputInfo(20, 20);

            //this.game.debug.renderSpriteInfo(this.paddle, 20, 240);
            //this.game.debug.renderSpriteBounds(paddle);
            //this.game.debug.renderSpriteInfo(tempBall);
            //this.game.debug.renderSpriteBounds(tempBall);

            //this.game.debug.renderSpriteBody(this.paddle);
            //this.game.debug.renderSpriteBody(tempBall);

            var debugBallRender = function (ball) {
                //this.game.debug.renderSpriteInfo(ball, 20, 100);
                //this.game.debug.renderSpriteBounds(ball);
                //this.game.debug.renderSpriteBody(ball);
            }
            this.balls.forEach(debugBallRender, this);

        }
    },

    loadLevels: function () {

        this.currentLevel = 0;

        var r = 'red';
        var b = 'blue';
        var o = 'grey';
        var g = 'green';
        var X = null;

        this.breakoutLevels = [
            /*{
             name: "debug level",
             bricks: [
             [b, g, o, g, o, g, b, b, b],
             [b, b, b, b, b, b, b, b, b],
             [g, b, r, b, r, b, g, b, b],
             [g, b, b, b, b, b, g, b, b]
             ],
             powerUps: 1,
             powerDowns: 1
             },*/

            {
                name: "game stage 1",
                bricks: [
                    [X, X, X, X, X, X, X],
                    [X, X, r, r, r, X, X],
                    [X, b, b, b, b, b, X],
                    [X, b, g, g, g, b, X],
                    [X, b, g, g, g, b, X]
                ],
                powerUps: 1,
                powerDowns: 1
            },
            {
                name: "game stage 2",
                bricks: [
                    [X, g, g, X, g, g, X],
                    [g, g, g, g, g, g, g],
                    [g, g, g, g, g, g, g],
                    [X, g, g, g, g, g, X],
                    [X, X, g, g, g, X, X],
                    [X, X, X, g, X, X, X]
                ],
                powerUps: 1,
                powerDowns: 1
            },
            {
                name: "game stage 3",
                bricks: [
                    [X, g, o, g, o, g, X],
                    [X, b, b, b, b, b, X],
                    [g, b, r, b, r, b, g],
                    [g, b, b, b, b, b, g],
                    [g, b, X, X, X, b, g],
                    [X, b, b, b, b, b, X]
                ],
                powerUps: 1,
                powerDowns: 1
            },
            {
                name: "game stage 4",
                bricks: [
                    [g, X, X, g, X, X, g],
                    [X, r, r, b, r, r, X],
                    [g, b, X, X, X, b, g],
                    [g, b, X, X, X, b, g],
                    [g, b, X, X, X, b, g],
                    [r, b, b, b, b, b, r]
                ],
                powerUps: 1,
                powerDowns: 1
            },
            {
                name: "game stage 5",
                bricks: [
                    [X, g, o, g, o, g, X],
                    [X, b, b, b, b, b, X],
                    [g, b, r, b, r, b, g],
                    [g, b, b, b, b, b, g],
                    [g, b, X, X, X, b, g],
                    [X, b, b, b, b, b, X]
                ],
                powerUps: 1,
                powerDowns: 1
            },
            {
                name: 'game stage 6',
                bricks: [
                    [X, b, X, g, X, b, X],
                    [b, X, b, o, b, X, b],
                    [b, g, b, o, b, g, b],
                    [b, X, b, o, b, X, b],
                    [X, b, X, X, X, b, X],
                    [r, X, r, X, r, X, r]
                ],
                powerUps: 2,
                powerDowns: 2
            },
            {
                name: 'swirl',
                bricks: [
                    [r, g, o, b, r, g, o],
                    [b, X, X, X, X, X, X],
                    [o, X, o, b, r, g, o],
                    [g, X, g, X, X, X, b],
                    [r, X, r, X, r, X, r],
                    [b, X, b, o, g, X, g],
                    [o, X, X, X, X, X, o],
                    [g, r, b, o, g, r, b]
                ],
                powerUps: 2,
                powerDowns: 3
            }
        ];

    },

    createSoundsAndMusic: function () {
        this.brickDeath = this.game.add.audio('brickDeath');
        this.countdownBlip = this.game.add.audio('countdownBlip');
        this.powerdown = this.game.add.audio('powerdown');
        this.powerup = this.game.add.audio('powerup');
        this.recover = this.game.add.audio('recover');
        this.fevertimesound = this.game.add.audio('fevertime_sound');
    },

    click: function (x, y, timedown) {
        //this.createBall(true);
        //this.shakeGame();
    },

    initGameVars: function () {

        this.lives = 3;
        this.score = 0;
        this.currentLevel = 0;

        this.initLevelVars();

    },

    initLevelVars: function () {

        this.countDownTime = 3;
        this.countDownTimeElapsed = 0;
        this.countDownsecondTick = 1;
        this.isCountDownOff = false;
        this.isPaddleBuffed = false;
        this.isPaddleNerfed = false;
        this.paddleNerfTime = 2000;
    },

    createHUD: function () {
        this.levelText = this.game.add.text(10, 10, 'LEVEL: ' + (this.currentLevel + 1), {
            font: "30px kenvector_future",
            fill: "#000000",
            align: "left"
        });
        this.scoreText = this.game.add.text(this.game.width / 2 - 80, 10, 'SCORE: ' + this.score, {
            font: "30px kenvector_future",
            fill: "#000000",
            align: "left"
        });
        this.livesText = this.game.add.text(this.game.width - 120, 10, 'LIVES: ' + this.lives, {
            font: "30px kenvector_future",
            fill: "#000000",
            align: "left"
        });

        this.gameMessageText = this.game.add.text(this.game.world.centerX, 400, '- click to start -', {
            font: "40px kenvector_future",
            fill: "#ffffff",
            align: "center"
        });
        this.gameMessageText.anchor.setTo(0.5, 0.5);
        this.gameMessageText.visible = false;
    },

    createCounter: function () {
        this.countDown = this.game.add.sprite(this.countDownInitialX, this.countDownInitialY, 'tiles_old', 'two.png');
        this.countDown.animations.add('counter_three', ['three.png'], 10, false, false);
        this.countDown.animations.add('counter_two', ['two.png'], 10, false, false);
        this.countDown.animations.add('counter_one', ['one.png'], 10, false, false);
        this.countDown.play("counter_three");
        this.countDown.name = "counter";
    },

    populateLevel: function (level) {

        //reset items
        this.items.callAll('kill');
        this.items = this.game.add.group();
        this.bricksWithItems = [];
        clearTimeout(this.recoverTimeout);

        //reset bricks
        this.bricks.callAll('kill');
        this.bricks = this.game.add.group();

        var Level = this.breakoutLevels[level];

        for (var y = 0; y < Level.bricks.length; ++y) {
            for (var x = 0; x < Level.bricks[y].length; ++x) {

                var color = Level.bricks[y][x];

                if (color) {

                    var tempBrick;

                    var bID = 1;
                    if (color == "red") {
                        bID = 2;
                    } else if (color == "blue") {
                        bID = 1;
                    } else if (color == "grey") {
                        bID = 3;
                    } else if (color == "green") {
                        bID = 5;
                    }
                    tempBrick = this.game.add.sprite(x * 64, y * 32 + 64, 'tiles', 'brick_' + bID + '_1.png');

                    tempBrick.animations.add('idle', ['brick_' + bID + '_1.png'], 10, false, false);
                    tempBrick.diedie = tempBrick.animations.add('brick_die', [
                        'brick_' + bID + '_1.png',
                        'brick_' + bID + '_2.png',
                        'brick_' + bID + '_1.png',
                        'brick_' + bID + '_2.png'
                    ], 10, false, false);
                    tempBrick.animations.add('brick_popin', [
                        'brick_' + bID + '_2.png',
                        'brick_' + bID + '_1.png',
                        'brick_' + bID + '_2.png',
                        'brick_' + bID + '_1.png'
                    ], 10, false, false);

                    var tempCount = 0;
                    if (this.bricks.countLiving() > 0) {
                        tempCount = this.bricks.countLiving();
                    }
                    tempBrick.name = 'brick' + (tempCount + 1);

                    //tempBrick.frameName = 'brick_' + bID + '_1.png';
                    this.physics.enable(tempBrick, Phaser.Physics.ARCADE);

                    tempBrick.body.bounce.setTo(1, 1);
                    tempBrick.body.immovable = true;

                    tempBrick.animations.play("brick_popin");

                    this.bricks.add(tempBrick);

                    this.brickCount = +1;
                }
            }
        }

        var dropItemLimit = this.dropItemLimit + this.currentLevel;
        var brickPartLimit = Math.floor(this.bricks.countLiving() / dropItemLimit);
        var brickStartLimit = 1;
        var brickEndLimit = brickPartLimit;

        for (var dropCount = 0; dropCount < dropItemLimit; dropCount++) {

            var randomBrick = this.getRandomInt(brickStartLimit, brickEndLimit);

            var randomBrickName = "brick" + randomBrick;
            this.bricksWithItems.push(randomBrickName);

            brickStartLimit = brickEndLimit + 1;
            brickEndLimit += brickPartLimit;

        }

    },

    createPaddle: function () {
        this.paddle = this.game.add.sprite(this.paddleInitialX, this.paddleInitialY, 'tiles', 'paddle_big.png');
        //this.paddle.width = 58;
        //this.paddle.height = 18;
        //this.paddle.scale = 0.5;
        this.paddle.name = "paddle";
        this.paddle.anchor.setTo(0.5, 0);
        this.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.body.immovable = true;
        this.paddle.body.customSeparateX = true;
        this.paddle.body.customSeparateY = true;
        this.paddle.body.collideWorldBounds = true;
    },

    createBall: function (active) {

        var tempBall;
        tempBall = this.game.add.sprite(this.ballInitialX, this.ballInitialY, 'tiles');
        var tempCount = 0;
        if (this.balls.countLiving() > 0) {
            tempCount = this.balls.countLiving();
        }
        tempBall.name = 'ball' + (tempCount);
        tempBall.animations.add('rotate', [
            'ball_0.png',
            'ball_1.png'
            //,
            //'ball_3.png',
            //'ball_4.png',
            //'ball_5.png'
        ], 10, false, false);

        tempBall.anchor.setTo(0.5, null);

        this.physics.enable(tempBall, Phaser.Physics.ARCADE);

        tempBall.body.bounce.setTo(1, 1);

        if (active) {
            this.setBallVelocity(tempBall);
        }

        this.ballsCount += 1;

        this.balls.add(tempBall);
    },

    resetBall: function (tempBall, active) {

        if (active) {
            this.setBallVelocity(tempBall);
        } else {
            tempBall.body.velocity.x = 0;
            tempBall.body.velocity.y = 0;
        }
        tempBall.revive();
        tempBall.body.x = this.ballInitialX;
        tempBall.body.y = this.ballInitialY;

        this.ballsCount += 1;

    },

    resetBalls: function () {


        //         this.balls.forEach(function(ball){
        //            ball.kill();
        //         }, false);

        this.balls.callAll('kill');
        this.ballsCount = 0;
        var tempBall = this.balls.getFirstDead();

        if (tempBall) {
            this.resetBall(tempBall);
        }

    },

    takeOneLifeDown: function () {
        if (this.balls.countLiving() == 0) {
            this.lives -= 1;
            this.livesText.text = 'LIVES: ' + this.lives;
            var firstDeadBall = this.balls.getFirstDead();
            firstDeadBall.revive();
            this.ballsCount += 1;
            this.resetCountDown();
            if (this.lives == 0) {
                this.gameOver();
            }
        }
    },

    setBallInitialVelocity: function () {
        this.balls.forEach(this.setBallVelocity, this);
    },

    setBallVelocity: function (tempBall) {

        this.physics.enable(tempBall, Phaser.Physics.ARCADE);
        tempBall.body.velocity.x = this.initialDirection * this.ballSpeed;
        tempBall.body.velocity.y = this.ballSpeed;
    },

    toggleMouseKeyboardControls: function () {
        this.mouseControl = !this.mouseControl;
    },

    toggleshakeEffect: function () {
        this.shakeEffect = !this.shakeEffect;
    },

    prevLevel: function () {

        if (this.currentLevel > 0) {
            this.currentLevel -= 1;

            this.resetBalls();
            this.initLevelVars();
            this.populateLevel(this.currentLevel);
            this.resetCountDown();
        }
        this.levelText.text = 'LEVEL: ' + (this.currentLevel + 1);
    },

    nextLevel: function () {
        if (this.currentLevel >= 3) {
            this.gameWin();
        }

        if (this.currentLevel <= 2) {
            this.currentLevel += 1;

            this.resetBalls();
            this.initLevelVars();
            this.populateLevel(this.currentLevel);
            this.resetCountDown();


        }

        this.levelText.text = 'LEVEL: ' + (this.currentLevel + 1);
    },

    paddleUpdate: function () {

        if (this.mouseControl) {

            this.paddle.body.x = this.game.input.worldX - this.paddle.body.halfWidth;

            if (this.paddle.body.x <= 0) {
                this.paddle.body.x = 0;
            }
            if (this.paddle.body.x >= this.game.world.width - this.paddle.width) {
                this.paddle.body.x = this.game.world.width - this.paddle.width;
            }
        } else {

            if ((this.aKey.isDown) && (!this.dKey.isDown)) {
                if (this.paddle.body.x <= 0) {
                    this.paddle.body.x = 0;
                } else {
                    this.paddle.body.velocity.x = -this.paddleSpeed;
                }
            } else if ((this.dKey.isDown) && (!this.aKey.isDown)) {
                if (this.paddle.body.x >= this.game.world.width - this.paddle.width) {
                    this.paddle.body.x = this.game.world.width - this.paddle.width;
                } else {
                    this.paddle.body.velocity.x = this.paddleSpeed;
                }
            } else {
                this.paddle.body.velocity.x = 0;
            }
        }

        if (this.game.input.keyboard.addKey(Phaser.Keyboard.Z).isDown) {
             this.buffPaddle();
        }

        if (this.isPaddleNerfed) {
            this.paddle.width = 52;
            //this.paddle.frameName = "paddle_small.png";
        } else if (this.isPaddleBuffed) {
            this.paddle.width = 100;
        } else {
            //this.paddle.frameName = "paddle_big.png";
            this.paddle.width = 76;
        }

        this.paddle.body.setSize(this.paddle.width, this.paddle.height);

    },

    buffPaddle: function () {
        console.log('buffPaddle');
        if (this.isPaddleBuffed || this.isPaddleNerfed) {
            clearTimeout(this.recoverTimeout);
        }

        this.isPaddleBuffed = true;
        var that = this;

        this.recoverTimeout = setTimeout(function () {
            that.isPaddleBuffed = false;
            that.isPaddleNerfed = false;
            that.recover.play();
        }, this.paddleNerfTime);
    },

    nerfPaddle: function () {
        if (this.isPaddleNerfed || this.isPaddleBuffed) {
            clearTimeout(this.recoverTimeout);
        }

        this.isPaddleNerfed = true;
        var that = this;

        this.recoverTimeout = setTimeout(function () {
            that.isPaddleBuffed = false;
            that.isPaddleNerfed = false;
            that.recover.play();
        }, this.paddleNerfTime);
    },

    bricksUpdate: function () {

    },

    ballUpdate: function (ball) {

        ball.animations.play('rotate');

        if (ball.body.y > this.game.world.height + ball.body.height) {

            ball.body.x = this.ballInitialX;
            ball.body.y = this.ballInitialY;
            ball.body.velocity.x = 0;
            ball.body.velocity.y = 0;

            ball.kill();
            this.ballsCount -= 1;

            if (this.ballsCount <= 0) {

                this.takeOneLifeDown();

                this.items.callAll('kill');
                this.isPaddleNerfed = false;

            }

        }
        if (ball.body.x < this.wallWidth) {
            ball.body.x = this.wallWidth;
            ball.body.velocity.x *= -1;
        }
        if (ball.body.x > this.game.world.width - this.wallWidth - ball.body.width) {
            ball.body.x = this.game.world.width - this.wallWidth - ball.body.width;
            ball.body.velocity.x *= -1;
        }
        if (ball.body.y < 16) {
            ball.body.velocity.y = Math.abs(ball.body.velocity.y);
        }
        if (ball.body.velocity.x > this.ballMaxVel) {
            ball.body.velocity.x = this.ballMaxVel;
        }
        if (ball.body.velocity.y > this.ballMaxVel) {
            ball.body.velocity.y = this.ballMaxVel;
        }
    },

    countDownUpdate: function () {

        this.countDownTimeElapsed += this.game.time.elapsed;

        if (!this.isCountDownOff) {

            if (this.countDownTimeElapsed > this.countDownTimeInterval * this.countDownsecondTick) {

                this.countDownTime -= 1;
                this.countDownsecondTick += 1;

                this.countdownBlip.play();
            }

            if (this.countDownTime == 2) {
                this.countDown.play("counter_two", 10);
            } else if (this.countDownTime == 2) {
                this.countDown.play("counter_one", 10);
            } else if (this.countDownTime == 1) {
                this.countDown.play("counter_one", 10);
            } else if (this.countDownTime <= 0) {
                this.setBallInitialVelocity();
                this.isCountDownOff = true;
                this.countDown.kill();
            }
        }

    },

    resetCountDown: function () {
        this.countDown.revive();
        this.countDown.play("counter_three");
        this.countDownTime = 1;
        this.countDownTimeElapsed = 0;
        this.countDownsecondTick = 1;
        this.isCountDownOff = false;
    },

    paddleHitBallHandler: function (paddle, ball) {
    },

    paddleHitBallProcess: function (paddle, ball) {

        //console.log("%cprocess", "background: red;");
        //console.log(paddle.name + ' colide with ' + ball.name);

        ball.body.velocity.y = this.determineBounceVelocityY(paddle, ball);
        ball.body.velocity.x = this.determineBounceVelocityX(paddle, ball);

        return true;

    },

    determineBounceVelocityX: function (_paddle, _ball) {

        // X 축에 대한 반동 축 결정
        var bounceVelocityX = _ball.body.velocity.x;

        var ballBodyCenterX = _ball.body.x + _ball.body.halfWidth;
        var paddleBodyCenterX = _paddle.body.x + _paddle.body.halfWidth;
        var distanceX = Math.abs(ballBodyCenterX - paddleBodyCenterX);

        if (_ball.body.right < _paddle.body.x) {
            var directionVariable = (bounceVelocityX > 0) ? -1 : 1;
            return bounceVelocityX * directionVariable - (distanceX * 2);
        }

        if (ballBodyCenterX == paddleBodyCenterX) {
            return bounceVelocityX + 1 + Math.random() * 8;
        }

        var bounceCoefficient = 0;

        function coefficient(bounceScale, halfWidth) {

            if (bounceScale > 0 && bounceScale < halfWidth / 3) {
                return 0.7;
            } else if (bounceScale > halfWidth / 3 && bounceScale < halfWidth / 3 * 2) {
                return 0.9
            } else {
                return 1.1;
            }

        }

        if (ballBodyCenterX < paddleBodyCenterX) {
            bounceCoefficient = -1 * coefficient(distanceX, _paddle.body.halfWidth);
        } else {
            bounceCoefficient = coefficient(_paddle.body.halfWidth - distanceX, _paddle.body.halfWidth);
        }

        var ratio = (distanceX) / _paddle.body.halfWidth * bounceCoefficient;

        return (this.ballSpeed * ratio);

    },

    determineBounceVelocityY: function (paddle, ball) {
        var bounceVelocityY = ball.body.velocity.y;
        if (ball.body.y < paddle.body.y + paddle.body.height / 2) {
            bounceVelocityY *= -ball.body.bounce.y;
        }
        return bounceVelocityY;
    },

    ballHitBrickHandler: function (_ball, _brick) {

        _brick.animations.play("brick_die", 15);
        _brick.events.onAnimationComplete.add(this.onAnimationCompleteBrick, this);

        this.brickDeath.play();

        var that = this;

        // 피버타임이면 ..?
        if (this.isfevertime) {
            this.score += 200;
        } else {
            this.score += this.scorePerBrick;
            this.feverscore += 100;

            if (this.feverscore == this.feverscore_max) {
                this.isfevertime = true;
                this.fevertime_bar_gauge.height = -150;
                this.fevertimesound.play();

                this.feverTimeout = setTimeout(function () {
                    that.isfevertime = false;
                    that.fevertime_bar_gauge.height = 0;
                    that.feverscore = 0;
                    //console.log('fevertimeout call');

                }, this.fevertime);

            } else {
                this.fevertime_bar_gauge.height = -150 * (this.feverscore / this.feverscore_max);
            }

        }


        this.scoreText.text = 'SCORE: ' + this.score;

        if (this.bricksWithItems.indexOf(_brick.name) > -1) {
            this.dropItem(_brick.x, _brick.y);
        }

    },


    ballHitBricklProcess: function (ball, _brick) {
        // 볼 & 브릭 충돌
        //console.log(ball, _brick);

        if (this.shakeEffect) {
            this.shakeGame();  //funny extra ;)
        }
        return true;
    },

    dropItem: function (dropItemInitialX, dropItemInitialY) {

        var typeFrame = "";
        var itemEffectName = "";

        var itemFlag = Math.floor(Math.random() * this.dropItemCount);
        //TODO 패들 사이즈 업 아이템만 나오도록!
        //var itemFlag = 2;
        console.log("itemFlag : " + itemFlag);
        if (itemFlag == 0) {
            typeFrame = 'power_paddlesize_down.png';
            itemEffectName = "powerDown";
        } else if (itemFlag == 1) {
            typeFrame = 'power_ball_up.png';
            itemEffectName = "powerUp";
        } else if (itemFlag == 2) {
            typeFrame = 'power_paddle_up.png';
            itemEffectName = "powerPaddleUp";
        }

        var dropItem;
        dropItem = this.game.add.sprite(dropItemInitialX, dropItemInitialY, 'tiles', typeFrame);
        var tempCount = 0;
        if (this.items.countLiving() > 0) {
            tempCount = this.items.countLiving();
        }
        dropItem.name = 'item' + (tempCount + 1);

        dropItem.itemEffectName = itemEffectName;

        this.physics.enable(dropItem, Phaser.Physics.ARCADE);
        dropItem.body.x = dropItemInitialX;
        dropItem.body.y = dropItemInitialY;
        dropItem.body.velocity.y = 200;

        this.items.add(dropItem);
    },

    onAnimationCompleteBrick: function (sprite, animation) {

        if (animation.name == "brick_die") {
            sprite.kill(); //working kill a brick


            if (this.bricks.countLiving() == 0) {
                // 새로운 레벨 시작
                this.score += this.scorePerLevel;
                this.scoreText.text = 'SCORE: ' + this.score;
                this.nextLevel();
            }
        }
    },

    paddleHitItemHandler: function (paddle, item) {
        //empty handler
    },

    paddleHitItemProcess: function (paddle, item) {

        if (item.itemEffectName == "powerDown") {
            this.nerfPaddle();
            //play a sound
            this.powerdown.play();
        } else if (item.itemEffectName == "powerUp") {
            this.createBall(true);
            //play 사운드 실행
            this.powerup.play();
        } else if (item.itemEffectName == "powerPaddleUp") {
            this.buffPaddle();
            this.powerup.play();
        }
        item.kill();
        return true;
    },

    ballHitBallHandler: function (ball1, ball2) {
        //empty handler
    },

    ballHitBallProcess: function (ball1, ball2) {

        if (ball1.body.velocity.y > 0 && ball2.body.velocity.y < 0) {
            ball1.body.velocity.y *= -ball1.body.bounce.y;
            ball2.body.velocity.y *= -ball2.body.bounce.y;
        }
        if (ball1.body.velocity.y > 0 && ball2.body.velocity.y < 0) {
            ball1.body.velocity.x *= -ball1.body.bounce.x;
            ball2.body.velocity.x *= -ball2.body.bounce.x;
        }
    },

    shakeGame: function () {
        var rumble = 100;
        var rumbleSpeed = 50;
        var rumbleInterval;
        var rumbleStopTimeOut;
        var rumbleTime = 500;
        var rumbleDuration = 300;

        clearInterval(rumbleInterval);
        rumbleInterval = setInterval(this.shake, rumbleSpeed, this.game.camera, 2, 5);
        clearInterval(rumbleStopTimeOut);
        rumbleStopTimeOut = setTimeout(this.stopShake, rumbleDuration, this.game.camera, rumbleInterval);
    },

    stopShake: function (rect, interval) {
        clearInterval(interval);

        rect.x = 0;
        rect.y = 0;

    },

    shake: function (rect, x, y) {

        x = x || 5;
        y = y || 5;

        var rx = Math.floor(Math.random() * (x + 1)) - x / 2;
        var ry = Math.floor(Math.random() * (y + 1)) - y / 2;

        rx = (rx === 0 && x !== 0) ? ((Math.random() < 0.5) ? 1 : -1) : rx;
        ry = (ry === 0 && y !== 0) ? ((Math.random() < 0.5) ? 1 : -1) : ry;

        rect.x += rx;
        rect.y += ry;

    },

    gameOver: function () {
        this.game.state.start('GameOver');
    },

    gameWin: function () {
        this.game.state.start('Congratulations');
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};