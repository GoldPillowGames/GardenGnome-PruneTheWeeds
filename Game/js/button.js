import UsefulMethods from '../js/useful-methods.js';

export default class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame, scale } = data;
        super(scene, UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        // #endregion

        // #region Variables
        this.touchableArea = scene.add.sprite(UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture);

        this.scaleX = UsefulMethods.RelativeScale(scale, "x", scene);
        
        this.buttonAnims = {
            SHRINK: 'shrink',
            MOVE_RIGHT: 'move right',
        }
        this.buttonAnim = this.buttonAnims.SHRINK;
        this.selected = false;
        this.originalPosX = x;
        this.scene = scene;
        this.pressed = false;
        // #endregion

        this.scene.add.existing(this);

        

        // No quiero físicas

        // this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
    }
    create() {
        //#region Variables y funciones de Phaser
        this.touchableArea.setInteractive();
        this.touchableArea.alpha = 0.1;
        this.touchableArea.scaleX = this.scaleX;
        this.touchableArea.scaleY = this.scaleX;

        this.setDepth(1990);
        this.alpha = 1;
        this.scaleY = this.scaleX;
        this.originalScale = this.scaleY;

        this.initButtons();
        
        //#endregion
    }

    initButtons(){
        var that = this;

        this.touchableArea.on('pointerdown', function(){
            if (that.pressed === false) {
                that.pressed = true;
                that.pointerDown();
                that.playPointerDownAnim(that);
            }
            
        });

        this.touchableArea.on('pointerup', function(){
            if (that.pressed === true) {
                that.pressed = false;
                that.pointerUp();
                if(!(this.scene.sys.game.device.os.android || this.scene.sys.game.device.os.iOS || this.scene.sys.game.device.os.iPad || this.scene.sys.game.device.os.iPhone)){
                    that.playPointerUpAnim(that);
                }else{
                    that.playPointerOutAnim(that);
                }
                //that.playPressedButton();
            }
        });  

        this.touchableArea.on('pointerover', function() {
            if(that.selected === false){
                that.selected = true;
                that.pointerOver();
                that.playPointerOverAnim(that);
            }
        });

        this.touchableArea.on('pointerout', function() {
            if(that.selected === true){
                that.pressed = false;
                that.selected = false;
                that.pointerOut();
                that.playPointerOutAnim(that);
            }
        });
    }

    //#region Pointer Over
    // Virtual Function
    pointerOver()
    {
        // Override
    }

    playPointerOverAnim(that){
        switch(that.buttonAnim){
            case that.buttonAnims.SHRINK:
                that.scene.tweens.add({
                    targets: that,
                    scaleX: that.originalScale - 0.05,
                    scaleY: that.originalScale - 0.05,
                    ease: 'Linear' ,
                    duration: 40,
                    yoyo: false,
                    repeat: 0
                });    
                break;
            case that.buttonAnims.MOVE_RIGHT:
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region Pointer Out
    // Virtual Function
    pointerOut(){
        // Override
    }

    playPointerOutAnim(that){
        switch(that.buttonAnim){
            case that.buttonAnims.SHRINK:
                that.scene.tweens.add({
                    targets: that,
                    scaleX: that.originalScale,
                    scaleY: that.originalScale,
                    ease: 'Linear',
                    duration: 40,
                    yoyo: false,
                    repeat: 0
                });    
                break;
            case that.buttonAnims.MOVE_RIGHT:
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region Pointer Down
    // Virtual Function
    pointerDown(){
        // Override
    }

    playPointerDownAnim(that){
        switch(that.buttonAnim){
            case that.buttonAnims.SHRINK:
                that.scene.tweens.add({
                    targets: that,
                    scaleX: that.originalScale - 0.08,
                    scaleY: that.originalScale - 0.08,
                    ease: 'Linear',
                    duration: 50,
                    yoyo: false,
                    repeat: 0
                });    
                break;
            case that.buttonAnims.MOVE_RIGHT:
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region Pointer Up
    // Virtual Function
    pointerUp(){
        // Override
    }

    playPointerUpAnim(that){
        switch(that.buttonAnim){
            case that.buttonAnims.SHRINK:
                that.scene.tweens.add({
                    targets: that,
                    scaleX: that.originalScale - 0.05,
                    scaleY: that.originalScale - 0.05,
                    ease: 'Linear',
                    duration: 50,
                    yoyo: false,
                    repeat: 0
                });    
                break;
            case that.buttonAnims.MOVE_RIGHT:
                break;
            default:
                break;
        }
    }
    //#endregion

    playPressedButton(){
        var that = this;
        this.scene.tweens.add({
            targets: this,
            y: UsefulMethods.RelativePosition(55, 'y', this.scene),
            ease: 'Power1',
            duration: 100,
            yoyo: false,
            repeat: 0,
            onStart: function () { 
                console.log('onStart'); console.log(arguments); 
            },
            onComplete: function () { 
                that.playHideButton();
            },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
    }

    playPressedButtonArray(buttonsArray){
        var that = this;
        this.scene.tweens.add({
            targets: this,
            y: UsefulMethods.RelativePosition(55, 'y', this.scene),
            ease: 'Power1',
            duration: 100,
            yoyo: false,
            repeat: 0,
            onStart: function () { 
                console.log('onStart'); console.log(arguments); 
            },
            onComplete: function () { 
                that.playHideButton(0, 300);
                buttonsArray.forEach(element => {
                    if(!(element === that))
                    {
                         element.playHideButton(0, 400);
                    }
                   
                });
            },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
    }

    playHideButton(delay, duration){
        this.scene.tweens.add({
            targets: this,
            y: UsefulMethods.RelativePosition(120, 'y', this.scene),
            ease: 'Sine.easeInOut',
            delay:delay,
            duration: duration,
            yoyo: false,
            repeat: 0,
        });
    }

    update(delta) {
        this.touchableArea.x = this.x;
        this.touchableArea.y = this.y;
    }
}