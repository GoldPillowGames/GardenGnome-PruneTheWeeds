import UsefulMethods from '../js/useful-methods.js';

export default class InputManager {
    constructor(scene) {
        this.scene = scene;

        this.DButton = this.scene.input.keyboard.addKey('D');
        this.AButton = this.scene.input.keyboard.addKey('A');
        this.WButton = this.scene.input.keyboard.addKey('W');

        this.rightButton = this.scene.input.keyboard.addKey('right');
        this.leftButton = this.scene.input.keyboard.addKey('left');
        this.upButton = this.scene.input.keyboard.addKey('up');
        this.downButton = this.scene.input.keyboard.addKey('down');
        this.spaceButton = this.scene.input.keyboard.addKey('space');

        this.isMouseMoving = false;
        this.movementPointerId = 0;
        this.initialMouseX = 0;
        this.initialMouseY = 0;
        this.maxMouseDistance = 125;
    }

    create() {
        this.scene.input.addPointer(2);

        if (this.isJoystickVisible()) {
            this.HandleMobileTouchMovement();
            this.InitMobileCircleUI();
        }
    }

    isJoystickVisible() {
        return this.scene.sys.game.device.os.android || this.scene.sys.game.device.os.iOS ||
            this.scene.sys.game.device.os.iPad || this.scene.sys.game.device.os.iPhone ||
            this.scene.debugMode;
    }

    /**
       * Configura la UI que únicamente será mostrada en móvil (pulsación sobre la pantalla)
       */
    InitMobileCircleUI() {
        this.circle_UI = this.scene.add.sprite(UsefulMethods.RelativePosition(0, "x", this.scene), UsefulMethods.RelativePosition(0, "y", this.scene), 'Circle-UI').setInteractive();
        this.circle_UI.alpha = 0;
        this.circle_UI.scaleX = UsefulMethods.RelativeScale(0.031, "x", this.scene);
        this.circle_UI_OriginalScale = this.circle_UI.scaleX;
        this.circle_UI_MinScale = UsefulMethods.RelativeScale(0.029, "x", this.scene);
        this.circle_UI.scaleY = this.circle_UI.scaleX;
        this.circle_UI.setDepth(10000);
        this.circle_UI.setScrollFactor(0);

        this.circle_UI_Base = this.scene.add.sprite(this.scene.width, this.scene.height, 'Circle-UI').setInteractive();
        this.circle_UI_Base.alpha = 0;
        this.circle_UI_Base.scaleX = UsefulMethods.RelativeScale(0.0023, "x", this.scene);
        this.circle_UI_Base_OriginalScale = this.circle_UI_Base.scaleX;
        this.circle_UI_Base_MinScale = UsefulMethods.RelativeScale(0.0019, "x", this.scene);
        this.circle_UI_Base.scaleY = this.circle_UI_Base.scaleX;
        this.circle_UI_Base.setDepth(11000);
        this.circle_UI_Base.setScrollFactor(0);
    }

    /**
       * Configura el movimiento del personaje mediante la pulsación sobre la pantalla
       * en dispositivos móviles
       */
    HandleMobileTouchMovement() {
        // Cuando el presiona el click izquierdo en el estado de caminar se
        // guarda la coordenada inicial del ratón en el eje x
        var that = this;
        this.scene.input.on('pointerdown', function (pointer) {
            if (that.isMouseMoving === false) {
                that.movementPointerId = pointer.id;
                that.isMouseMoving = true;
                that.initialMouseX = pointer.x;
                that.initialMouseY = pointer.y;
                that.circle_UI_Base.x = that.initialMouseX;
                that.circle_UI_Base.y = that.initialMouseY;
                that.circle_UI.x = Phaser.Math.Clamp(pointer.x, that.initialMouseX - 150, that.initialMouseX + 150);
                that.circle_UI.y = Phaser.Math.Clamp(pointer.y, that.initialMouseY - 150, that.initialMouseY + 150);
                this.scene.tweens.add({
                    targets: that.circle_UI,
                    alpha: 0.65,
                    scaleX: that.circle_UI_OriginalScale,
                    scaleY: that.circle_UI_OriginalScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
                this.scene.tweens.add({
                    targets: that.circle_UI_Base,
                    alpha: 0.65,
                    scaleX: that.circle_UI_Base_OriginalScale,
                    scaleY: that.circle_UI_Base_OriginalScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
            }
        });

        // Cuando se mantiene presionado el click izquierdo del ratón y
        // se mueve el ratón, se resta la posición anterior del ratón en el eje x
        // a la actual y en función del valor obtenido, el personaje se mueve en una u
        // otra dirección
        this.scene.input.on('pointermove', function (pointer) {
            // Comprobamos si el id del puntero es el mismo que inició el movimiento
            if (that.movementPointerId === pointer.id) {
                
                var module = UsefulMethods.vectorModule(pointer.x - that.initialMouseX, pointer.y - that.initialMouseY);
                //var module = Math.sqrt(Math.pow(pointer.x - this.initialMouseX, 2) + Math.pow(pointer.y - this.initialMouseY, 2));

                if(this.scene.combatHappening && this.scene.currentEnemy.enemyState == this.scene.currentEnemy.enemyStates.TIRED){
                    var xMax = 0;
                    var yMax = 0;
                }else{
                    var xMax = Math.abs((pointer.x - that.initialMouseX) / module) * that.maxMouseDistance;
                    var yMax = Math.abs((pointer.y - that.initialMouseY) / module) * that.maxMouseDistance;
                }

                that.circle_UI.x = Phaser.Math.Clamp(pointer.x, that.initialMouseX - xMax, that.initialMouseX + xMax);
                that.circle_UI.y = Phaser.Math.Clamp(pointer.y, that.initialMouseY - yMax, that.initialMouseY + yMax);
                //this.circle_UI.x = pointer.x;
                //this.circle_UI.y = pointer.y;
            }



        });

        // Cuando se suelta el click izquierdo del ratón, el personaje
        // detiene su movimiento horizontal
        this.scene.input.on('pointerup', function (pointer) {
            // Comprobamos si el id del puntero es el mismo que inició el movimiento
            if (that.movementPointerId === pointer.id) {
                that.isMouseMoving = false;
                //this.circle_UI.alpha = 0;
                this.scene.tweens.add({
                    targets: that.circle_UI,
                    alpha: 0,
                    scaleX: that.circle_UI_MinScale,
                    scaleY: that.circle_UI_MinScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
                this.scene.tweens.add({
                    targets: that.circle_UI_Base,
                    alpha: 0,
                    scaleX: that.circle_UI_Base_MinScale,
                    scaleY: that.circle_UI_Base_MinScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
            }

        });
    }

}