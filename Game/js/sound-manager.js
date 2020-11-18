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

export default class SoundManager{

    static stopMusic(sound){
      sound.setVolume(0);
    }

    static playMusic(musicName, scene){
      var currentMusic = scene.sound.add(musicName);
      currentMusic.play({
        mute: false,
        volume: scene.sys.game.musicVolume * scene.sys.game.globalVolume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      });
      return currentMusic;
    }

    static playSound(soundName, scene){
      scene.sound.add(soundName).play({
        mute: false,
        volume: scene.sys.game.sfxVolume * scene.sys.game.globalVolume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      });
    }

}