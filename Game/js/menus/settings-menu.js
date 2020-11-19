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
import Selector from '../selector.js';
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

        this.text = this.add.text(UsefulMethods.RelativePosition(50, 'x', this), UsefulMethods.RelativePosition(15, 'y', this), 'SETTINGS', style);

        this.text .setOrigin(0.5);
        this.text .setDepth(100);
        this.text .scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
        this.text .scaleY = this.text.scaleX;

        this.masterVolume = new Slider({scene:this, x:10, y:34, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'MASTER VOLUME', currentValue: this.sys.game.globalVolume * 5});
        this.masterVolume.create();

        this.musicVolume = new Slider({scene:this, x:10, y:45.5, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'MUSIC VOLUME', currentValue: this.sys.game.musicVolume * 5});
        this.musicVolume.create();

        this.sfxVolume = new Slider({scene:this, x:10, y:57, sliderTexture:'SliderBar', minusTexture:'Minus', plusTexture:'Plus', sliderText:'SFX VOLUME', currentValue: this.sys.game.sfxVolume * 5});
        this.sfxVolume.create();

        var languageValue = 0;

        switch(this.sys.game.language){
            case "en":
                languageValue = 0;
                break;
            case "es":
                languageValue = 1;
                break;
            default:
                break;
        }

        this.languageSelector = new Selector({scene:this, x:10, y:68.5, minusTexture:'arrowLeft', plusTexture:'arrowRight', sliderText:'LANGUAGE', currentValue: languageValue, options:["en", "es"]});
        this.languageSelector.create();

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
        //this.languageSelector.update(delta);
        switch(this.languageSelector.value){
            case 0:
                this.languageSelector.valueText.setText("ENGLISH");
                break;
            case 1:
                this.languageSelector.valueText.setText("ESPAÑOL");
                break;
            default:
                break;
        }

        switch(this.sys.game.language){
            case "en":
                this.masterVolume.text.setText('MASTER VOLUME');
                this.musicVolume.text.setText('MUSIC VOLUME');
                this.sfxVolume.text.setText('SFX VOLUME');
                this.languageSelector.text.setText('LANGUAGE');
                this.text.setText('SETTINGS');
                break;
            case "es":
                this.masterVolume.text.setText('VOLUMEN MAESTRO');
                this.musicVolume.text.setText('VOLUMEN DE LA MÚSICA');
                this.sfxVolume.text.setText('VOLUMEN DE EFECTOS');
                this.languageSelector.text.setText('IDIOMA');
                this.text.setText('OPCIONES');
                break;
            default:
                break;
        }
        this.sys.game.language = this.languageSelector.options[this.languageSelector.value];
        this.exitButton.update(delta);

        this.sys.game.globalVolume = this.masterVolume.value / 5;
        this.sys.game.musicVolume  = this.musicVolume.value / 5;
        this.sys.game.currentMusic.setVolume(this.sys.game.musicVolume * this.sys.game.globalVolume);
        this.sys.game.sfxVolume    = this.sfxVolume.value / 5;
    }
}