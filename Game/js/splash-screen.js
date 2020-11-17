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

    this.isPlayingIntro = false;

    this.logo = this.add.image(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 'logo');
    this.logo.setScale(UsefulMethods.RelativeScale(0.02, "x", this));

    this.input.on('pointerdown', function (pointer) {
      PlayIntro();
    }, this);

    // Hacemos un fade con la camara.
    var cam = this.cameras.main;
    cam.fadeIn(1000);

    var that = this;

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

    function LoadIntro() {
      if (that.isPlayingIntro === false) {
        cam.fadeOut(1000);
        that.time.addEvent({
          delay: 1100,
          callback: () => PlayIntro()
        });
      }
    }

    function PlayIntro() {
      that.isPlayingIntro = true;
      that.input.on('pointerdown', function (pointer) {
        StartMenu(that);
      }, that);
      cam.fadeIn(0);
      var video = that.add.video(UsefulMethods.RelativePosition(50, "x", that), UsefulMethods.RelativePosition(50, "y", that), 'intro');
      video.displayHeight = that.height;
      video.displayWidth = that.width;
      video.play(true);
      video.setLoop(false);
      video.on('complete', function (video) {
        LoadMenu(that);
      });
    }

    this.time.addEvent({
      delay: 3000,
      callback: () => LoadIntro()
    });

  }

  update() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    this.logo.setPosition(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this));
  }

}
