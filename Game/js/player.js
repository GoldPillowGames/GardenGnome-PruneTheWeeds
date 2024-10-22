import UsefulMethods from '../js/useful-methods.js';
import SoundManager from './sound-manager.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, HP, tint, tintParry } = data;
        super(scene, x, y, texture, frame);
        // #endregion

        // #region Variables
        this.playerStates = {
            STOPPED: 'stopped',
            WALKING: 'walking',
        }
        this.playerState = this.playerStates.STOPPED;
        this.direction = 0;
        this.HP = HP;
        this.maxHP = HP;
        this.canMove = true;
        this.playerScale = 1;
        this.velocity = 360;

        this.tinte = tint;
        this.tintParry = tintParry;

        this.parrying = false;

        this.canParry = true;
        this.parryCooldown = 1;

        this.score = 0;
        scene.sys.game.score = this.score;

        this.scene = scene;
        this.isDead = false;
        // #endregion

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.step = 0;
        this.isWalking = false;
        //this.setCollideWorldBounds(true);
    }

    parryCooldownFunction() {
        this.canParry = false;
        this.scene.player.anims.play('GnomeParryUp');
        this.scene.time.addEvent({ delay: this.parryCooldown * 1000, callback: this.canParryAgain, callbackScope: this, loop: false });
    }

    canParryAgain() {
        this.anims.play('GnomeStopAnim');
        this.canParry = true;
    }

    createParryControls() {
        // Cuando se suelta el click izquierdo del ratón, el personaje hace parry o ataca.
        this.scene.input.on('pointermove', function (pointer) {

            if (this.scene.combatHappening && this.scene.currentEnemy != null && this.scene.inputManager.movementPointerId === pointer.id &&
                this.canParry &&
                (new Phaser.Math.Vector2(pointer.x - this.scene.inputManager.initialMouseX, pointer.y - this.scene.inputManager.initialMouseY)).length() >= 40) {
                UsefulMethods.print("En combate");

                if (this.parrying)
                    this.parryCooldownFunction();

                if (this.scene.arrow.angle == -90 && (pointer.y - this.scene.inputManager.initialMouseY < 0 && Math.abs(pointer.y - this.scene.inputManager.initialMouseY) > Math.abs(pointer.x - this.scene.inputManager.initialMouseX))) {
                    if (this.parrying) {

                        this.anims.play('GnomeParryUp');
                        this.doParry();
                    }
                }
                else if (this.scene.arrow.angle == 90 && (pointer.y - this.scene.inputManager.initialMouseY > 0 && Math.abs(pointer.y - this.scene.inputManager.initialMouseY) > Math.abs(pointer.x - this.scene.inputManager.initialMouseX))) {
                    if (this.parrying) {
                        this.anims.play('GnomeParryDown');
                        this.doParry();
                    }
                } else if (this.scene.hardMode) {
                    if (this.scene.arrow.angle == 0 && (pointer.x - this.scene.inputManager.initialMouseX > 0 && Math.abs(pointer.x - this.scene.inputManager.initialMouseX) > Math.abs(pointer.y - this.scene.inputManager.initialMouseY))) {
                        if (this.parrying) {
                            this.anims.play('GnomeParryUp');
                            this.doParry();
                        }
                    } else if (this.scene.arrow.angle == -180 && (pointer.x - this.scene.inputManager.initialMouseX < 0 && Math.abs(pointer.x - this.scene.inputManager.initialMouseX) > Math.abs(pointer.y - this.scene.inputManager.initialMouseY))) {
                        if (this.parrying) {
                            this.anims.play('GnomeParryDown');
                            this.doParry();
                        }
                    }
                }
            }

        }, this);

        this.scene.input.on('pointerdown', function (pointer) {
            if (this.scene.currentEnemy != null) {
                this.parrying = true;

                this.scene.currentEnemy.playerHasAttacked();
            }
        }, this);

        this.scene.input.on('pointerup', function (pointer) {
            this.parrying = false;
        }, this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(20, "x", this.scene);
        

        this.scaleY = this.scaleX;
        this.playerScale = this.scaleX;
        this.setDepth(0);

        this.createParryControls();

        /*this.scene.input.on('pointerup', function (pointer) {
            if (this.scene.inputManager.movementPointerId === pointer.id) {
                this.setVelocityX(0);
            }
        });*/
        var that = this;
        this.scene.input.on('pointermove', function (pointer) {
            if (this.scene.inputManager.movementPointerId === pointer.id) {
                if (this.scene.inputManager.isMouseMoving) {
                    if (pointer.x - this.scene.inputManager.initialMouseX > 0) {
                        that.direction = 1;
                    }
                    else if (pointer.x - this.scene.inputManager.initialMouseX < 0) {
                        that.direction = -1;
                    }
                }
            }
        });
    }

    hurt() {
        this.HP--;
        SoundManager.playSound('gnomeDamaged1', this.scene);
        this.scene.healthBar.scaleX = (this.scene.player.HP / this.scene.player.maxHP);

        var that = this;

        this.anims.play('GnomeHurt');
        this.canParry = false;
        this.scene.time.addEvent({ delay: this.parryCooldown * 1000, callback: this.canParryAgain, callbackScope: this, loop: false });

        this.scene.tweens.add({
            targets: that,
            x: that.x - 15,
            ease: 'Power1',

            duration: 90,
            yoyo: true,
            repeat: 0,
            onStart: function () {
                that.setTint(0xff002a);
            },
            onComplete: function () {
                that.setTint(that.tinte);
                UsefulMethods.print(that.tinte)
            },
            onYoyo: function () {  },
            onRepeat: function () {  },
        });

        if (this.HP <= 0) {
            this.scene.tweens.add({
                targets: that,
                alpha: { value: 0, duration: 90, ease: 'Linear' },
                repeat: 0,
            });
            this.scene.tweens.add({
                targets: [
                    that.scene.healthBar,
                    that.scene.healthBarBackground,
                    that.scene.whiteHealthBar
                ],
                alpha: { value: 0, duration: 90, ease: 'Linear' },
                repeat: 0,
            });
            this.die();
        }

    }

    die() {
        if (!this.isDead) {
            //this.onDie();
            // UsefulMethods.print("El jugador muere. Pasa lo que tenga que pasar.");
            SoundManager.stopMusic(this.scene, 149);
            this.scene.sys.game.score = this.score;
            this.scene.cameras.main.fadeOut(150);
            this.scene.scene.get("Level_" + this.scene.sys.game.levelIndex).time.addEvent({ delay: 210, callback: function () { this.scene.scene.start("GameOver"); }, callbackScope: this, loop: false });
            this.isDead = true;
        }
    }

    update(delta) {

        
        if (this.anims.currentFrame != null && this.anims.currentFrame.index === 1 && this.anims.currentAnim.key === 'GnomeWalkAnim' && this.step === 0) {
            UsefulMethods.print(this.anims.currentFrame);
            SoundManager.playSound('walkSound', this.scene, 0.65);
            this.step = 1;
        }

        if (this.anims.currentFrame != null && this.anims.currentFrame.index === 6 && this.anims.currentAnim.key === 'GnomeWalkAnim' && this.step === 1) {
            UsefulMethods.print(this.anims.currentFrame);
            SoundManager.playSound('walkSound', this.scene, 0.65);
            this.step = 0;
        }


        this.parryWithKeys();
        if (this.scene.currentEnemy != null && Phaser.Input.Keyboard.JustDown(this.scene.inputManager.spaceButton)) {
            this.parrying = true;

            this.scene.currentEnemy.playerHasAttacked();
        }

        // if(this.direction != 0 && !this.scene.combatHappening){
        //     this.anims.play('GnomeWalkAnim');
        //     this.playerState = this.playerStates.WALKING;
        // }

        if (this.direction == -1)
            this.direction = 0;

        if ((this.direction > 0) && this.playerState === this.playerStates.STOPPED && this.canMove) {
            this.anims.play('GnomeWalkAnim');
            this.playerState = this.playerStates.WALKING;
        } else if (this.playerState === this.playerStates.WALKING && this.direction === 0) {
            this.anims.play('GnomeStopAnim');
            this.playerState = this.playerStates.STOPPED;
        }

        if (!this.scene.inputManager.isMouseMoving) {
            if (this.canMove) {
                if (this.scene.inputManager.DButton.isDown) {
                    this.direction = 1;
                }
                else {
                    this.direction = 0;
                }
            }
            else {
                this.direction = 0;
            }
        }

        // // Volteo del sprite según dirección.
        // if (this.direction < 0 && !this.scene.combatHappening) {
        //     this.scaleX = -Math.abs(this.scaleX);
        // }
        // if (this.direction > 0) {
        //     this.scaleX = Math.abs(this.scaleX);
        // }

        if (this.canMove && this.direction != 0 && this.anims.getCurrentKey() != 'GnomeWalkAnim') {
            if(!this.isWalking){
                this.isWalking = true;
                this.step = 0;
            }
            this.anims.play('GnomeWalkAnim');
        }else{
            if(this.isWalking){
                this.isWalking = false;
            }
        }

        // Se aplica la velocidad de movimiento al sprite
        var calculatedSpeed = this.canMove ? (this.direction * this.velocity) : 0;

        calculatedSpeed *= this.scene.width / 1000
        this.setVelocityX(calculatedSpeed);

    }

    parryWithKeys() {

        this.keysPressed = this.scene.inputManager.downButton.isDown || this.scene.inputManager.upButton.isDown || this.scene.inputManager.rightButton.isDown || this.scene.inputManager.leftButton.isDown;

        if (this.scene.combatHappening && this.scene.currentEnemy != null &&
            this.canParry && this.keysPressed) {
            UsefulMethods.print("En combate");

            this.parryCooldownFunction();

            if (this.scene.arrow.angle == -90 && this.scene.inputManager.upButton.isDown) {

                this.anims.play('GnomeParryUp');
                this.doParry()

            }
            else if (this.scene.arrow.angle == 90 && this.scene.inputManager.downButton.isDown) {
                this.anims.play('GnomeParryDown');
                this.doParry()
            } else if (this.scene.hardMode) {
                if (this.scene.arrow.angle == 0 && this.scene.inputManager.rightButton.isDown) {

                    this.anims.play('GnomeParryUp');
                    this.doParry()
                } else if (this.scene.arrow.angle == -180 && this.scene.inputManager.leftButton.isDown) {

                    this.anims.play('GnomeParryDown');
                    this.doParry()
                }
            }
        }
    }

    doParry() {
        SoundManager.playSound('parrySound', this.scene);
        this.scene.currentEnemy.playerHasParried();
        var that = this;
        this.scene.tweens.add({
            targets: that,
            x: that.x - 15,
            ease: 'Power1',

            duration: 90,
            yoyo: true,
            repeat: 0,
            onStart: function () {
                that.setTint(that.tintParry);
            },
            onComplete: function () {
                that.setTint(that.tinte);
                UsefulMethods.print(that.tinte)
            },
            onYoyo: function () {  },
            onRepeat: function () {  },
        });
    }
}