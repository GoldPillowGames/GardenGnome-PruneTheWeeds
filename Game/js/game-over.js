import UsefulMethods from '../js/useful-methods.js';
import Button from './button.js';
import SoundManager from './sound-manager.js';

// Clase correspondiente a la escena de splash screen.
export default class GameOver extends Phaser.Scene {

  // Constructor de la escena.
  constructor() {
    super({
      key: "GameOver",
    });
  }

  // Funcion create, que crea los elementos del propio juego.
  create() {
    this.cameras.main.fadeIn(550);

    let that = this;

    this.width  = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    var background = this.add.sprite(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 'SettingsBackground');
    background.setDepth(-100);
    background.setAlpha(0.3);
    var gnome = this.add.image(UsefulMethods.RelativePosition(27.5, "x", this), UsefulMethods.RelativePosition(45, "y", this), 'gnome-dead');
    gnome.scaleX = UsefulMethods.RelativeScale(0.062, "x", this);
    gnome.scaleY = gnome.scaleX;
    
    // this.lights.enable();
    if (!(this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone)) {
      
      this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
      });
      
    }
    var light = this.lights.addLight(0, 0, 100000, 0xe6fcf5, 0.2);
    this.lights.enable().setAmbientColor(0xc3c3c3);
    background.setPipeline('Light2D');
    gnome.setPipeline('Light2D');
    var lightGnome = this.lights.addLight(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 100000, 0xe6fcf5, 0.8);

    gnome.setTint(0xb8b7b8);

    UsefulMethods.print("Game Over");

    background.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
    background.scaleY = background.scaleX;

    this.gameOverText = this.add.text(UsefulMethods.RelativePosition(72, "x", this), UsefulMethods.RelativePosition(25, "y", this), "GAME OVER", { fontFamily: '"amazingkids_font"', fontSize: 102, color: '#ff5e5e' });
    this.gameOverText.setOrigin(0.5, 0.5);

    this.axeIcon = this.add.image(UsefulMethods.RelativePosition(68, "x", this), UsefulMethods.RelativePosition(38, "y", this), 'AxeIconBorderless');
    this.axeIcon.scaleX = UsefulMethods.RelativeScale(0.008, 'x', this);
    this.axeIcon.scaleY = this.axeIcon.scaleX;

    this.scoreText = this.add.text(UsefulMethods.RelativePosition(72, "x", this), UsefulMethods.RelativePosition(38, "y", this), this.sys.game.score, { fontFamily: '"amazingkids_font"', fontSize: 42, color: 'white' });
    this.scoreText.setOrigin(0.5, 0.5);

    this.confirmationText = this.add.text(UsefulMethods.RelativePosition(72, "x", this), UsefulMethods.RelativePosition(55, "y", this), "Try again?", { fontFamily: '"amazingkids_font"', fontSize: 52, color: 'white' });
    this.confirmationText.setOrigin(0.5, 0.5);

    this.confButton = new Button({ scene: this, x: 80, y: 73,  texture: 'Tick', frame: 0, scale: 0.0135});
    this.confButton.create();
    this.confButton.setAlpha(1);

    this.confButton.pointerUp = function(){
      UsefulMethods.print("Pointerup1");
      that.cameras.main.fadeOut(200);
      that.scene.get("GameOver").time.addEvent({ delay: 210, callback: function () { that.scene.start('Level_' + that.sys.game.levelIndex); }, callbackScope: this, loop: false });
   
    }

    this.denyButton = new Button({ scene: this, x: 63.5, y: 73,  texture: 'Cross', frame: 0, scale: 0.0135});
    this.denyButton.create();
    this.denyButton.setAlpha(1);

    this.denyButton.pointerUp = function () {
      UsefulMethods.print("Pointerup1");
      that.cameras.main.fadeOut(200);
      that.scene.get("GameOver").time.addEvent({ delay: 210, callback: function () { that.scene.start('mainMenu'); }, callbackScope: this, loop: false });
    }

    this.gameOverText.setDepth(100);
    this.gameOverText.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.gameOverText.scaleY = this.gameOverText.scaleX;

    this.scoreText.setDepth(100);
    this.scoreText.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.scoreText.scaleY = this.scoreText.scaleX;

    this.confirmationText.setDepth(100);
    this.confirmationText.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
    this.confirmationText.scaleY = this.confirmationText.scaleX;
  }

  update() {
    SoundManager.update(this);
  }

}
