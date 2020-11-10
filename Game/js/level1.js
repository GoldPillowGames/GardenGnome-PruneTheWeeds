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
import UIContainer from './ui-container.js';

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

    this.cameraZoom = 0.9;

    this.cameraZoomInCombat = 1.1;
    this.cameraOffsetInCombat = 100;

    this.combatHappening = false;
    this.currentEnemy;

    // #endregion

    this.load.image('Law', 'assets/test/Law.jpg');
    this.load.image('Floor', 'assets/game-elements/ground.png');
    this.load.image('Circle-UI', 'assets/test/circle-ui.png');
    this.load.image('Frog', 'assets/test/Rana1.png');

    this.load.image('BaseFloor1', 'assets/Level 1/sueloTileado.png');
    this.load.image('BaseSky1', 'assets/Level 1/cielo_base2.png');

    this.load.image('MetalFence', 'assets/Props/metal_fence.png');
    this.load.image('WoodFence', 'assets/Props/wood_fence.png');
    this.load.image('Grass', 'assets/Props/grass.png');

    this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('CarnivoreFlower' , 'assets/enemies/texture.png',{
      frameWidth: 550,
      frameHeight: 660
    });
  }

  create() {
    // Se crea el objeto player en la escena.
    this.player = new Player({ scene: this, x: UsefulMethods.RelativePosition(10, "x", this), y: UsefulMethods.RelativePosition(75, "y", this), texture: 'Character', frame: 4 , HP: 5});
    this.player.create();

    this.inputManager = new InputManager(this);
    this.inputManager.create();
    this.SetupCamera();
    this.uiContainer = new UIContainer({ scene: this, x: this.width / 2, y: this.height / 2});
    this.uiContainer.create();

    //Creamos los enemigos
    this.createEnemies();

    this.testingText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(25, "y", this), this.enemies[0].enemyState, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText.setOrigin(0.5, 0,5);
    this.testingText2 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(30, "y", this), "Energía: " + this.enemies[0].stamina, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText2.setOrigin(0.5, 0,5);
    this.testingText3 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(35, "y", this), "Vida: " + this.enemies[0].hp, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText3.setOrigin(0.5, 0,5);
    this.coolDownText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(40, "y", this), "Estado del parry: se puede hacer.", { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.coolDownText.setOrigin(0.5, 0,5);
    this.playerHPText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(-45, "y", this), "Vidas restantes: " + this.player.HP, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'black' });;
    //this.playerHPText.setOrigin(0.5, 0,5);

    /*this.testingText.setScrollFactor(0);
    this.testingText2.setScrollFactor(0);
    this.testingText3.setScrollFactor(0);
    this.coolDownText.setScrollFactor(0);
    this.playerHPText.setScrollFactor(0);*/

    this.uiContainer.add(this.testingText);
    this.uiContainer.add(this.testingText2);
    this.uiContainer.add(this.testingText3);
    this.uiContainer.add(this.coolDownText);
    this.uiContainer.add(this.playerHPText);

    this.InitFloor();
    this.createFences();
    this.createRandomSprites('Grass', 200, -7, -40, 14, 20, 102, 103.3);
    this.createRandomSprites('Grass', 200, 7, -30, 14, 20, 103.3, 111);
    this.InitPlayer();
    this.InitColliders();
    
  }

  createFences(){
    var initialPosition = -40;
    var fence = this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence');
    fence.scaleX = UsefulMethods.RelativeScale(0.065, "x", this);
    fence.scaleY = fence.scaleX;
    fence.setDepth(-8);

    var numberOfFences = 20;
    
    for(var i = 0; i < numberOfFences; i++)
    {
      initialPosition += 12;
      fence = this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence');
      fence.scaleX = UsefulMethods.RelativeScale(0.065, "x", this);
      fence.scaleY = fence.scaleX;
      fence.setDepth(-8);
    }
  }

  createRandomSprites(sprite, maxDistance, depth, initX, minX, maxX, minY, maxY) {
    var nextSpritePositionX = initX;
    var nextSpritePositionY = minY;

    while(nextSpritePositionX < maxDistance)
    {
      var object = this.add.sprite(
        UsefulMethods.RelativePosition(nextSpritePositionX, "x", this),
        UsefulMethods.RelativePosition(nextSpritePositionY, "y", this), sprite, 4).setDepth(depth);
      

      object.scaleX = UsefulMethods.RelativeScale(0.04, "x", this);
      object.scaleY = object.scaleX;
      nextSpritePositionX = nextSpritePositionX + (Math.random() * (maxX - minX) + minX);
      nextSpritePositionY = (Math.random() * (maxY - minY) + minY);
    }
  }


  //Método para crear a los enemigos.
  createEnemies() {
    this.enemies = [];

    this.enemies.push(new Enemy({
      scene: this, x: 50, y: 75,
      texture: 'CarnivoreFlower', frame: 0, attackTime: 2, window: 1, stamina: 1, hp: 1, idleAnimation: 'CarnivoreFlowerIdle', attackAnimation:'CarnivoreFlowerAttack'
    }));

    this.anims.create({
      key: 'CarnivoreFlowerIdle',
      frames: this.anims.generateFrameNumbers('CarnivoreFlower', { start: 0, end: 8 }),
      frameRate: 6,
      repeat: -1
    });

    

    this.enemies.push(new Enemy({
      scene: this, x: 95, y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 10
    }));

    this.enemies.push(new Enemy({
      scene: this, x: 140, y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 10
    }));

    this.enemies.forEach(element => { element.create(); });

  }

  /**
   * Configura la cámara (seguimiento, zoom, etc)
   */
  SetupCamera() {
    // Ambos zooms sirven
    // this.cameras.main.zoom = 0.5;
    this.cameras.main.zoomTo(this.cameraZoom, 300, 'Sine.easeInOut');
    // La cámara sigue al jugador
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
  }


  RepeatElement(element, distance, times, yCoord, depth){
    for(var i = 0; i < times; i++){
      this.repeatedElement = this.add.sprite(0 + distance*i, UsefulMethods.RelativePosition(yCoord, "y", this), element, );
      this.repeatedElement.setDepth(depth);
    }
  }

  /**
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    var floorDistance = 2289;

    this.sky = this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1', );
    this.sky.setDepth(-11);

    this.RepeatElement('BaseSky1', this.sky.width, 5, 105, -11);

    this.floor = this.physics.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4);
    this.floor.setDepth(-9);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
    this.floor.body.setOffset(0, 55);
    this.floor.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floor.scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
    UsefulMethods.print("Ancho" + this.floor.width);

    this.floor1 = this.physics.add.sprite(this.floor.x + this.floor.width*this.floor.scaleX, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4);
    this.floor1.setDepth(-9);
    this.floor1.body.allowGravity = false;
    this.floor1.body.immovable = true;
    this.floor1.body.setOffset(0, 55);
    this.floor1.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floor1.scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

    this.floor2 = this.physics.add.sprite(this.floor.x + this.floor.width*2, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4);
    this.floor2.setDepth(-9);
    this.floor2.body.allowGravity = false;
    this.floor2.body.immovable = true;
    this.floor2.body.setOffset(0, 55);
    this.floor2.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floor2.scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

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

      this.physics.add.collider(element, this.floor1);
      this.physics.add.collider(element.collision, this.floor1);

      this.physics.add.collider(element, this.floor2);
      this.physics.add.collider(element.collision, this.floor2);
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
        
        that.cameras.main.setFollowOffset(-that.cameraOffsetInCombat);
        that.cameras.main.zoomTo(that.cameraZoomInCombat, 300, 'Sine.easeInOut');

        //that.resizeText();

      };
      that.physics.add.overlap(that.player, element.collision, combat, null, that);
    });
  }

  resizeText(){
    this.testingText.scaleX = this.testingText.scaleX / this.cameraZoomInCombat;
    this.testingText.scaleY = this.testingText.scaleY / this.cameraZoomInCombat;
    this.testingText.x = this.testingText.x / this.cameraZoomInCombat + this.cameraOffsetInCombat;
    this.testingText.y = this.testingText.y / this.cameraZoomInCombat;

    //Se sigue esta formula para cambiar el tamaño y la posición de la interfaz cuando se cambia el zoom de la camara

  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta) {
    //Si currentEnemy existe (lo hace en caso de estar en un combate) se actualizan los textos con sus datos para testear.
    if (this.currentEnemy != null) {
      this.testingText.setText(this.currentEnemy.enemyState);
      this.testingText2.setText("Energia: " + this.currentEnemy.stamina);
      this.testingText3.setText("Vida: " + this.currentEnemy.hp);
      this.playerHPText.setText("Vidas restantes: " + this.player.HP);
      this.coolDownText.setText("CanParry: " + this.player.canParry);
    }

    this.uiContainer.update();

    // #region Teclas y movimiento
    this.player.update(delta);
  }

}