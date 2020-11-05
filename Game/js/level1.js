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

import UsefulMethods from './useful-methods.js';
import Enemy from './Enemy.js';
import Player from './player.js';
import InputManager from './input-manager.js';

//Escena para testeo de juego de plataformas
export default class level1 extends Phaser.Scene {
  //Constructor de la escena, con el identificador de la misma.
  constructor() {
    super('Level_1');
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

    this.combatHappening = false;
    this.currentEnemy;

    // #endregion

    this.load.image('Law', 'assets/test/Law.jpg');
    this.load.image('Floor', 'assets/game-elements/ground.png');
    this.load.image('Circle-UI', 'assets/test/circle-ui.png');
    this.load.image('Frog', 'assets/test/Rana1.png');

    this.load.image('BaseFloor1', 'assets/Level 1/suelo_base1.png');
    this.load.image('BaseSky1', 'assets/Level 1/cielo_base1.png');

    this.load.image('MetalFence', 'assets/Props/wood-fence.png');
    this.load.image('WoodFence', 'assets/Props/metal-fence.png');

    this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    // Se crea el objeto player en la escena.
    this.player = new Player({ scene: this, x: UsefulMethods.RelativePosition(10, "x", this), y: UsefulMethods.RelativePosition(75, "y", this), texture: 'Character', frame: 4 });
    this.player.create();

    this.inputManager = new InputManager(this);
    this.inputManager.create();

    //Creamos los enemigos
    this.createEnemies();

    this.testingText = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(90, "y", this), this.enemies[0].enemyState, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    this.testingText2 = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(85, "y", this), "Energía: " + this.enemies[0].stamina, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    this.testingText3 = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(80, "y", this), "Vida: " + this.enemies[0].hp, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    this.coolDownText = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(75, "y", this), "Estado del parry: se puede hacer.", { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });

    this.testingText.setScrollFactor(0);
    this.testingText2.setScrollFactor(0);
    this.testingText3.setScrollFactor(0);
    this.coolDownText.setScrollFactor(0);

    this.InitFloor();
    this.InitPlayer();
    this.InitColliders();

    this.SetupCamera();
  }


  //Método para crear a los enemigos.
  createEnemies() {
    this.enemies = [];

    this.enemies.push(new Enemy({
      scene: this, x: 50, y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 2
    }));

    this.enemies.push(new Enemy({
      scene: this, x: 95, y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 2
    }));

    this.enemies.push(new Enemy({
      scene: this, x: 140, y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 2
    }));

    this.enemies.forEach(element => { element.create(); });

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
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    this.sky = this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1', );
    this.sky.setDepth(-11);

    this.floor = this.physics.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4);
    this.floor.setDepth(-9);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
    this.floor.body.setOffset(0, 55);
    this.floor.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floor.scaleY = UsefulMethods.RelativeScale(0.11, 'y', this);

    this.fence = this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(68, "y", this), 'WoodFence');
    this.fence.setDepth(-10);

    // this.floor.scaleX = UsefulMethods.RelativeScale(0.1, "x", this);
    // this.floor.scaleY = this.floor.scaleX;

    // this.floor1 = this.physics.add.sprite(UsefulMethods.RelativePosition(45, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    // this.floor1.body.allowGravity = false;
    // this.floor1.body.immovable = true;

    // this.floor2 = this.physics.add.sprite(UsefulMethods.RelativePosition(90, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    // this.floor2.body.allowGravity = false;
    // this.floor2.body.immovable = true;

    // this.floor3 = this.physics.add.sprite(UsefulMethods.RelativePosition(135, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    // this.floor3.body.allowGravity = false;
    // this.floor3.body.immovable = true;
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
    this.physics.add.collider(this.player, this.floor1);
    this.physics.add.collider(this.player, this.floor2);
    this.physics.add.collider(this.player, this.floor3);

    // PROVISIONAL. Lo suyo sería:
    this.enemies.forEach(element => {
      this.physics.add.collider(element, this.floor);
      this.physics.add.collider(element.collision, this.floor);
    });

    // this.physics.add.collider(this.enemies[0], this.floor1);
    // this.physics.add.collider(this.enemies[0].collision, this.floor1);

    // this.physics.add.collider(this.enemies[1], this.floor2);
    // this.physics.add.collider(this.enemies[1].collision, this.floor2);

    // this.physics.add.collider(this.enemies[2], this.floor3);
    // this.physics.add.collider(this.enemies[2].collision, this.floor3);

    var that = this;

    this.enemies.forEach(element => {
      var combat = function () {
        that.player.canMove = false;
        that.combatHappening = true;
        that.currentEnemy = element;
        element.attack();
        element.collision.destroy();
      };
      that.physics.add.overlap(that.player, element.collision, combat, null, that);
    });
  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta) {
    //Si currentEnemy existe (lo hace en caso de estar en un combate) se actualizan los textos con sus datos para testear.
    if (this.currentEnemy != null) {
      this.testingText.setText(this.currentEnemy.enemyState);
      this.testingText2.setText("Energía: " + this.currentEnemy.stamina);
      this.testingText3.setText("Vida: " + this.currentEnemy.hp);

      this.coolDownText.setText("CanParry: " + this.player.canParry);
    }
    // #region Teclas y movimiento
    this.player.update(delta);
  }

}