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
import Slider from '../slider.js';
import Button from '../button.js';
import SoundManager from '../sound-manager.js';

export default class SettingsMenu extends Phaser.Scene{
    constructor(){
        super('settingsMenu');
      }
    
    create(){
        this.cameras.main.fadeIn(550);
        
        let that = this;

        this.width  = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        var background = this.add.sprite(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this),'SettingsBackground');
        background.setDepth(-100);

         // this.lights.enable();
        if(!(this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone)){
            var light  = this.lights.addLight(0, 0, 100000, 0xe6fcf5, 0.2);
            this.lights.enable().setAmbientColor(0xc3c3c3);
            this.input.on('pointermove', function (pointer) {
                light.x = pointer.x;
                light.y = pointer.y;
            });
            background.setPipeline('Light2D');
        }
        

        

        background.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
        background.scaleY = background.scaleX;

        let style = {
            fontFamily: 'amazingkids_font', 
            fontSize: '88px',
            color: '#e6fcf5',
            stroke: '#0e302f',
            strokeThickness: 15
        }

        let text = this.add.text(UsefulMethods.RelativePosition(50, 'x', this), UsefulMethods.RelativePosition(15, 'y', this), 'SETTINGS', style);

        text.setOrigin(0.5);
        text.setDepth(100);
        text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
        text.scaleY = text.scaleX;

        this.masterVolume = new Slider({scene:this, x:10, y:35, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'MASTER VOLUME', currentValue: this.sys.game.globalVolume * 5});
        this.masterVolume.create();

        this.musicVolume = new Slider({scene:this, x:10, y:47.5, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'MUSIC VOLUME', currentValue: this.sys.game.musicVolume * 5});
        this.musicVolume.create();

        this.sfxVolume = new Slider({scene:this, x:10, y:60, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'SFX VOLUME', currentValue: this.sys.game.sfxVolume * 5});
        this.sfxVolume.create();

        this.exitButton = new Button({scene:this, x:89.5, y:86, texture:'ExitButton', frame:4, scale:0.018});
        this.exitButton.create();
        this.exitButton.pointerUp = function(){

            SoundManager.playSound('ButtonSound', that);
            that.cameras.main.fadeOut(225);
            that.scene.get("settingsMenu").time.addEvent({delay: 510, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        }
        this.exitButton.setTint(0xe6fcf5);

        
    }

    update(delta){
        this.masterVolume.update(delta);
        this.musicVolume.update(delta);
        this.sfxVolume.update(delta);
        this.exitButton.update(delta);

        this.sys.game.globalVolume = this.masterVolume.value / 5;
        this.sys.game.musicVolume  = this.musicVolume.value / 5;
        this.sys.game.currentMusic.setVolume(this.sys.game.musicVolume * this.sys.game.globalVolume);
        this.sys.game.sfxVolume    = this.sfxVolume.value / 5;
    }
}