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

import UsefulMethods from '../js/useful-methods.js';
import Slider from '../js/slider.js';
import Button from '../js/button.js';

export default class CreditsMenu extends Phaser.Scene{
    constructor(){
        super('creditsMenu');
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

        let text = this.add.text(UsefulMethods.RelativePosition(50, 'x', this), UsefulMethods.RelativePosition(15, 'y', this), 'CREDITS', style);

        text.setOrigin(0.5);
        text.setDepth(100);
        text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
        text.scaleY = text.scaleX;

        let creditsStyle = {
            fontFamily: 'amazingkids_font', 
            fontSize: '42px',
            color: '#e6fcf5',
            stroke: '#0e302f',
            strokeThickness: 12
        }

        let x = 10;
        let y = 25;
        let y_increment = 7.5;

        let credits_german = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y, 'y', this), 'Germán López Gutiérrez', creditsStyle);
        let credits_fernando = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y + y_increment, 'y', this), 'Fernando Martín Espina', creditsStyle);
        y_increment += 7.5;
        let credits_ignacio = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y + y_increment, 'y', this), 'Ignacio Atance Loras', creditsStyle);
        y_increment += 7.5;
        let credits_elvira = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y + y_increment, 'y', this), 'Elvira Gutiérrez Bartolomé', creditsStyle);
        y_increment += 7.5;
        let credits_jorge = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y + y_increment, 'y', this), 'Jorge Sánchez Sánchez', creditsStyle);
        y_increment += 11.5;
        let credits_contact = this.add.text(UsefulMethods.RelativePosition(x, 'x', this), UsefulMethods.RelativePosition(y + y_increment, 'y', this), 'CONTACT: goldpillowgames@gmail.com', creditsStyle);

        credits_german.setOrigin(0);
        credits_german.setDepth(100);
        credits_german.scaleX = UsefulMethods.RelativeScale(0.08, 'x', this)
        credits_german.scaleY = text.scaleX;

        this.exitButton = new Button({scene:this, x:9.5, y:86, texture:'ExitButton', frame:4, scale:-0.018});
        this.exitButton.create();
        this.exitButton.pointerUp = function(){
            that.cameras.main.fadeOut(225);
            that.scene.get("creditsMenu").time.addEvent({delay: 510, callback: function(){that.scene.start('mainMenu');}, callbackScope:this, loop:false});
        }
        this.exitButton.setTint(0xe6fcf5);
    }

    update(delta){
    }
}