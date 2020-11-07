import UsefulMethods from '../js/useful-methods.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame } = data;
        super(scene, x, y, texture, frame);
        // #endregion

        // #region Variables
        this.playerStates = {
            STOPPED: 'stopped',
            WALKING: 'walking',
        }
        this.playerState = this.playerStates.STOPPED;
        this.velocity = 180;
        this.direction = 0;
        this.canMove = true;
        this.playerScale = 1;

        this.canParry = true;
        this.parryCooldown = 1;

        this.scene = scene;
        // #endregion

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
    }

    parryCooldownFunction() {
        this.canParry = false;
        this.scene.time.addEvent({ delay: this.parryCooldown * 1000, callback: this.canParryAgain, callbackScope: this, loop: false });
    }

    canParryAgain() {
        this.canParry = true;
    }

    createParryControls() {
        // Cuando se suelta el click izquierdo del ratón, el personaje hace parry o ataca.
        this.scene.input.on('pointermove', function (pointer) {
            console.log("Distancia recorrida en el parry: " + (new Phaser.Math.Vector2(pointer.x - this.scene.inputManager.initialMouseX, pointer.y - this.scene.inputManager.initialMouseY)).length());
            if (this.scene.combatHappening && this.scene.currentEnemy != null && this.scene.inputManager.movementPointerId === pointer.id &&
            this.canParry && pointer.x >= this.scene.inputManager.initialMouseX &&
            (new Phaser.Math.Vector2(pointer.x - this.scene.inputManager.initialMouseX, pointer.y - this.scene.inputManager.initialMouseY)).length() >= 40) {
                console.debug("En combate");
                this.scene.currentEnemy.playerHasParried();
            }

        }, this);

        this.scene.input.on('pointerdown', function (pointer) {
            if(this.scene.currentEnemy != null)
                this.scene.currentEnemy.playerHasAttacked();
        }, this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.scaleY = this.scaleX;
        this.playerScale = this.scaleX;

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
    update(delta) {
        if ((this.direction != 0) && this.playerState === this.playerStates.STOPPED && this.canMove) {
            this.anims.play('walk');
            this.playerState = this.playerStates.WALKING;
        } else if (this.playerState === this.playerStates.WALKING && this.direction === 0) {
            this.anims.play('stopped');
            this.playerState = this.playerStates.STOPPED;
        }

        if (!this.scene.inputManager.isMouseMoving) {
            if (this.canMove) {
                if (this.scene.inputManager.AButton.isDown) {
                    this.direction = -1;
                }
                else if (this.scene.inputManager.DButton.isDown) {
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

        // Volteo del sprite según dirección.
        if (this.direction < 0) {
            this.scaleX = -Math.abs(this.scaleX);
        }
        else if (this.direction > 0) {
            this.scaleX = Math.abs(this.scaleX);
        }


        // Se aplica la velocidad de movimiento al sprite
        var calculatedSpeed = this.canMove ? (this.direction * this.velocity) : 0;

        this.setVelocityX(calculatedSpeed);

    }
}