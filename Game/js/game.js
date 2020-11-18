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

import MainMenu from './menus/main-menu.js';
import Level_1 from './levels/level1.js';
import Level_2 from './levels/level2.js';
import LoadingScreen from './loading-screen.js';
import SplashScreen from './splash-screen.js';
import SettingsMenu from './menus/settings-menu.js';
import CreditsMenu from './menus/credits-menu.js';
import GameOver from './menus/game-over.js';

var isWeb = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var config = {
  type: Phaser.AUTO,
  width: isWeb ? 1280 : window.screen.width,
  height: isWeb ? 720 : window.screen.height,
  parent: "game",
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 }
    }
  },
  scene: [SplashScreen, LoadingScreen, GameOver, MainMenu, CreditsMenu, Level_1, Level_2, SettingsMenu],
  antialias: true
};

var game = new Phaser.Game(config);

