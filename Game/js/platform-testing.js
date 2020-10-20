/**
 * Codigo desarrollado por:
 * -
 * Germán López Gutiérrez
 * Ignacio Atance Loras
 * Fernando Martín Espina
 * Jorge Sánchez Sánchez
 * Elvira Gutiérrez Bartolomé
 * -
 */

import UsefulMethods from '../js/useful-methods.js';
import Player from './player.js';

//Escena para testeo de juego de plataformas
export default class PlatformTesting extends Phaser.Scene {
  //Constructor de la escena, con el identificador de la misma.
  constructor() {
    super('platformTesting');
  }


  /**
   * Método que se ejecuta ANTES de cargar la página
   * En el se inicializan los sprites y otros elementos
   * como la barra de carga
   */
  preload() {

    // #region VARIABLES
    this.debugMode = true;

    //this.sys.game.config.width = 100;

    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    this.xSpeed = 180; // 280
    this.ended = false;
    this.isPlayable = false;
    this.pointerOver = true;
    this.fallingP1 = false;

    // Movimiento con ratón o pulsación
    this.isMouseMoving = false;
    this.initialMouseX = 0;
    this.initialMouseY = 0;
    this.maxMouseDistance = 125;

    this.DButton = this.input.keyboard.addKey('D');
    this.AButton = this.input.keyboard.addKey('A');
    this.WButton = this.input.keyboard.addKey('W');

    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton = this.input.keyboard.addKey('left');
    this.upButton = this.input.keyboard.addKey('space');
    // #endregion

    this.load.image('Law', 'assets/test/Law.jpg');
    this.load.image('Floor', 'assets/game-elements/ground.png');
    this.load.image('Circle-UI', 'assets/test/circle-ui.png');
    this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  /**
   * Método que se ejecuta al comienzo del juego, cuandos se ha creado todo.
   */
  create() {
    this.movementPointerId = 0;
    this.input.addPointer(2);
    this.velocity = 0;
    
    // Se crea el objeto player en la escena.
    this.player = new Player({scene:this, x:UsefulMethods.RelativePosition(10, "x", this), y:UsefulMethods.RelativePosition(75, "y", this), texture:'Character', frame:4});
    this.player.create();

    this.InitFloor();
    this.InitPlayer();
    this.InitColliders();
    this.InitMobileCircleUI();

    if (this.debugMode) {
      this.HandleMobileTouchMovement();
    }
    else {
      if (this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone) {
        this.HandleMobileTouchMovement();
      }
    }

    this.SetupCamera();

    this.ConfigureUI();
  }

  ConfigureUI() {
    this.UIContainer = this.add.container(this.cameras.main.worldView.x, this.cameras.main.worldView.y);
    this.UIContainer.add(this.circle_UI);
    this.UIContainer.add(this.circle_UI_Base);
  }

  /**
   * Configura la cámara (seguimiento, zoom, etc)
   */
  SetupCamera() {
    // Ambos zooms sirven
    // this.cameras.main.setZoom(1.3);
    // this.cameras.main.zoom = 0.5;

    // La cámara sigue al jugador
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
  }

  /**
   * Configura la UI que únicamente será mostrada en móvil (pulsación sobre la pantalla)
   */
  InitMobileCircleUI() {
    this.circle_UI = this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(0, "y", this), 'Circle-UI').setInteractive();
    this.circle_UI.alpha = 0;
    this.circle_UI.scaleX = UsefulMethods.RelativeScale(0.031, "x", this);
    this.circle_UI_OriginalScale = this.circle_UI.scaleX;
    this.circle_UI_MinScale = UsefulMethods.RelativeScale(0.029, "x", this);
    this.circle_UI.scaleY = this.circle_UI.scaleX;
    this.circle_UI.setDepth(10000);

    this.circle_UI_Base = this.add.sprite(this.width, this.height, 'Circle-UI').setInteractive();
    this.circle_UI_Base.alpha = 0;
    this.circle_UI_Base.scaleX = UsefulMethods.RelativeScale(0.0023, "x", this);
    this.circle_UI_Base_OriginalScale = this.circle_UI_Base.scaleX;
    this.circle_UI_Base_MinScale = UsefulMethods.RelativeScale(0.0019, "x", this);
    this.circle_UI_Base.scaleY = this.circle_UI_Base.scaleX;
    this.circle_UI_Base.setDepth(11000);
  }

