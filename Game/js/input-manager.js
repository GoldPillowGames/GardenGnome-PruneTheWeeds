import UsefulMethods from '../js/useful-methods.js';

export default class InputManager {
    constructor(scene) {
        this.scene = scene;

        this.DButton = this.scene.input.keyboard.addKey('D');
        this.AButton = this.scene.input.keyboard.addKey('A');
        this.WButton = this.scene.input.keyboard.addKey('W');
        this.rightButton = this.scene.input.keyboard.addKey('right');
        this.leftButton = this.scene.input.keyboard.addKey('left');
        this.upButton = this.scene.input.keyboard.addKey('space');

        this.isMouseMoving = false;
        this.movementPointerId = 0;
        this.initialMouseX = 0;
        this.initialMouseY = 0;
        this.maxMouseDistance = 125;this.patata = "patataText";
    }

    create() {
        this.scene.input.addPointer(2);

        if (this.isJoystickVisible()) {
            console.log("Controles");
            this.HandleMobileTouchMovement();
        }
    }

    isJoystickVisible() {
        return this.scene.sys.game.device.os.android || this.scene.sys.game.device.os.iOS ||
            this.scene.sys.game.device.os.iPad || this.scene.sys.game.device.os.iPhone ||
            this.scene.debugMode;
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
                this.scene.circle_UI_Base.x = that.initialMouseX;
                this.scene.circle_UI_Base.y = that.initialMouseY;
                this.scene.circle_UI.x = Phaser.Math.Clamp(pointer.x, that.initialMouseX - 150, that.initialMouseX + 150);
                this.scene.circle_UI.y = Phaser.Math.Clamp(pointer.y, that.initialMouseY - 150, that.initialMouseY + 150);
                this.scene.tweens.add({
                    targets: this.scene.circle_UI,
                    alpha: 0.65,
                    scaleX: this.scene.circle_UI_OriginalScale,
                    scaleY: this.scene.circle_UI_OriginalScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
                this.scene.tweens.add({
                    targets: this.scene.circle_UI_Base,
                    alpha: 0.65,
                    scaleX: this.scene.circle_UI_Base_OriginalScale,
                    scaleY: this.scene.circle_UI_Base_OriginalScale,
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
                var xMax = Math.abs((pointer.x - that.initialMouseX) / module) * that.maxMouseDistance;
                var yMax = Math.abs((pointer.y - that.initialMouseY) / module) * that.maxMouseDistance;

                this.scene.circle_UI.x = Phaser.Math.Clamp(pointer.x, that.initialMouseX - xMax, that.initialMouseX + xMax);
                this.scene.circle_UI.y = Phaser.Math.Clamp(pointer.y, that.initialMouseY - yMax, that.initialMouseY + yMax);
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
                    targets: this.scene.circle_UI,
                    alpha: 0,
                    scaleX: this.scene.circle_UI_MinScale,
                    scaleY: this.scene.circle_UI_MinScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
                this.scene.tweens.add({
                    targets: this.scene.circle_UI_Base,
                    alpha: 0,
                    scaleX: this.scene.circle_UI_Base_MinScale,
                    scaleY: this.scene.circle_UI_Base_MinScale,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
            }

        });
    }

}