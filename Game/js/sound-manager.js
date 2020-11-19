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

export default class SoundManager {

  static stopMusic(scene) {
    var music = scene.sys.game.currentMusic;
    scene.sys.game.currentMusic = null;
    scene.tweens.add({
      targets: music,
      volume: 0,
      duration: 5,
    });
  }

  static stopMusic(scene, time) {
    var music = scene.sys.game.currentMusic;
    scene.sys.game.currentMusic = null;
    scene.tweens.add({
      targets: music,
      volume: 0,
      duration: time,
    });
  }

  static playMusic(musicName, scene) {
    if (scene.sys.game.currentMusic === scene.sound.get(musicName)) {
      return;
    }
      
    if (scene.sys.game.currentMusic != null) {
      var previousMusic = scene.sys.game.currentMusic;
      scene.tweens.add({
        targets: scene.sys.game.currentMusic,
        volume: 0,
        duration: 500,
        onComplete: function () { previousMusic.pause(); }
      });
    }

    if (scene.sound.get(musicName) == null) {
      scene.sys.game.currentMusic = scene.sound.add(musicName);
      scene.sys.game.currentMusic.play({
        mute: false,
        volume: 0,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      });
    }
    else {
      scene.sys.game.currentMusic = scene.sound.get(musicName);
      scene.sys.game.currentMusic.resume();
    }
  }

    static playSound(soundName, scene, volume){
      if(!volume){
        volume = 1;
      }
      scene.sound.add(soundName).play({
        mute: false,
        volume: scene.sys.game.sfxVolume * scene.sys.game.globalVolume * volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      });
  }

  static update(scene) {
    if (scene.sys.game.currentMusic == null)
      return;

    if (!scene.cameras.main.fadeEffect.isRunning) {
      scene.sys.game.transitionVolume = 1;
    }
    else {
      scene.sys.game.transitionVolume = scene.cameras.main.fadeEffect.direction ? 1 - scene.cameras.main.fadeEffect.progress : scene.cameras.main.fadeEffect.progress;
    }
    scene.sys.game.currentMusic.setVolume(scene.sys.game.transitionVolume * scene.sys.game.musicVolume * scene.sys.game.globalVolume);
  }

    // static playSound(soundName, scene, volume){
    //   scene.sound.add(soundName).play({
    //     mute: false,
    //     volume: scene.sys.game.sfxVolume * scene.sys.game.globalVolume * volume,
    //     rate: 1,
    //     detune: 0,
    //     seek: 0,
    //     loop: false,
    //     delay: 0
    //   });
    // }

}