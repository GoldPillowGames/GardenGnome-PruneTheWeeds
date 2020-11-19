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

import UsefulMethods from '../useful-methods.js';
import SoundManager from '../sound-manager.js';
import Enemy from '../enemy.js';
import Button from '../button.js';
import Player from '../player.js';
import Cloud from '../cloud.js';
import InputManager from '../input-manager.js';
import UIContainer from '../ui-container.js';

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
    this.debugMode = false;

    //this.sys.game.config.width = 100;

    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    this.cameraZoom = 0.9;

    this.cameraZoomInCombat = 1.1;
    this.cameraZoomWhenKilling = 1.3;
    this.cameraRotationWhenKilling = 0.01;

    this.combatHappening = false;
    this.currentEnemy;

    this.currentFloor = 0;
    this.nextFloor = 3;

    this.firstCombat = true;
    this.hardMode = this.scene.get("mainMenu").hardMode;

    this.sys.game.levelIndex = 1;
    // #endregion
  }

  create() {
    this.color = Phaser.Display.Color.HexStringToColor('0xffffff').color;

    var that = this;
    //let that = this;
    this.cameras.main.fadeIn(1000);
    //this.scene.get("Level_1").time.addEvent({delay: 510, callback: function(){that.cameras.main.fadeIn(550);}});



    let walkText;
    let parryText;
    let attackText;

    if (!(this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone)) {
      switch (this.sys.game.language) {
        case "en":
          walkText = "Press D to walk.";
          parryText = "Press the directional arrows in the direction of the attack!";
          attackText = "Press the spacebar to attack the enemy when he is tired!";
          break;
        case "es":
          walkText = "Pulsa D para caminar.";
          parryText = "¡Pulsa las flechas de dirección en la dirección del ataque!";
          attackText = "¡Pulsa la barra espaciadora para atacar cuando el enemigo esté cansado!";
          break;
        default:
          break;
      }
    } else {
      switch (this.sys.game.language) {
        case "en":
          walkText = "Slide your finger to walk.";
          parryText = "Slide your finger in the direction of the attack!";
          attackText = "Touch the screen to attack the enemy when he is tired!";
          break;
        case "es":
          walkText = "Desliza tu dedo para caminar.";
          parryText = "¡Desliza tu dedo en la dirección del ataque!";
          attackText = "¡Pulsa la pantalla para atacar cuando el enemigo esté cansado!";
          break;
        default:
          break;
      }
    }

    let style = {
      fontFamily: 'amazingkids_font',
      fontSize: '34px',
      color: '#e6fcf5',
      stroke: '#0e302f',
      strokeThickness: 12
    }

    this.text = this.add.text(UsefulMethods.RelativePosition(15, 'x', this), UsefulMethods.RelativePosition(127.5, 'y', this), '', style);
    this.text.setOrigin(0.5, 0.45);
    this.text.setText(walkText);
    this.text.setDepth(100);
    this.text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.text.scaleY = this.text.scaleX;

    this.text = this.add.text(UsefulMethods.RelativePosition(85, 'x', this), UsefulMethods.RelativePosition(125, 'y', this), '', style);
    this.text.setOrigin(0.5, 0.45);
    this.text.setText(parryText);
    this.text.setDepth(100);
    this.text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.text.scaleY = this.text.scaleX;

    this.text = this.add.text(UsefulMethods.RelativePosition(85, 'x', this), UsefulMethods.RelativePosition(132.5, 'y', this), '', style);
    this.text.setOrigin(0.5, 0.45);
    this.text.setText(attackText);
    this.text.setDepth(100);
    this.text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.text.scaleY = this.text.scaleX;


    SoundManager.playMusic('theme1', this);

    this.darkBackground = this.add.sprite(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 'DarkBackground');
    this.darkBackground.setOrigin(0.5, 0.5);
    this.darkBackground.setDepth(1000);
    this.darkBackground.setAlpha(0);
    this.darkBackground.setScrollFactor(0);
    this.darkBackground.active = false;
    this.darkBackground.scaleX = UsefulMethods.RelativeScale(0.5, "x", this);
    this.darkBackground.scaleY = UsefulMethods.RelativeScale(0.5, "y", this);

    var house = this.add.sprite(UsefulMethods.RelativePosition(-35, "x", this), UsefulMethods.RelativePosition(83, "y", this), "House").setOrigin(0.5, 0.5).setDepth(12);
    house.scaleX = UsefulMethods.RelativeScale(0.079, "x", this);
    house.scaleY = house.scaleX;

    // Se crea el objeto player en la escena.
    this.player = new Player({ scene: this, x: UsefulMethods.RelativePosition(10, "x", this), y: UsefulMethods.RelativePosition(90, "y", this), texture: 'WalkingGnome', frame: 2, HP: 5, tint: this.color });
    this.player.create();
    this.player.body.setOffset(0, -20);
    // this.player.onDie = () => {SoundManager.stopMusic(that.sys.game.currentMusic);}

    this.clouds = [];
    this.clouds.push(new Cloud({ scene: this, x: UsefulMethods.RelativePosition(25, 'x', this), y: UsefulMethods.RelativePosition(50, 'y', this), texture: 'cloud', frame: 0 }));
    this.clouds.push(new Cloud({ scene: this, x: UsefulMethods.RelativePosition(75, 'x', this), y: UsefulMethods.RelativePosition(60, 'y', this), texture: 'cloud', frame: 0 }));
    this.clouds.push(new Cloud({ scene: this, x: UsefulMethods.RelativePosition(125, 'x', this), y: UsefulMethods.RelativePosition(55, 'y', this), texture: 'cloud', frame: 0 }));
    this.clouds.push(new Cloud({ scene: this, x: UsefulMethods.RelativePosition(175, 'x', this), y: UsefulMethods.RelativePosition(65, 'y', this), texture: 'cloud', frame: 0 }));

    this.clouds.forEach(element => { element.create(); });

    /*var cloud2 = this.add.sprite(UsefulMethods.RelativePosition(75, 'x', this), UsefulMethods.RelativePosition(50, 'y', this), "cloud");
    cloud2.scaleX = UsefulMethods.RelativeScale(0.03, 'x', this);
    cloud2.scaleY = cloud2.scaleX;*/

    this.inputManager = new InputManager(this);
    this.inputManager.create();
    this.SetupCamera();
    this.uiContainer = new UIContainer({ scene: this, x: this.width / 2, y: this.height / 2 });

    this.uiContainer.create();

    this.InitFloor();

    this.exitButton = new Button({ scene: this, x: 100, y: 3.8, texture: 'Exit', frame: 0, scale: 0.0125 });
    this.exitButton.create();
    this.exitButton.setScrollFactor(0);
    this.exitButton.touchableArea.setScrollFactor(0);

    this.confButton = new Button({ scene: this, x: 66.66, y: 66.66, texture: 'Tick', frame: 0, scale: 0.025 });
    this.confButton.create();
    this.confButton.setScrollFactor(0);
    this.confButton.touchableArea.setScrollFactor(0);
    this.confButton.setAlpha(0);
    this.confButton.touchableArea.setAlpha(0)

    this.confButton.pointerUp = function () {
      UsefulMethods.print("Pointerup1");
      that.cameras.main.fadeOut(200);
      SoundManager.playSound('ButtonSound', that);
      that.scene.get("Level_" + that.sys.game.levelIndex).time.addEvent({ delay: 210, callback: function () { that.scene.start("mainMenu"); }, callbackScope: this, loop: false });


    }

    this.exitText = this.add.text(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(33.33, "y", this), "Are you sure you want to return?", { fontFamily: '"amazingkids_font"', fontSize: 48, color: 'white' });
    this.exitText.setDepth(1100);
    this.exitText.setScrollFactor(0);
    this.exitText.setOrigin(0.5);
    this.exitText.setVisible(false);

    this.denyButton = new Button({ scene: this, x: 33.33, y: 66.66, texture: 'Cross', frame: 0, scale: 0.025 });
    this.denyButton.create();
    this.denyButton.setScrollFactor(0);
    this.denyButton.touchableArea.setScrollFactor(0);
    this.denyButton.setAlpha(0);
    this.denyButton.touchableArea.setAlpha(0)

    //this.confirmButton.setAlpha(100);
    //that.confirmButton.removeInteractive();

    //this.denyButton.setAlpha(100);
    //that.denyButton.removeInteractive();


    this.denyButton.pointerUp = function () {
      SoundManager.playSound('ButtonSound', that);
      that.darkBackground.active = false;
      that.darkBackground.setAlpha(0);
      that.player.canMove = true;

      that.confButton.setAlpha(0);
      that.confButton.touchableArea.setAlpha(0);
      that.denyButton.setAlpha(0);
      that.denyButton.touchableArea.setAlpha(0);
      that.exitText.setVisible(false);
    }

    this.exitButton.pointerUp = function () {
      SoundManager.playSound('ButtonSound', that);
      UsefulMethods.print("Pointerup3");
      if (!that.darkBackground.active) {
        that.darkBackground.active = true;
        that.darkBackground.setAlpha(100);
        that.player.canMove = false;

        that.confButton.setAlpha(100);
        that.confButton.touchableArea.setAlpha(0.1);
        that.denyButton.setAlpha(100);
        that.denyButton.touchableArea.setAlpha(0.1);

        that.exitText.setVisible(true);

      } else {
        that.darkBackground.active = false;
        that.darkBackground.setAlpha(0);
        that.player.canMove = true;

        that.confButton.setAlpha(0);
        that.confButton.touchableArea.setAlpha(0);
        that.denyButton.setAlpha(0);
        that.denyButton.touchableArea.setAlpha(0);

        that.exitText.setVisible(false);
      }

    }

    //Creamos los enemigos
    this.createEnemies();

    // DEBUG BORRAR.
    this.axeIcon = this.add.image(UsefulMethods.RelativePosition(-41, "x", this), UsefulMethods.RelativePosition(-34, "y", this), 'AxeIcon');
    this.axeIcon.setDepth(10);
    this.axeIcon.scaleX = UsefulMethods.RelativeScale(0.008, 'x', this);
    this.axeIcon.scaleY = this.axeIcon.scaleX;

    this.scoreText = this.add.text(UsefulMethods.RelativePosition(-38, "x", this), UsefulMethods.RelativePosition(-37, "y", this), "", { fontFamily: '"amazingkids_font"', fontSize: 36, color: 'white', stroke: 'black', strokeThickness: 7 });
    this.scoreText.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.scoreText.scaleY = this.scoreText.scaleX;
    //this.testingText.setOrigin(0.5, 0,5);
    //this.testingText2 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(30, "y", this), "Energía: " + this.enemies[0].stamina, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText2.setOrigin(0.5, 0,5);
    //this.testingText3 = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(35, "y", this), "Vida: " + this.enemies[0].hp, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.testingText3.setOrigin(0.5, 0,5);
    this.coolDownText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(40, "y", this), "", { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'white' });
    //this.coolDownText.setOrigin(0.5, 0,5);
    //this.playerHPText = this.add.text(UsefulMethods.RelativePosition(-47, "x", this), UsefulMethods.RelativePosition(-45, "y", this), "Vidas restantes: " + this.player.HP, { fontFamily: '"Roboto Condensed"', fontFamily: '"brush_font"', fontSize: 21, color: 'black' });;
    //this.playerHPText.setOrigin(0.5, 0,5);

    this.healthBarWidht = UsefulMethods.RelativeScale(15.6, "x", this);
    this.healtBarHeight = UsefulMethods.RelativeScale(3.47, "y", this);

    this.healthBarBackground = this.add.rectangle(UsefulMethods.RelativePosition(-44, "x", this) - this.healthBarWidht * 0.035, UsefulMethods.RelativePosition(-42, "y", this) - this.healthBarWidht * 0.035, this.healthBarWidht * 1.07, this.healtBarHeight + this.healthBarWidht * 0.07, 0x0c0c0c);
    this.healthBarBackground.setOrigin(0);
    this.healthBarBackground.setDepth(4);

    this.healthBar = this.add.rectangle(UsefulMethods.RelativePosition(-44, "x", this), UsefulMethods.RelativePosition(-42, "y", this), this.healthBarWidht, this.healtBarHeight, 0xff5e5e);
    this.whiteHealthBar = this.add.rectangle(UsefulMethods.RelativePosition(-44, "x", this), UsefulMethods.RelativePosition(-42, "y", this), this.healthBarWidht, this.healtBarHeight, 0xFFFFFF);
    this.healthBar.setOrigin(0);
    this.healthBar.setDepth(15);
    this.whiteHealthBar.setOrigin(0);
    this.whiteHealthBar.setDepth(14);

    this.gnomeHead = this.add.sprite(this.healthBar.x - UsefulMethods.RelativePosition(2, "x", this), this.healthBar.y + UsefulMethods.RelativePosition(1, "y", this), 'GnomeHead');

    this.gnomeHead.scaleX = this.player.scaleX / 2;
    this.gnomeHead.scaleY = this.player.scaleY / 2;
    this.gnomeHead.setDepth(16);

    this.uiContainer.add(this.healthBarBackground);
    this.uiContainer.add(this.whiteHealthBar);
    this.uiContainer.add(this.healthBar);
    this.uiContainer.add(this.gnomeHead);
    this.uiContainer.add(this.axeIcon);


    /*this.testingText.setScrollFactor(0);
    this.testingText2.setScrollFactor(0);
    this.testingText3.setScrollFactor(0);
    this.coolDownText.setScrollFactor(0);
    this.playerHPText.setScrollFactor(0);*/

    this.uiContainer.add(this.scoreText);
    //this.uiContainer.add(this.testingText2);
    //this.uiContainer.add(this.testingText3);
    this.uiContainer.add(this.coolDownText);
    //this.uiContainer.add(this.playerHPText);

    // var streetLight = new StreetLight({scene:this, x:50, y:90, texture:'StreetLight', frame:4, scale:0.0225});
    // this.lights.enable().setAmbientColor(0xc3c3c3);


    this.createFences();

    this.InitPlayer();
    this.InitColliders();
  }

  createFences() {
    this.fences = [];

    var initialPosition = -40;
    this.fences.push(this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence'));
    var fence = this.fences[0];
    fence.scaleX = UsefulMethods.RelativeScale(0.130, "x", this);
    fence.scaleY = fence.scaleX;
    fence.setDepth(-8);
    //fence.setPipeline('Light2D');

    var numberOfFences = 20;

    while (fence.x < this.floors[0].width * this.floors[0].scaleX * 3) {
      initialPosition += 12;
      fence = this.add.sprite(UsefulMethods.RelativePosition(initialPosition, "x", this), UsefulMethods.RelativePosition(91, "y", this), 'WoodFence');
      this.fences.push(fence);
      fence.scaleX = UsefulMethods.RelativeScale(0.130, "x", this);
      fence.scaleY = fence.scaleX;
      //fence.setPipeline('Light2D');
      fence.setDepth(-8);
    }
  }

  //Método para crear a los enemigos.
  createEnemies() {
    this.enemies = [];

    this.enemies.push(new Enemy({
      scene: this, x: (this.floors[0].x + (this.floors[0].width) * (this.floors[0].scaleX) * 0.5), y: 75,
      texture: 'IdlePlant',
      frame: 0,
      attackTime: 0.45,
      window: 0.55,
      stamina: 2,
      hp: 2,
      idleAnimation: 'PlantIdleAnim',
      attackAnimation: 'PlantAttackAnim',
      tint: this.color
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
      scene: this, x: (this.floors[1].x + (this.floors[1].width) * (this.floors[1].scaleX) * 0.5), y: 75,
      texture: 'IdleSnail',
      frame: 0,
      attackTime: 0.70,
      window: 0.60,
      stamina: 2,
      hp: 5,
      idleAnimation: 'SnailIdleAnim',
      attackAnimation: 'SnailAttackAnim',
      tint: this.color
    }));

    this.enemies.push(new Enemy({
      scene: this, x: (this.floors[2].x + (this.floors[2].width) * (this.floors[2].scaleX) * 0.5), y: 75,
      texture: 'IdleMushroom', frame: 0, attackTime: 0.45, window: 0.55, stamina: 2, hp: 5, idleAnimation: 'MushroomIdleAnim', attackAnimation: 'MushroomAttackAnim', tint: this.color
    }));

    this.arrow = this.add.sprite(this.enemies[0].x, this.enemies[0].y - UsefulMethods.RelativePosition(15, 'y', this), 'Arrow');
    this.arrow.scaleX = UsefulMethods.RelativeScale(0.01, 'x', this);
    this.arrow.scaleY = this.arrow.scaleX;
    this.arrow.setAlpha(0);
    this.arrow.setDepth(15);

    this.enemies.forEach(element => { element.create(); });
  }

  /**
   * Configura la cámara (seguimiento, zoom, etc)
   */
  SetupCamera() {
    // Ambos zooms sirven
    // this.cameras.main.zoom = 0.5;
    this.cameras.main.zoomTo(this.cameraZoom, 0);
    // La cámara sigue al jugador
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setFollowOffset(-150);
  }

  restoreLerp(value, time) {
    var that = this;
    this.time.addEvent({
      delay: time,
      callback: () => {
        that.cameras.main.setLerp(value, value);
      }
    });
  }

  restoreLerp(value, time, canMove) {
    var that = this;
    this.time.addEvent({
      delay: time,
      callback: () => {
        that.cameras.main.setLerp(value, value);
        that.player.canMove = canMove;
      }
    });
  }

  RepeatElement(element, distance, times, yCoord, depth) {
    for (var i = 0; i < times; i++) {
      this.repeatedElement = this.add.sprite(0 + distance * i, UsefulMethods.RelativePosition(yCoord, "y", this), element,);
      this.repeatedElement.setDepth(depth);
    }
  }

  newFloor() {

    this.skys[this.currentFloor].x = this.skys[0].width * this.skys[0].scaleX * this.nextFloor;

    //this.RepeatElement('BaseSky1', this.skys[0].width, 2, 105, -11);

    var distance = this.floors[this.currentFloor].x + this.floors[0].width * this.floors[0].scaleX - 500;

    this.floors[this.currentFloor].x = this.floors[0].width * this.nextFloor * this.floors[0].scaleX;

    this.props[this.currentFloor][0].x += 3 * this.floors[0].width * this.floors[0].scaleX;
    this.props[this.currentFloor][1].x += 3 * this.floors[0].width * this.floors[0].scaleX;

    var initialPosition = this.floors[this.currentFloor].x;

    var maxDistance = 0;
    for (var i = 0; i < this.fences.length; i++) {
      if (this.fences[i].x > maxDistance) {
        maxDistance = this.fences[i].x;
      }
    }
    for (var i = 0; i < this.fences.length; i++) {
      if (this.fences[i].x < distance) {
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

    var randomEnemy = Phaser.Math.Between(1, 4);
    switch (randomEnemy) {
      // case 1:
      //   this.enemies.push(new Enemy({
      //     scene: this, x: (this.floors[this.currentFloor].x + (this.floors[this.currentFloor].width) * (this.floors[this.currentFloor].scaleX) * 0.5), y: 75,
      //     texture: 'IdleSnail',
      //     frame: 0,
      //     attackTime: 0.85,
      //     window: 0.45,
      //     stamina: Phaser.Math.Between(2, 4),
      //     hp: Phaser.Math.Between(8, 15),
      //     idleAnimation: 'SnailIdleAnim',
      //     attackAnimation: 'SnailAttackAnim',
      //     tint: this.color
      //   }));
      //   break;
      case 1:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + (this.floors[this.currentFloor].width) * (this.floors[this.currentFloor].scaleX) * 0.5), y: 75,
          texture: 'IdleCactus',
          frame: 0,
          attackTime: 1.05,
          window: 0.45,
          stamina: Phaser.Math.Between(4, 7),
          hp: Phaser.Math.Between(3, 6),
          idleAnimation: 'CactusIdleAnim',
          attackAnimation: 'CactusAttackAnim',
          tint: this.color
        }));
        break;
      case 2:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + (this.floors[this.currentFloor].width) * (this.floors[this.currentFloor].scaleX) * 0.5), y: 75,
          texture: 'IdleMushroom',
          frame: 0,
          attackTime: 0.55,
          window: 0.45,
          stamina: Phaser.Math.Between(2, 3),
          hp: Phaser.Math.Between(4, 8),
          idleAnimation: 'MushroomIdleAnim',
          attackAnimation: 'MushroomAttackAnim',
          tint: this.color
        }));
        break;
      case 3:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + (this.floors[this.currentFloor].width) * (this.floors[this.currentFloor].scaleX) * 0.5), y: 75,
          texture: 'IdlePlant',
          frame: 0,
          attackTime: 0.55,
          window: 0.45,
          stamina: Phaser.Math.Between(1, 3),
          hp: Phaser.Math.Between(10, 14),
          idleAnimation: 'PlantIdleAnim',
          attackAnimation: 'PlantAttackAnim',
          tint: this.color
        }));
        break;
      case 4:
        this.enemies.push(new Enemy({
          scene: this, x: (this.floors[this.currentFloor].x + (this.floors[this.currentFloor].width) * (this.floors[this.currentFloor].scaleX) * 0.5), y: 75,
          texture: 'IdleFrog',
          frame: 0,
          attackTime: 0.8,
          window: 0.5,
          stamina: Phaser.Math.Between(1, 2),
          hp: Phaser.Math.Between(12, 20),
          idleAnimation: 'FrogIdleAnim',
          attackAnimation: 'FrogAttackAnim',
          tint: this.color
        }));
        break;
    }

    this.physics.add.collider(this.enemies[this.nextFloor], this.floors[this.currentFloor]);
    this.physics.add.collider(this.enemies[this.nextFloor].collision, this.floors[this.currentFloor]);
    this.enemies[this.nextFloor].create();

    var enemy = this.enemies[this.nextFloor];
    var combat = function () {
      this.player.canMove = false;
      this.player.anims.play('GnomeStopAnim');
      SoundManager.playMusic('battle-theme1', this);

      this.currentEnemy = enemy;
      this.combatHappening = true;

      enemy.attack();
      enemy.createBars();
      enemy.collision.destroy();

      this.cameras.main.setLerp(0.09, 0.09);
      this.cameras.main.zoomTo(this.cameraZoomInCombat, 300, 'Sine.easeInOut');

      this.newFloor();
    };

    this.physics.add.overlap(this.player, this.enemies[this.nextFloor].collision, combat, null, this);


    this.nextFloor++;
    this.currentFloor++;
    if (this.currentFloor == 3) {
      this.currentFloor = 0;
    }

  }

  /**
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor() {
    this.floors = [];
    this.skys = [];
    this.props = [];

    var floorDistance = 2289;

    this.skys.push(this.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1',));
    this.skys[0].setDepth(-11);
    this.skys[0].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    //this.skys[0].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

    this.skys.push(this.add.sprite(this.skys[0].width * this.skys[0].scaleX, UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1',));
    this.skys[1].setDepth(-11);
    this.skys[1].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    //this.skys[1].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

    this.skys.push(this.add.sprite(this.skys[0].width * 2 * this.skys[0].scaleX, UsefulMethods.RelativePosition(105, "y", this), 'BaseSky1',));
    this.skys[2].setDepth(-11);
    this.skys[2].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    //this.skys[2].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);

    this.floors.push(this.physics.add.sprite(UsefulMethods.RelativePosition(0, "x", this), UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1'));
    this.floors[0].setDepth(-9);
    this.floors[0].body.allowGravity = false;
    this.floors[0].body.immovable = true;
    this.floors[0].body.setOffset(0, 80);
    this.floors[0].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floors[0].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
    // this.floor.setPipeline('Light2D');

    this.props.push(
      this.createPropsContainer(this.floors[0])
    );

    this.floors.push(this.physics.add.sprite(this.floors[0].x + this.floors[0].width * this.floors[0].scaleX, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1'));
    this.floors[1].setDepth(-9);
    this.floors[1].body.allowGravity = false;
    this.floors[1].body.immovable = true;
    this.floors[1].body.setOffset(0, 80);
    this.floors[1].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floors[1].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
    // this.floor1.setPipeline('Light2D');

    this.props.push(
      this.createPropsContainer(this.floors[1])
    );

    this.floors.push(this.physics.add.sprite(this.floors[0].x + this.floors[0].width * this.floors[0].scaleX * 2, UsefulMethods.RelativePosition(130, "y", this), 'BaseFloor1'));
    this.floors[2].setDepth(-9);
    this.floors[2].body.allowGravity = false;
    this.floors[2].body.immovable = true;
    this.floors[2].body.setOffset(0, 80);
    this.floors[2].scaleX = UsefulMethods.RelativeScale(0.08, 'x', this);
    this.floors[2].scaleY = UsefulMethods.RelativeScale(0.12, 'y', this);
    //this.floor2.setPipeline('Light2D');

    this.props.push(
      this.createPropsContainer(this.floors[2])
    );

    // this.floor.scaleX = UsefulMethods.RelativeScale(0.1, "x", this);
    // this.floor.scaleY = this.floor.scaleX;

    // this.floor1 = this.physics.add.sprite(UsefulMethods.RelativePosition(45, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor');
    // this.floor1.body.allowGravity = false;
    // this.floor1.body.immovable = true;

    // this.floor2 = this.physics.add.sprite(UsefulMethods.RelativePosition(90, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    // this.floor2.body.allowGravity = false;
    // this.floor2.body.immovable = true;

    // this.floor3 = this.physics.add.sprite(UsefulMethods.RelativePosition(135, "x", this), UsefulMethods.RelativePosition(105, "y", this), 'Floor', 4);
    // this.floor3.body.allowGravity = false;
    // this.floor3.body.immovable = true;
  }

  createRandomSprites(sprites, maxDistance, depth, initX, minX, maxX, minY, maxY) {
    var spritesContainer = this.add.container(0, 0);
    spritesContainer.setDepth(depth);

    var nextSpritePositionX = UsefulMethods.UnrelativePosition(initX, "x", this) + (Math.random() * (maxX - minX) + minX);
    var nextSpritePositionY = (Math.random() * (maxY - minY) + minY);

    while (nextSpritePositionX < UsefulMethods.UnrelativePosition(initX + maxDistance, "x", this)) {
      var object = this.add.sprite(
        UsefulMethods.RelativePosition(nextSpritePositionX, "x", this),
        UsefulMethods.RelativePosition(nextSpritePositionY, "y", this),
        Math.random() <= 0.8 ? sprites[0] : sprites[(Math.floor((1 + Math.random() * (sprites.length - 1))))]);

      object.setOrigin(0.5, 1);
      //object.setPipeline('Light2D');
      object.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
      object.scaleY = object.scaleX;
      object.scaleX = Math.random() <= 0.5 ? object.scaleX : -object.scaleX;

      spritesContainer.add(object);

      nextSpritePositionX = nextSpritePositionX + (Math.random() * (maxX - minX) + minX);
      nextSpritePositionY = (Math.random() * (maxY - minY) + minY);
    }



    return spritesContainer;
  }

  createPropsContainer(floor) {
    return [
      this.createRandomSprites(['Grass', 'Shovel1', 'Shovel2', 'Shovel3', 'Rake'], floor.width * floor.scaleX, -7, floor.x - floor.originX * floor.width * floor.scaleX, 9, 30, 106, 108),
      this.createRandomSprites(['Grass', 'Shovel1', 'Shovel2', 'Shovel3', 'Rake'], floor.width * floor.scaleX, 7, floor.x - floor.originX * floor.width * floor.scaleX - UsefulMethods.RelativePosition(5, 'x', this), 9, 30, 112, 114)
    ];
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

    this.physics.add.collider(this.player, this.floors[0]);
    this.physics.add.collider(this.player, this.floors[1]);
    this.physics.add.collider(this.player, this.floors[2]);
    this.physics.add.collider(this.player, this.floor3);

    this.enemies.forEach(element => {

      this.floors.forEach(element2 => {
        this.physics.add.collider(element, element2);
        this.physics.add.collider(element.collision, element2);

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
        that.player.anims.play('GnomeStopAnim');
        SoundManager.playMusic('battle-theme1', this);
        that.currentEnemy = element;
        that.combatHappening = true;

        element.attack();
        element.createBars();
        element.collision.destroy();

        this.cameras.main.setLerp(0.09, 0.09);
        that.cameras.main.zoomTo(that.cameraZoomInCombat, 300, 'Sine.easeInOut');

        if (!this.firstCombat) {
          this.newFloor();
        }
        this.firstCombat = false;
        //that.resizeText();

      };
      that.physics.add.overlap(that.player, element.collision, combat, null, that);
    });
  }

  resizeText() {
    this.scoreText.scaleX = this.scoreText.scaleX / this.cameraZoomInCombat;
    this.scoreText.scaleY = this.scoreText.scaleY / this.cameraZoomInCombat;
    this.scoreText.x = this.scoreText.x / this.cameraZoomInCombat + this.cameraOffsetInCombat;
    this.scoreText.y = this.scoreText.y / this.cameraZoomInCombat;

    //Se sigue esta formula para cambiar el tamaño y la posición de la interfaz cuando se cambia el zoom de la camara

  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta) {
    SoundManager.update(this);

    this.clouds.forEach(element => { element.update(); });

    this.scoreText.setText(this.player.score);

    //Si currentEnemy existe (lo hace en caso de estar en un combate) se actualizan los textos con sus datos para testear.
    if (this.currentEnemy != null) {
      this.currentEnemy.update(delta);
      //this.testingText.setText(this.currentEnemy.enemyState);
      //this.testingText2.setText("Energia: " + this.currentEnemy.stamina);
      //this.testingText3.setText("Vida: " + this.currentEnemy.hp);
      //this.playerHPText.setText("Vidas restantes: " + this.player.HP);
      //this.coolDownText.setText("CanParry: " + this.player.canParry);
    }

    this.uiContainer.update();
    this.inputManager.update();

    this.whiteHealthBar.scaleX = UsefulMethods.lerp(this.whiteHealthBar.scaleX, this.healthBar.scaleX, 0.15);
    // #region Teclas y movimiento
    this.player.update(delta);
  }

}