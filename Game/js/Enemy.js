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
        // #endregion
        this.beenParried = false;
        this.collision = this.scene.physics.add.sprite(x - UsefulMethods.RelativePosition(10, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        this.collision.setAlpha(0.2);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(35, "x", this.scene);
        this.scaleY = this.scaleX;
        this.enemyScale = this.scaleX;

        this.anims.play(this.idleAnimation);

        this.collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.collision.scaleY = this.collision.scaleX;

        

        //this.anims.play('CarnivoreFlowerIdle');
    }

    createBars(){

        //Fondo negro de las barras que sean 2 rectangulos en vez de uno

        this.healthBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) - this.scene.healtBarHeight * 1.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xff5e5e);
        this.healthBar.setDepth(5);

        this.healthBarBackground = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2 - this.scene.healthBarWidht * 0.035, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) - this.scene.healtBarHeight * 1.28 , this.scene.healthBarWidht * 1.07, this.scene.healtBarHeight + this.scene.healthBarWidht * 0.07, 0x0c0c0c);
        this.healthBarBackground.setOrigin(0);
        this.healthBarBackground.setDepth(3);

        this.whiteHealthBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) - this.scene.healtBarHeight * 1.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xFFFFFF);
        this.whiteHealthBar.setOrigin(0);
        this.whiteHealthBar.setDepth(4);

        this.staminaBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) + this.scene.healtBarHeight * 0.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0x70ff70);
        this.staminaBar.setDepth(5);

        this.staminaBarBackground = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2 - this.scene.healthBarWidht * 0.035, this.y - UsefulMethods.RelativePosition(20, "y", this.scene), this.scene.healthBarWidht * 1.07, this.scene.healtBarHeight + this.scene.healthBarWidht * 0.035, 0x0c0c0c);
        this.staminaBarBackground.setOrigin(0);
        this.staminaBarBackground.setDepth(3);

        this.healthBar.setOrigin(0);
        this.staminaBar.setOrigin(0);

        this.whiteStaminaBar = this.scene.add.rectangle(this.x - this.scene.healthBarWidht/2, this.y - UsefulMethods.RelativePosition(20, "y", this.scene) + this.scene.healtBarHeight * 0.07, this.scene.healthBarWidht, this.scene.healtBarHeight, 0xFFFFFF);
        this.whiteStaminaBar.setOrigin(0);
        this.whiteStaminaBar.setDepth(4);
    }

    waiting(){
        this.scene.arrow.setAlpha(0);
        this.anims.play(this.idleAnimation);
        UsefulMethods.print("waiting");
        if(this.scene != null)
            this.scene.time.addEvent({ delay: (Math.random() * 0.75 + 1.5) * 1000, callback: this.attack, callbackScope: this, loop: false });
    }


    getParried() {
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
        if (this.enemyState == this.enemyStates.PARRY) {

            if(!this.beenParried){
                this.scene.player.HP--;
                this.scene.healthBar.scaleX = (this.scene.player.HP/this.scene.player.maxHP);
            }
            this.enemyState = this.enemyStates.ATTACKING;
            this.waiting();
        }
    }

    beingTired() {
        this.anims.play(this.idleAnimation);
        UsefulMethods.print('tired');
        this.scene.time.addEvent({ delay: 1000, callback: this.notGettingAttacked, callbackScope: this, loop: false });
    }

    attack() {
        this.beenParried = false;

        UsefulMethods.print('attack');
        if (this.scene != null){
            this.anims.play(this.attackAnimation);
            this.scene.arrow.setAlpha(0);
            
            this.scene.arrow.x = (this.x + this.scene.player.x) / 2;
            //this.scene.arrow.y = this.y - UsefulMethods.RelativePosition(15, "y", this.scene);
            this.scene.arrow.y = this.y + UsefulMethods.RelativePosition(25,"y", this.scene);
            this.scene.time.addEvent({ delay: this.attackTime * 1000, callback: this.goParry, callbackScope: this, loop: false });
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
            UsefulMethods.print("From tired to attack");
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
                if(!this.beenParried){
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
        this.whiteHealthBar.scaleX = UsefulMethods.lerp(this.whiteHealthBar.scaleX, this.healthBar.scaleX, 0.15);
        this.whiteStaminaBar.scaleX = UsefulMethods.lerp(this.whiteStaminaBar.scaleX, this.staminaBar.scaleX, 0.15);
    }
}