  /**
   * Configura el movimiento del personaje mediante la pulsación sobre la pantalla
   * en dispositivos móviles
   */
  HandleMobileTouchMovement() {
    // Cuando el presiona el click izquierdo en el estado de caminar se
    // guarda la coordenada inicial del ratón en el eje x
    this.input.on('pointerdown', function (pointer) {
      if (this.isMouseMoving === false) {
        this.movementPointerId = pointer.id;
        this.isMouseMoving = true;
        this.initialMouseX = pointer.x;
        this.initialMouseY = pointer.y;
        this.circle_UI_Base.x = this.initialMouseX;
        this.circle_UI_Base.y = this.initialMouseY;
        this.circle_UI.x = Phaser.Math.Clamp(pointer.x, this.initialMouseX - 150, this.initialMouseX + 150);
        this.circle_UI.y = Phaser.Math.Clamp(pointer.y, this.initialMouseY - 150, this.initialMouseY + 150);
        this.tweens.add({
          targets: this.circle_UI,
          alpha: 0.65,
          scaleX: this.circle_UI_OriginalScale,
          scaleY: this.circle_UI_OriginalScale,
          ease: 'Linear',
          duration: 80,
          yoyo: false,
          repeat: 0
        });
        this.tweens.add({
          targets: this.circle_UI_Base,
          alpha: 0.65,
          scaleX: this.circle_UI_Base_OriginalScale,
          scaleY: this.circle_UI_Base_OriginalScale,
          ease: 'Linear',
          duration: 80,
          yoyo: false,
          repeat: 0
        });
      }
    }, this);

    // Cuando se mantiene presionado el click izquierdo del ratón y
    // se mueve el ratón, se resta la posición anterior del ratón en el eje x
    // a la actual y en función del valor obtenido, el personaje se mueve en una u
    // otra dirección
    this.input.on('pointermove', function (pointer) {
      // Comprobamos si el id del puntero es el mismo que inició el movimiento
      if (this.movementPointerId === pointer.id) {
        var module = UsefulMethods.vectorModule(pointer.x - this.initialMouseX, pointer.y - this.initialMouseY);
        //var module = Math.sqrt(Math.pow(pointer.x - this.initialMouseX, 2) + Math.pow(pointer.y - this.initialMouseY, 2));
        var xMax = Math.abs((pointer.x - this.initialMouseX) / module) * this.maxMouseDistance;
        var yMax = Math.abs((pointer.y - this.initialMouseY) / module) * this.maxMouseDistance;

        this.circle_UI.x = Phaser.Math.Clamp(pointer.x, this.initialMouseX - xMax, this.initialMouseX + xMax);
        this.circle_UI.y = Phaser.Math.Clamp(pointer.y, this.initialMouseY - yMax, this.initialMouseY + yMax);
        //this.circle_UI.x = pointer.x;
        //this.circle_UI.y = pointer.y;
      }
    }, this);

    // Cuando se suelta el click izquierdo del ratón, el personaje
    // detiene su movimiento horizontal
    this.input.on('pointerup', function (pointer) {
      // Comprobamos si el id del puntero es el mismo que inició el movimiento
      if (this.movementPointerId === pointer.id) {
        this.isMouseMoving = false;
        //this.circle_UI.alpha = 0;
        this.tweens.add({
          targets: this.circle_UI,
          alpha: 0,
          scaleX: this.circle_UI_MinScale,
          scaleY: this.circle_UI_MinScale,
          ease: 'Linear',
          duration: 80,
          yoyo: false,
          repeat: 0
        });
        this.tweens.add({
          targets: this.circle_UI_Base,
          alpha: 0,
          scaleX: this.circle_UI_Base_MinScale,
          scaleY: this.circle_UI_Base_MinScale,
          ease: 'Linear',
          duration: 80,
          yoyo: false,
          repeat: 0
        });
      }
    }, this);
  }

  /**
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    this.floor = this.physics.add.sprite(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(90, "y", this), 'Floor', 4);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
  }

  /**
   * Configura al jugador y su representación en pantalla
   */
  InitPlayer() {
// MOVER A SCENE LOADING
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('Character', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'stopped',
      frames: [{ key: 'Character', frame: 2 }],
      frameRate: 4,
      repeat: -1
    });
  }

  /**
   * Inicializa la relación entre los distintos elementos que
   * pueden colisionar entre sí
   */
  InitColliders() {
    this.walls = this.physics.add.staticGroup();
    this.wall_left = this.walls.create(-25, this.height / 2, 'wall');
    this.wall_left.setAlpha(0);
    this.wall_right = this.walls.create(825, this.height / 2, 'wall');
    this.wall_right.setAlpha(0);
    this.physics.add.collider(this.player, this.floor);
  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta) {

    // Se actualiza en cada frame la posición de la UI con respecto a la cámara.
    this.UIContainer.x = this.cameras.main.worldView.x;
    this.UIContainer.y = this.cameras.main.worldView.y;
    // #region Teclas y movimiento
    this.player.update(delta);
  }

}