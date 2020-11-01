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

    this.ended = false;
    this.isPlayable = false;

    this.combatHappening = false;
    this.currentEnemy;
    
    // #endregion

    this.load.image('Law', 'assets/test/Law.jpg');
    this.load.image('Floor', 'assets/game-elements/ground.png');
    this.load.image('Circle-UI', 'assets/test/circle-ui.png');
    this.load.image('Rana', 'assets/test/Rana1.png');
    this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  /**
   * Método que se ejecuta al comienzo del juego, cuandos se ha creado todo.
   */
  create() {
    // Se crea el objeto player en la escena.
    this.player = new Player({scene:this, x:UsefulMethods.RelativePosition(10, "x", this), y:UsefulMethods.RelativePosition(75, "y", this), texture:'Character', frame:4});
    this.player.create();

    //Creamos los enemigos
    this.createEnemies();

    this.testingText = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(90, "y", this), this.enemy.enemyState, { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 , color: 'white'});
    this.testingText2 = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(85, "y", this), "Energía: " + this.enemy.stamina, { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 , color: 'white'});
    this.testingText3 = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(80, "y", this), "Vida: " + this.enemy.hp, { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 , color: 'white'});
    this.coolDownText = this.add.text(UsefulMethods.RelativePosition(5, "x", this), UsefulMethods.RelativePosition(75, "y", this), "Estado del parry: se puede hacer.", { fontFamily: '"Roboto Condensed"',fontFamily: '"brush_font"', fontSize: 21 , color: 'white'});

    this.testingText.setScrollFactor(0);
    this.testingText2.setScrollFactor(0);
    this.testingText3.setScrollFactor(0);
    this.coolDownText.setScrollFactor(0);

    this.InitFloor();
    this.InitPlayer();
    this.InitColliders();
    this.InitMobileCircleUI();

    this.SetupCamera();

    this.ConfigureUI();
    this.inputManager = new InputManager(this);
    this.inputManager.create();
  }


  //Método para crear a los enemigos.
  createEnemies(){
    //Creación de enemigo 1
    this.enemy = new Enemy({scene:this, x:UsefulMethods.RelativePosition(50,"x", this), y:UsefulMethods.RelativePosition(75, "y", this), texture:'Rana', frame:0, attackTime:2, window: 1, stamina: 2, hp:2});
    this.enemy.create();

    this.enemy1Collision = this.physics.add.sprite(UsefulMethods.RelativePosition(40, "x", this), UsefulMethods.RelativePosition(75, "y", this), 'Rana', 4);
    this.enemy1Collision.setAlpha(0.2);

    this.enemy1Collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this);
    this.enemy1Collision.scaleY = this.enemy1Collision.scaleX;

    //Creación de enemigo 2
    this.enemy2 = new Enemy({scene:this, x:UsefulMethods.RelativePosition(95,"x", this), y:UsefulMethods.RelativePosition(75, "y", this), texture:'Rana', frame:0, attackTime:2, window: 1, stamina: 2, hp:2});
    this.enemy2.create();

    this.enemy2Collision = this.physics.add.sprite(UsefulMethods.RelativePosition(85, "x", this), UsefulMethods.RelativePosition(75, "y", this), 'Rana', 4);
    this.enemy2Collision.setAlpha(0.2);

    this.enemy2Collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this);
    this.enemy2Collision.scaleY = this.enemy2Collision.scaleX;

    //Creación de enemigo 3
    this.enemy3 = new Enemy({scene:this, x:UsefulMethods.RelativePosition(140,"x", this), y:UsefulMethods.RelativePosition(75, "y", this), texture:'Rana', frame:0, attackTime:2, window: 1, stamina: 2, hp:2});
    this.enemy3.create();

    this.enemy3Collision = this.physics.add.sprite(UsefulMethods.RelativePosition(130, "x", this), UsefulMethods.RelativePosition(75, "y", this), 'Rana', 4);
    this.enemy3Collision.setAlpha(0.2);

    this.enemy3Collision.displayWidth = UsefulMethods.RelativeScale(10, "x", this);
    this.enemy3Collision.scaleY = this.enemy3Collision.scaleX;
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
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    this.floor = this.physics.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
    this.floor.scaleX = UsefulMethods.RelativeScale(0.1, "x", this);
    this.floor.scaleY = this.floor.scaleX;

    this.floor1 = this.physics.add.sprite(UsefulMethods.RelativePosition(45, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    this.floor1.body.allowGravity = false;
    this.floor1.body.immovable = true;

    this.floor2 = this.physics.add.sprite(UsefulMethods.RelativePosition(90, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    this.floor2.body.allowGravity = false;
    this.floor2.body.immovable = true;

    this.floor3 = this.physics.add.sprite(UsefulMethods.RelativePosition(135, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    this.floor3.body.allowGravity = false;
    this.floor3.body.immovable = true;
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

    this.physics.add.collider(this.enemy, this.floor1);
    this.physics.add.collider(this.enemy1Collision, this.floor1);

    this.physics.add.collider(this.enemy2, this.floor2);
    this.physics.add.collider(this.enemy2Collision, this.floor2);

    this.physics.add.collider(this.enemy3Collision, this.floor3);
    this.physics.add.collider(this.enemy3, this.floor3);

    //Función que se ejecutará al chocar con el primer enemigo del nivel (hacer una por enemigo)
    var firstCombat = function(){
      this.player.canMove = false;
      this.combatHappening = true;
      this.currentEnemy = this.enemy;
      this.enemy.Attack();
      this.enemy1Collision.destroy();
    };

    //Función que se ejecutará al chocar con el segundo enemigo del nivel (hacer una por enemigo)
    var secondCombat = function(){
      this.player.canMove = false;
      this.combatHappening = true;
      this.currentEnemy = this.enemy2;
      this.enemy2.Attack();
      this.enemy2Collision.destroy();
    };

    //Función que se ejecutará al chocar con el tercer enemigo del nivel (hacer una por enemigo)
    var thirdCombat = function(){
      this.player.canMove = false;
      this.combatHappening = true;
      this.currentEnemy = this.enemy3;
      this.enemy3.Attack();
      this.enemy3Collision.destroy();
    };

    //Creamos un trigger entre el jugador y una zona cercana al primer enemigo
    this.physics.add.overlap(this.player, this.enemy1Collision, firstCombat, null, this);

    //Creamos un trigger entre el jugador y una zona cercana al segundo enemigo
    this.physics.add.overlap(this.player, this.enemy2Collision, secondCombat, null, this);

    //Creamos un trigger entre el jugador y una zona cercana al tercer enemigo
    this.physics.add.overlap(this.player, this.enemy3Collision, thirdCombat, null, this);
  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta) {

    

    //Si currentEnemy existe (lo hace en caso de estar en un combate) se actualizan los textos con sus datos para testear.
    if(this.currentEnemy != null){
      this.testingText.setText(this.currentEnemy.enemyState); 
      this.testingText2.setText("Energía: " + this.currentEnemy.stamina); 
      this.testingText3.setText("Vida: " + this.currentEnemy.hp); 

      this.coolDownText.setText("CanParry: " + this.player.canParry);
    }
    
    // Se actualiza en cada frame la posición de la UI con respecto a la cámara.
    this.UIContainer.x = this.cameras.main.worldView.x;
    this.UIContainer.y = this.cameras.main.worldView.y;
    // #region Teclas y movimiento
    this.player.update(delta);
  }

}