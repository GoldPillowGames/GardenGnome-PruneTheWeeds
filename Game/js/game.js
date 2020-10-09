/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * -
 */
// if(this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone)
// {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var config = {
    type:Phaser.AUTO,
    width:  window.screen.width,//900 * window.screen.width / 760 ,
    height: window.screen.height,//400 * window.screen.height / 400,
    parent: "game",
    dom: {
      createContainer: true
    },
    physics:{
      default:'arcade',
      arcade: {
        gravity: { y: 1000}
      }
    },
    scene: [mainMenu,localGameSettings, settingsMenu, controlsMenu, creditsMenu,onlineLobby, localgame, platformTesting]
  };
}
else
{
  var config = {
    type:Phaser.AUTO,
    width:  1280 * window.screen.width / 2560,
    height: 720 * window.screen.height / 1440,
    parent: "game",
    dom: {
      createContainer: true
    },
    physics:{
      default:'arcade',
      arcade: {
        gravity: { y: 1000}
      }
    },
    scene: [mainMenu,localGameSettings, settingsMenu, controlsMenu, creditsMenu, onlineLobby, localgame, platformTesting]
    
  }; 
}
var game = new Phaser.Game(config);

