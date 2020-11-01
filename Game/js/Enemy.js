import UsefulMethods from './useful-methods.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, attackTime, window, stamina, hp} = data;
        super(scene, x, y, texture, frame);
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
        //this.setCollideWorldBounds(true);
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
        //this.Attack();
    }

    GetParried(){
        this.stamina -= 1;
        if(this.stamina == 0){
            this.enemyState = this.enemyStates.TIRED;
            this.BeingTired();
        }
        else{
            this.enemyState = this.enemyStates.ATTACKING;
            this.Attack();
        }
        
    }

    NotGetParried(){
        if(this.enemyState == this.enemyStates.PARRY){
            this.enemyState = this.enemyStates.ATTACKING;
            this.Attack();
        }    
    }

    BeingTired(){
        console.log('tired');
        this.BackAttack = this.scene.time.addEvent({delay: this.window*1000, callback: this.NotGettingAttacked, callbackScope:this, loop:false});
    }

    Attack(){
        console.log('attack');
        if(this.scene != null)
            this.stopAttacking = this.scene.time.addEvent({delay: this.attackTime*1000, callback: this.GoParry, callbackScope:this, loop:false});
    }

    GoParry(){
        console.log('parry');
        this.enemyState = this.enemyStates.PARRY;
        this.stopBeingParried = this.scene.scene.get("platformTesting").time.addEvent({delay: this.window*1000, callback: this.NotGetParried, callbackScope:this, loop:false});
    }

    getAttacked(){
        
        this.hp -= 1;       
        if(this.hp != 0){
            this.stamina = this.baseStamina;
            this.enemyState = this.enemyStates.ATTACKING;
            this.Attack();
        }
    }

    NotGettingAttacked(){

        if(this.enemyState == this.enemyStates.TIRED){
            this.enemyState = this.enemyStates.ATTACKING;
            this.stamina = this.baseStamina;
            this.Attack();
        }
    }

    die(){
        this.destroy();
    }

    update(delta) {
        
    }
}