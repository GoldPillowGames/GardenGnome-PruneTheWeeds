import UsefulMethods from '../js/useful-methods.js';

// Clase correspondiente a la escena de splash screen.
export default class SplashScreen extends Phaser.Scene {

  // Constructor de la escena.
  constructor() {
    super('SplashScreen');
    this.logo;
  }

  // Funcion create, que crea los elementos del propio juego.
  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    this.logo = this.add.image(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 'logo');

    // Hacemos un fade con la camara.
    var cam = this.cameras.main;
    cam.fadeIn(1000);

    function StartMenu(scene) {
      //game.currentMusic = scene.sound.add('menuMusic', { loop: true, volume: game.musicVolume });
      //game.currentMusic.play();
      scene.scene.start('mainMenu');
    }

    function LoadMenu(scene) {
      cam.fadeOut(1000);
      scene.time.addEvent({
        delay: 1000,
        callback: () => StartMenu(scene)
      });
    }

    this.time.addEvent({
      delay: 3000,
      callback: () => LoadMenu(this)
    });

  }

  update() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    
    this.logo.setPosition(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this));
  }

}
