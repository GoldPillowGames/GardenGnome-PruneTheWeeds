import UsefulMethods from './useful-methods.js';
import SoundManager from './sound-manager.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, attackTime, window, stamina, hp, idleAnimation, attackAnimation, tint} = data;
        super(scene, x, y, texture, frame);
        // #endregion

        // #region Variables
        this.enemyStates = {
            ATTACKING: 'attacking',
            PARRY: 'parry',
            TIRED: 'tired',
        }

        this.x = x;
        this.y = y;

        this.enemyState = this.enemyStates.ATTACKING;
        this.enemyScale = 1;

        this.idleAnimation = idleAnimation;
        this.attackAnimation = attackAnimation;

        this.scene = scene;
        this.attackTime = attackTime;
        this.window = window;
        this.baseStamina = stamina;
        this.stamina = stamina;
        this.hp = hp;
        this.maxHP = hp;

        this.tinte = tint;
        // #endregion
        this.beenParried = false;

        this.firstAttack = true;
        this.isDying = false;
        this.isAboutToDie = false;
        this.slowMotion = 1;

        switch (texture) {
            case 'IdlePlant':
                UsefulMethods.print("planta");
                this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(1, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
                break;
            case 'IdleMushroom':
                this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(3.5, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
                break;
            default:
                this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(7.5, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
                break;
        }

        //this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(10, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        this.collision.setAlpha(0);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(30, "x", this.scene);
        this.scaleY = this.scaleX;
        this.enemyScale = this.scaleX;

        this.setOrigin(this.originX, 1);

        this.anims.play(this.idleAnimation);

        this.collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.collision.scaleY = this.collision.scaleX;



        //this.anims.play('CarnivoreFlowerIdle');
    }

    createBars() {

        //Fondo negro de las barras que sea un rectangulo en vez de 2

        this.healthBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene) - this.scene.healtBarHeight * 1.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xff5e5e);
        this.healthBar.setDepth(5);

        this.healthBarBackground = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 - this.scene.healthBarWidht * 0.035 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene) - this.scene.healtBarHeight * 1.28, this.scene.healthBarWidht * 1.07, this.scene.healtBarHeight + this.scene.healthBarWidht * 0.07, 0x0c0c0c);
        this.healthBarBackground.setOrigin(0);
        this.healthBarBackground.setDepth(3);

        this.whiteHealthBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene) - this.scene.healtBarHeight * 1.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xFFFFFF);
        this.whiteHealthBar.setOrigin(0);
        this.whiteHealthBar.setDepth(4);

        this.staminaBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene) + this.scene.healtBarHeight * 0.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0x70ff70);
        this.staminaBar.setDepth(5);

        this.staminaBarBackground = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 - this.scene.healthBarWidht * 0.035 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene), this.scene.healthBarWidht * 1.07, this.scene.healtBarHeight + this.scene.healthBarWidht * 0.035, 0x0c0c0c);
        this.staminaBarBackground.setOrigin(0);
        this.staminaBarBackground.setDepth(3);

        this.healthBar.setOrigin(0);
        this.staminaBar.setOrigin(0);

        this.whiteStaminaBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht / 2 + this.width * this.scaleX * 0.25, this.y - UsefulMethods.RelativePosition(40, "y", this.scene) + this.scene.healtBarHeight * 0.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xFFFFFF);
        this.whiteStaminaBar.setOrigin(0);
        this.whiteStaminaBar.setDepth(4);

        this.scene.arrow.x = (this.healthBar.x - this.scene.arrow.displayWidth / 2 - UsefulMethods.RelativePosition(1, 'x', this.scene));
    }

    waiting() {
        if (this.isDying)
            return;

        this.scene.arrow.setAlpha(0);
        this.anims.play(this.idleAnimation);
        UsefulMethods.print("waiting");
        if (this.scene != null) {
            this.firstAttack = true;
            //this.scene.player.anims.play('GnomeStopAnim');
            this.scene.time.addEvent({ delay: (Math.random() * 0.75 + 0.5) * 1000, callback: this.attack, callbackScope: this, loop: false });
        }
    }


    getParried() {
        if (this.isDying)
            return;

        this.stamina -= 1;
        this.staminaBar.scaleX = this.stamina / this.baseStamina;
        if (this.stamina == 0) {
            this.enemyState = this.enemyStates.TIRED;
            this.beingTired();
        }
        else {
            // this.enemyState = this.enemyStates.ATTACKING;
            // this.attack();
        }
        var that = this;
        this.scene.tweens.add({
            targets: that,
            y: that.y - 22,
            ease: 'Power1',

            duration: 85,
            yoyo: true,
            repeat: 0,
            onStart: function () {

            },
            onComplete: function () {

            },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
    }

    notGetParried() {
        if (this.isDying)
            return;

        if (this.enemyState == this.enemyStates.PARRY) {

            if (!this.beenParried) {
                this.scene.player.hurt();
            }
            this.enemyState = this.enemyStates.ATTACKING;
            this.waiting();
        }
    }

    beingTired() {
        if (this.isDying)
            return;

        this.anims.play(this.idleAnimation);
        UsefulMethods.print('tired');
        this.scene.time.addEvent({ delay: 1000, callback: this.notGettingAttacked, callbackScope: this, loop: false });
    }

    attack() {
        if (this.isDying)
            return;

        this.beenParried = false;

        UsefulMethods.print('attack');
        if (this.scene != null) {
            this.anims.play(this.attackAnimation);
            this.scene.arrow.setAlpha(0);


            //this.scene.arrow.y = this.y - UsefulMethods.RelativePosition(15, "y", this.scene);
            this.scene.arrow.y = this.y - UsefulMethods.RelativePosition(40, "y", this.scene)// - this.scene.healtBarHeight * 1.07;
            this.scene.time.addEvent({ delay: this.attackTime * 1000, callback: this.goParry, callbackScope: this, loop: false });
        }

    }

    goParry() {
        if (this.isDying)
            return;

        this.scene.arrow.setAlpha(1);

        if (!this.scene.hardMode) {
            var random = Math.random() < 0.5 ? -1 : 1;
        } else {
            var random = Math.random();


            if (random < 0.25)
                random = 0;
            else if (random >= 0.25 && random < 0.5)
                random = -1;
            else if (random >= 0.5 && random < 0.75)
                random = 1;
            else if (random >= 0.75)
                random = 2;
        }


        this.scene.arrow.angle = 90 * random;
        UsefulMethods.print('parry');
        this.enemyState = this.enemyStates.PARRY;
        this.stopBeingParried = this.scene.time.addEvent({ delay: this.window * 1000, callback: this.notGetParried, callbackScope: this, loop: false });
    }

    getAttacked() {
        if (this.isDying)
            return;

        this.hp -= 1;
        this.healthBar.scaleX = this.hp / this.maxHP;
        var that = this;
        this.scene.tweens.add({
            targets: that,
            x: that.x + 15,
            ease: 'Power1',

            duration: 65,
            yoyo: true,
            repeat: 0,
            onStart: function () {
                that.setTint(0xff002a);
            },
            onComplete: function () {
                
                that.setTint(that.tinte);
                UsefulMethods.print("Tinte" + that.tinte);
            },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });

    }

    notGettingAttacked() {
        if (this.isDying)
            return;

        if (this.enemyState == this.enemyStates.TIRED) {
            UsefulMethods.print("From tired to attack");
            this.enemyState = this.enemyStates.ATTACKING;
            this.stamina = this.baseStamina;
            this.staminaBar.scaleX = 1;
            this.attack();
        }
    }

    playerHasParried() {
        if (this.isDying)
            return;

        UsefulMethods.print("Parry");
        switch (this.enemyState) {
            case this.enemyStates.ATTACKING:
                //this.scene.player.HP--;
                break;
            case this.enemyStates.PARRY:
                if (!this.beenParried) {
                    this.getParried();
                    this.beenParried = true;
                }
                this.scene.player.parrying = false;
                break;
            default:
                break;
        }
    }

    playerHasAttacked() {
        if (this.isDying)
            return;
        switch (this.enemyState) {
            case this.enemyStates.TIRED:
                this.getAttacked();

                UsefulMethods.print('Recibi ataque');


                if (this.hp != 0) {
                    /*if (this.firstAttack) {
                        this.firstAttack = false;*/
                    this.scene.player.anims.play('GnomeAttackAnim');
                    SoundManager.playSound('axeAttack', this.scene);
                    //SoundManager.playSound('enemyDamage1', this.scene);
                    //};

                    // Reproducir sonido hachazo.
                }
                else {
                    var that = this;
                    SoundManager.playSound('enemyDeath1', this.scene);
                    SoundManager.playSound('finalAttack1', this.scene);
                    this.scene.tweens.add({
                        targets: that,
                        alpha: { value: 0, duration: 50, ease: 'Linear' },
                        repeat: 0,
                    });
                    this.scene.tweens.add({
                        targets: [
                            that.staminaBar,
                            that.healthBar,
                            that.healthBarBackground,
                            that.staminaBarBackground,
                            that.whiteHealthBar,
                            that.whiteStaminaBar
                        ],
                        alpha: { value: 0, duration: 50, ease: 'Linear' },
                        repeat: 0,
                    });

                    this.scene.player.anims.play('GnomeAttackAnimLast');
                    this.scene.cameras.main.rotateTo(this.scene.cameraRotationWhenKilling, true, 599, 'Cubic.easeOut');
                    this.scene.cameras.main.zoomTo(this.scene.cameraZoomWhenKilling, 599, 'Expo.easeOut');
                    this.scene.uiContainer.setScrollFactor(1);

                    this.isDying = true;
                    this.scene.player.anims.pause();
                    this.scene.combatHappening = false;
                    this.scene.arrow.setAlpha(0);

                    this.slowMotion = 0.05;
                    this.scene.tweens.timeScale = this.slowMotion;

                    SoundManager.stopMusic(this.scene);

                    this.scene.time.addEvent({
                        delay: 225,
                        callback: () => {
                            this.scene.player.anims.resume();
                            // Reproducir sonido hachazo.
                        }
                    });

                    this.scene.time.addEvent({
                        delay: 600,
                        callback: () => {
                            this.slowMotion = 1;
                            SoundManager.playMusic('theme1', this.scene);
                            this.scene.cameraZoom = 0.9;
                            this.scene.cameras.main.rotateTo(0, true, 200, 'Cubic.easeOut');
                            this.scene.cameras.main.zoomTo(this.scene.cameraZoom, 200, 'Expo.easeOut');

                            this.scene.restoreLerp(1, 200, true);

                            this.scene.player.score++; //+= this.maxHP * 10;

                            this.scene.uiContainer.setScrollFactor(0);
                        }
                    });

                }
                break;
            default:
                break;
        }
    }

    die() {
        this.isAboutToDie = true;
        
        this.scene.tweens.timeScale = 1;

        this.staminaBar.destroy();
        this.healthBar.destroy();
        this.healthBarBackground.destroy();
        this.staminaBarBackground.destroy();
        this.whiteHealthBar.destroy();
        this.whiteStaminaBar.destroy();
        this.destroy();
        // var that = this;
        //     this.scene.tweens.add({
        //         targets: that,
        //         y: that.y - 20,
        //         ease: 'Power1',

        //         duration: 85,
        //         yoyo: true,
        //         repeat: 0,
        //         onStart: function () {

        //         },
        //         onComplete: function () {
        //             var that = this;
        //     this.scene.tweens.add({
        //         targets: that,
        //         y: that.y + 400,
        //         ease: 'Power1',

        //         duration: 805,
        //         yoyo: true,
        //         repeat: 0,
        //         onStart: function () {

        //         },
        //         onComplete: function () {

        //         },
        //         onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
        //         onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        //     });
        //         },
        //         onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
        //         onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        //     });
    }

    update(delta) {
        if (this.isAboutToDie)
            return;

        this.whiteHealthBar.scaleX = UsefulMethods.lerp(this.whiteHealthBar.scaleX, this.healthBar.scaleX, 0.08 * this.slowMotion);
        this.whiteStaminaBar.scaleX = UsefulMethods.lerp(this.whiteStaminaBar.scaleX, this.staminaBar.scaleX, 0.08 * this.slowMotion);

        if (this.whiteHealthBar.scaleX < 0.05 && this.isDying && this.slowMotion == 1)
            this.die();
    }
}