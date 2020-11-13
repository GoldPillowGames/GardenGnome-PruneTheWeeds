import UsefulMethods from './useful-methods.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, attackTime, window, stamina, hp, idleAnimation, attackAnimation } = data;
        super(scene, UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        // #endregion

        // #region Variables
        this.enemyStates = {
            ATTACKING: 'attacking',
            PARRY: 'parry',
            TIRED: 'tired'
        }

        this.x = UsefulMethods.RelativePosition(x, "x", scene);
        this.y = UsefulMethods.RelativePosition(y, "y", scene)

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
        // #endregion

        this.collision = this.scene.physics.add.sprite(UsefulMethods.RelativePosition(x - 10, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        this.collision.setAlpha(0.2);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.scaleY = this.scaleX;
        this.enemyScale = this.scaleX;

        this.anims.play(this.idleAnimation);

        this.collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.collision.scaleY = this.collision.scaleX;

        //this.anims.play('CarnivoreFlowerIdle');
    }

    getParried() {
        this.stamina -= 1;
        if (this.stamina == 0) {
            this.enemyState = this.enemyStates.TIRED;
            this.beingTired();
        }
        else {
            this.enemyState = this.enemyStates.ATTACKING;
            this.attack();
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
        UsefulMethods.print("NotGetParried");
        if (this.enemyState == this.enemyStates.PARRY) {
            this.enemyState = this.enemyStates.ATTACKING;
            UsefulMethods.print("back to parrry");
            this.attack();
        }
    }

    beingTired() {
        UsefulMethods.print('tired');
        this.BackAttack = this.scene.time.addEvent({ delay: this.window * 1000, callback: this.notGettingAttacked, callbackScope: this, loop: false });
    }

    attack() {
        
        

        UsefulMethods.print('attack');
        if (this.scene != null){
            this.scene.arrow.setAlpha(0);
            
            this.scene.arrow.x = this.x;
            this.stopAttacking = this.scene.time.addEvent({ delay: this.attackTime * 1000, callback: this.goParry, callbackScope: this, loop: false });
        }
            
    }

    goParry() {
        this.scene.arrow.setAlpha(1);
        var random = Math.random() < 0.5 ? -1 : 1;
        this.scene.arrow.angle = 90 * random;
        UsefulMethods.print('parry');
        this.enemyState = this.enemyStates.PARRY;
        this.stopBeingParried = this.scene.time.addEvent({ delay: this.window * 1000, callback: this.notGetParried, callbackScope: this, loop: false });
    }

    getAttacked() {
        this.hp -= 1;
        if(this.hp > 0)
        {
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
                    that.setTint(0xffffff);
                },
                onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
            });
        }
       
    }

    notGettingAttacked() {

        if (this.enemyState == this.enemyStates.TIRED) {
            this.enemyState = this.enemyStates.ATTACKING;
            this.stamina = this.baseStamina;
            this.attack();
        }
    }

    playerHasParried() {
        UsefulMethods.print("Parry");
        switch (this.enemyState) {
            case this.enemyStates.ATTACKING:                
                this.scene.player.HP--;
                break;
            case this.enemyStates.PARRY:
                this.scene.player.parrying = false;
                this.getParried();
                break;
            default:
                break;
        }
    }

    playerHasAttacked() {
        switch (this.enemyState) {
            case this.enemyStates.TIRED:
                this.getAttacked();
                UsefulMethods.print('Recibi ataque');

                if (this.hp == 0) {
                    // Las siguiente dos líneas agruparlas en el CombatController.
                    this.scene.combatHappening = false;
                    this.scene.player.canMove = true;
                    this.scene.cameraZoom = 0.9;
                    this.scene.cameras.main.setFollowOffset(0);
                    this.scene.cameras.main.zoomTo(this.scene.cameraZoom, 300, 'Sine.easeInOut');
                    this.scene.arrow.setAlpha(0);
                    this.die();
                }
                break;
            default:
                break;
        }
    }

    die() {
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

    }
}