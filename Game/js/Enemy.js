import UsefulMethods from './useful-methods.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, attackTime, window, stamina, hp, idleAnimation, attackAnimation } = data;
        super(scene, x, y, texture, frame);
        // #endregion

        // #region Variables
        this.enemyStates = {
            ATTACKING: 'attacking',
            PARRY: 'parry',
            TIRED: 'tired'
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
        // #endregion

        this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(10, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
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

    createBars(){
        this.healthBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) + 25, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xff5e5e);
        this.staminaBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene), this.scene.healthBarWidht, this.scene.healtBarHeight, 0x70ff70);
        this.healthBar.setOrigin(0);
        this.staminaBar.setOrigin(0);
    }

    getParried() {
        this.stamina -= 1;
        this.staminaBar.scaleX = this.stamina / this.baseStamina;
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
            this.scene.player.HP--;
            this.scene.healthBar.scaleX = (this.scene.player.HP/this.scene.player.maxHP);
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
            
            this.scene.arrow.x = (this.x + this.scene.player.x) / 2;
            //this.scene.arrow.y = this.y - UsefulMethods.RelativePosition(15, "y", this.scene);
            this.scene.arrow.y = this.y;
            this.stopAttacking = this.scene.time.addEvent({ delay: this.attackTime * 1000, callback: this.goParry, callbackScope: this, loop: false });
        }
            
    }

    goParry() {
        this.scene.arrow.setAlpha(1);

        if(!this.scene.hardMode){
            var random = Math.random() < 0.5 ? -1 : 1;
        }else{
            var random = Math.random();


            if(random<0.25)
                random = 0;
            else if(random >= 0.25 && random<0.5)
                 random = -1;
            else if(random >= 0.5 && random< 0.75)
                random = 1;
            else if(random >=0.75)
                random = 2;           
        }
        

        this.scene.arrow.angle = 90 * random;
        UsefulMethods.print('parry');
        this.enemyState = this.enemyStates.PARRY;
        this.stopBeingParried = this.scene.time.addEvent({ delay: this.window * 1000, callback: this.notGetParried, callbackScope: this, loop: false });
    }

    getAttacked() {
        this.hp -= 1;
        this.healthBar.scaleX = this.hp / this.maxHP;
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
            this.staminaBar.scaleX = 1;
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
        this.staminaBar.destroy();
        this.healthBar.destroy();
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