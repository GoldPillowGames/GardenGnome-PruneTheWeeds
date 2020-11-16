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
import StreetLight from './street-light.js';

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

    this.firstCombat = true;
    this.hardMode = this.scene.get("mainMenu").hardMode;

    // #endregion
  }

  create() {

    //let that = this;
    this.cameras.main.fadeIn(1000);
    //this.scene.get("Level_1").time.addEvent({delay: 510, callback: function(){that.cameras.main.fadeIn(550);}});

    // Se crea el objeto player en la escena.
    this.player = new Player({ scene: this, x: UsefulMethods.RelativePosition(10, "x", this), y: UsefulMethods.RelativePosition(75, "y", this), texture: 'Character', frame: 4 , HP: 5});
    this.player.create();
    
    this.inputManager = new InputManager(this);
    this.inputManager.create();
    this.SetupCamera();
    this.uiContainer = new UIContainer({ scene: this, x: this.width / 2, y: this.height / 2});
    this.uiContainer.create();

    this.InitFloor();
    //Creamos los enemigos
    this.createEnemies();

    // DEBUG BORRAR.
    this.testingText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(25, "y", this), this.enemies[0].enemyState, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText.setOrigin(0.5, 0,5);
    //this.testingText2 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(30, "y", this), "Energía: " + this.enemies[0].stamina, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText2.setOrigin(0.5, 0,5);
    //this.testingText3 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(35, "y", this), "Vida: " + this.enemies[0].hp, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText3.setOrigin(0.5, 0,5);
    this.coolDownText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(40, "y", this), "Estado del parry: se puede hacer.", { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.coolDownText.setOrigin(0.5, 0,5);
    //this.playerHPText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(-45, "y", this), "Vidas restantes: " + this.player.HP, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'black' });;
    //this.playerHPText.setOrigin(0.5, 0,5);

    this.healthBarWidht = UsefulMethods.RelativeScale(15.6, "x", this);
    this.healtBarHeight = UsefulMethods.RelativeScale(3.47, "y", this);

    this.healthBarBackground = this.add.rectangle(UsefulMethods.RelativePosition(-47, "x", this) - this.healthBarWidht * 0.035, UsefulMethods.RelativePosition(-45, "y", this) - this.healthBarWidht * 0.035, this.healthBarWidht * 1.07, this.healtBarHeight + this.healthBarWidht * 0.07, 0x0c0c0c);
    this.healthBarBackground.setOrigin(0);
    this.healthBarBackground.setDepth(4);

    this.healthBar = this.add.rectangle(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(-45, "y", this), this.healthBarWidht, this.healtBarHeight, 0xff5e5e);
    this.whiteHealthBar = this.add.rectangle(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(-45, "y", this), this.healthBarWidht, this.healtBarHeight, 0xFFFFFF);
    this.healthBar.setOrigin(0);
    this.healthBar.setDepth(15);
    this.whiteHealthBar.setOrigin(0);
    this.whiteHealthBar.setDepth(14);

    this.uiContainer.add(this.healthBarBackground);
    this.uiContainer.add(this.whiteHealthBar);
    this.uiContainer.add(this.healthBar);
   
    

    /*this.testingText.setScrollFactor(0);
    this.testingText2.setScrollFactor(0);
    this.testingText3.setScrollFactor(0);
    this.coolDownText.setScrollFactor(0);
    this.playerHPText.setScrollFactor(0);*/

    this.uiContainer.add(this.testingText);
    //this.uiContainer.add(this.testingText2);
    //this.uiContainer.add(this.testingText3);
    this.uiContainer.add(this.coolDownText);
    //this.uiContainer.add(this.playerHPText);

    var streetLight = new StreetLight({scene:this, x:50, y:90, texture:'StreetLight', frame:4, scale:0.0225});
    this.lights.enable().setAmbientColor(0xc3c3c3);

    
    this.createFences();
    
    this.InitPlayer();
    this.InitColliders();
  }
  
  createFences(){
    this.fences = [];

    var initialPosition = -40;
    this.fences.push(this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence'));
    var fence = this.fences[0];
    fence.scaleX = UsefulMethods.RelativeScale(0.130, "x", this);
    fence.scaleY = fence.scaleX;
    fence.setDepth(-8);
    //fence.setPipeline('Light2D');

    var numberOfFences = 20;
    
    while(fence.x < this.floors[0].width * this.floors[0].scaleX *3)
    {
      initialPosition += 12;
      fence = this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence');
      this.fences.push(fence);
      fence.scaleX = UsefulMethods.RelativeScale(0.130, "x", this);
      fence.scaleY = fence.scaleX;
      //fence.setPipeline('Light2D');
      fence.setDepth(-8);
    }
  }

  createRandomSprites(sprites, maxDistance, depth, initX, minX, maxX, minY, maxY) {
    var nextSpritePositionX = initX;
    var nextSpritePositionY = minY;

    while(nextSpritePositionX < maxDistance)
    {
      var object = this.add.sprite(
        UsefulMethods.RelativePosition(nextSpritePositionX, "x", this),
        UsefulMethods.RelativePosition(nextSpritePositionY, "y", this),
        Math.random() <= 0.5 ? sprites[0] : sprites[(Math.floor((1 + Math.random() * (sprites.length - 1))))], 4).setDepth(depth);
      
        object.setOrigin(0.5, 1);
      //object.setPipeline('Light2D');

      object.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
      object.scaleY = object.scaleX;
      nextSpritePositionX = nextSpritePositionX + (Math.random() * (maxX - minX) + minX);
      nextSpritePositionY = (Math.random() * (maxY - minY) + minY);
    }
  }


  //Método para crear a los enemigos.
  createEnemies() {
    this.enemies = [];

    this.enemies.push(new Enemy({
      scene: this, x: (this.floors[0].x + 1000), y: 75,
      texture: 'CarnivoreFlower', frame: 0, attackTime: 2, window: 1, stamina: 1, hp: 1, idleAnimation: 'CarnivoreFlowerIdle', attackAnimation:'CarnivoreFlowerAttack'
    }));

    this.anims.create({
      key: 'CarnivoreFlowerIdle',
      frames: this.anims.generateFrameNumbers('CarnivoreFlower', { start: 0, end: 8 }),
      frameRate: 6,
      repeat: -1
    });

    // add sprite from sheet
    // var character_anim = this.add.sprite(UsefulMethods.RelativePosition(50, "x", this), this.add.sprite(UsefulMethods.RelativePosition(75, "y", this), 'CarnivoreFlower2', '01'));
    // character_anim.setPipeline('Light2D');

    // // play animation
    // var frameNames = this.anims.generateFrameNames('CarnivoreFlower2', { start: 0, end: 8 });
    // this.anims.create({ key: 'walk', frames: this.anims.generateFrameNames('CarnivoreFlower2', { start: 0, end: 8 }), frameRate: 6, repeat: -1 });
    // character_anim.anims.play('walk');

    this.enemies.push(new Enemy({
      scene: this, x: (this.floors[1].x + 1000), y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 5
    }));

    this.enemies.push(new Enemy({
      scene: this, x: (this.floors[2].x + 1000), y: 75,
      texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 5
    }));


    this.arrow = this.add.sprite(this.enemies[0].x, this.enemies[0].y - UsefulMethods.RelativePosition(15,'y' , this), 'Arrow');
    this.arrow.scaleX = UsefulMethods.RelativeScale(0.01 , 'x' , this);
    this.arrow.scaleY = this.arrow.scaleX;
    this.arrow.setAlpha(0);

    this.enemies.forEach(element => { element.create();});

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

  newFloor(){
    this.skys[this.currentFloor].x= this.skys[0].width * this.nextFloor;

    //this.RepeatElement('BaseSky1', this.skys[0].width, 2, 105, -11);

    var distance = this.floors[this.currentFloor].x + this.floors[0].width * this.floors[0].scaleX-500;

    this.floors[this.currentFloor].x = this.floors[0].width*this.nextFloor* this.floors[0].scaleX;

    var initialPosition = this.floors[this.currentFloor].x;

    var maxDistance = 0;
    for(var i = 0; i < this.fences.length; i++){
      if(this.fences[i].x > maxDistance){
        maxDistance = this.fences[i].x;
      }
    }
    for(var i = 0; i < this.fences.length; i++){
      if(this.fences[i].x < distance){
        maxDistance += UsefulMethods.RelativePosition(12, "x", this);
        this.fences[i].x = maxDistance;
      }
    }

    // do
    // {
    //   fence = this.add.sprite(initialPosition, UsefulMethods.RelativePosition(91, "y", this), 'WoodFence');
    //   fence.scaleX = UsefulMethods.RelativeScale(0.130, "x", this);
    //   fence.scaleY = fence.scaleX;
    //   //fence.setPipeline('Light2D');
    //   fence.setDepth(-8);
    //   initialPosition += UsefulMethods.RelativePosition(12, "x", this);
    // }while(fence.x + UsefulMethods.RelativePosition(12, "x", this) < (this.floors[this.currentFloor].width * this.floors[this.currentFloor].scaleX + this.floors[this.currentFloor].x));

    // this.nextFloor.setPipeline('Light2D');

    var randomEnemy = Phaser.Math.Between(1, 2);
    console.log(randomEnemy);
    switch(randomEnemy){
      case 1:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + 1000), y: 75,
          texture: 'CarnivoreFlower', frame: 0, attackTime: 2, window: 1, stamina: 1, hp: 1, idleAnimation: 'CarnivoreFlowerIdle', attackAnimation:'CarnivoreFlowerAttack'
        }));
        break;
      case 2:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + 1000), y: 75,
          texture: 'Frog', frame: 0, attackTime: 2, window: 1, stamina: 2, hp: 5
        }));
        break;  
    }

    

    this.physics.add.collider(this.enemies[this.nextFloor], this.floors[this.currentFloor]);
    this.physics.add.collider(this.enemies[this.nextFloor].collision, this.floors[this.currentFloor]);
    this.enemies[this.nextFloor].create();
    
    var enemy = this.enemies[this.nextFloor];
    var combat = function () {
      this.player.canMove = false;
      this.combatHappening = true;
      this.currentEnemy = enemy;
      enemy.attack();
      enemy.createBars();
      enemy.collision.destroy();
      
      this.cameras.main.setFollowOffset(-this.cameraOffsetInCombat);
      this.cameras.main.zoomTo(this.cameraZoomInCombat, 300, 'Sine.easeInOut');

      this.newFloor();
    };

    this.physics.add.overlap(this.player, this.enemies[this.nextFloor].collision, combat, null, this);


    this.nextFloor++;
    this.currentFloor++;
    if(this.currentFloor == 3){
      this.currentFloor = 0;
    }

  }

  /**
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    this.floors = [];
    this.skys = [];

    var floorDistance = 2289;
    this.currentFloor = 0;
    this.nextFloor = 3;

    this.skys.push(this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1', ));
    this.skys[0].setDepth(-11);

    this.skys.push(this.add.sprite(this.skys[0].width, UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1', ));
    this.skys[1].setDepth(-11);

    this.skys.push(this.add.sprite(this.skys[0].width*2, UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1', ));
    this.skys[2].setDepth(-11);

    this.floors.push(this.physics.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4));
    this.floors[0].setDepth(-9);
    this.floors[0].body.allowGravity = false;
    this.floors[0].body.immovable = true;
    this.floors[0].body.setOffset(0, 55);
    this.floors[0].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floors[0].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
   // this.floor.setPipeline('Light2D');
    UsefulMethods.print("Ancho" +  this.floors[0].width);

    this.floors.push(this.physics.add.sprite( this.floors[0].x +  this.floors[0].width* this.floors[0].scaleX, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4));
    this.floors[1].setDepth(-9);
    this.floors[1].body.allowGravity = false;
    this.floors[1].body.immovable = true;
    this.floors[1].body.setOffset(0, 55);
    this.floors[1].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
   // this.floor1.setPipeline('Light2D');
    this.floors[1].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

    this.floors.push(this.physics.add.sprite( this.floors[0].x +  this.floors[0].width* this.floors[0].scaleX*2, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1', 4));
    this.floors[2].setDepth(-9);
    this.floors[2].body.allowGravity = false;
    this.floors[2].body.immovable = true;
    this.floors[2].body.setOffset(0, 55);
    this.floors[2].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floors[2].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
    //this.floor2.setPipeline('Light2D');

    this.createRandomSprites(['Grass', 'Shovel1', 'Shovel2', 'Shovel3', 'Rake'], this.floors[0].width * this.floors[0].scaleX *3, -7, -40, 14, 20, 106, 108);
    this.createRandomSprites(['Grass', 'Shovel1', 'Shovel2', 'Shovel3', 'Rake'], this.floors[0].width * this.floors[0].scaleX *3, 7, -30, 14, 20, 110, 118);

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

    this.physics.add.collider(this.player,  this.floors[0]);
    this.physics.add.collider(this.player,  this.floors[1]);
    this.physics.add.collider(this.player,  this.floors[2]);
    this.physics.add.collider(this.player, this.floor3);

    // PROVISIONAL. Lo suyo sería:
    this.enemies.forEach(element => {

      this.floors.forEach(element2 => {
        this.physics.add.collider(element,  element2);
        this.physics.add.collider(element.collision,  element2);
  
        // this.physics.add.collider(element,  this.floors[1]);
        // this.physics.add.collider(element.collision,  this.floors[1]);
  
        // this.physics.add.collider(element,  this.floors[2]);
        // this.physics.add.collider(element.collision,  this.floors[2]);
      })   
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
        element.createBars();
        element.collision.destroy();
        
        that.cameras.main.setFollowOffset(-that.cameraOffsetInCombat);
        that.cameras.main.zoomTo(that.cameraZoomInCombat, 300, 'Sine.easeInOut');

        if(!this.firstCombat){
          this.newFloor();
        }
        this.firstCombat = false;       
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
    UsefulMethods.print(this.hardMode);

    //Si currentEnemy existe (lo hace en caso de estar en un combate) se actualizan los textos con sus datos para testear.
    if (this.currentEnemy != null) {
      this.currentEnemy.update(delta);
      this.testingText.setText(this.currentEnemy.enemyState);
      //this.testingText2.setText("Energia: " + this.currentEnemy.stamina);
      //this.testingText3.setText("Vida: " + this.currentEnemy.hp);
      //this.playerHPText.setText("Vidas restantes: " + this.player.HP);
      this.coolDownText.setText("CanParry: " + this.player.canParry);
    }

    this.uiContainer.update();

    this.whiteHealthBar.scaleX = UsefulMethods.lerp(this.whiteHealthBar.scaleX, this.healthBar.scaleX, 0.15);
    // #region Teclas y movimiento
    this.player.update(delta);
  }

}