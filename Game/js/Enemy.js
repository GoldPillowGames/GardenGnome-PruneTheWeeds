import UsefulMethods from './useful-methods.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, attackTime, window, stamina, hp} = data;
        super(scene, x, y, texture, frame, attackTime, window, stamina, hp);
        // #endregion

        // #region Variables
        this.enemyStates = {
            ATTACKING: 'attacking',
            PARRY: 'parry',
            TIRED: 'tired'
        }
        this.enemyState = this.enemyStates.ATTACKING;
        this.enemyScale = 1;

        this.scene = scene;
        this.attackTime = attackTime;
        this.window = window;
        this.baseStamina = stamina;
        this.stamina = stamina;
        this.hp = hp;
        // #endregion

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }
    create() {
        this.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.scaleY = this.scaleX;
        this.enemyScale = this.scaleX;

        /*this.scene.input.on('pointerup', function (pointer) {
            if (this.scene.movementPointerId === pointer.id) {
                this.setVelocityX(0);
            }
        });*/       
        this.Attack();
    }

    GetParried(){
        this.stamina -= 1;
        if(this.stamina == 0){
            this.enemyState = this.enemyStates.TIRED;
        }
        else{
            this.enemyState = this.enemyStates.ATTACKING;
            this.Attack();
        }
        
    }

    NotGetParried(){
        if(this.enemyState == this.enemyStates.PARRY){
            this.enemyState = this.enemyStates.ATTACKING;
        }    
    }

    BeingTired(){
        this.BackAttack = this.scene.get("platformTesting").time.addEvent({delay: this.attackTime, callback: this.NotGettingAttacked, callbackScope:this, loop:false});
    }

    Attack(){
        this.stopAttacking = this.scene.get("platformTesting").time.addEvent({delay: this.attackTime, callback: this.GoParry, callbackScope:this, loop:false});
    }

    GoParry(){
        this.enemyState = this.enemyStates.PARRY;
        this.stopBeingParried = this.scene.get("platformTesting").time.addEvent({delay: this.attackTime, callback: this.NotGetParried, callbackScope:this, loop:false});
    }

    getAttacked(){
        hp -= 1;
        if(hp == 0){
            die();
        }else{
            this.stamina = this.baseStamina;
            this.enemyState = this.enemyStates.ATTACKING;
        }
    }

    NotGettingAttacked(){

        if(this.enemyState == this.enemyStates.TIRED){
            this.enemyState = this.enemyStates.ATTACKING;
            this.stamina = this.baseStamina;
            this.Attack();
        }
    }

    update(delta) {
        
    }
}