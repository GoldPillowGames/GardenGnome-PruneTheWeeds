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

    static currentMusic;

    static playMusic(musicName, scene){
      if(this.currentMusic != null)
        this.currentMusic.stop();
      this.currentMusic = scene.sound.add(musicName).play({
        mute: false,
        volume: scene.sys.game.musicVolume * scene.sys.game.globalVolume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
      });
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