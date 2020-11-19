import UsefulMethods from '../js/useful-methods.js';
import Button from '../js/button.js'

export default class Selector extends Phaser.GameObjects.Container {
    constructor(data) {
        let {scene, x, y, minusTexture, plusTexture, sliderText, currentValue, options} = data;
        super(scene, x, y);

        this.scene = scene;

        this.value = currentValue;
        this.disabledAlpha = 0.5;

        this.scene.add.existing(this);


        var posX = 45;
        this.minus = new Button({scene:scene, x:x + posX, y:y, texture: minusTexture, frame:4, scale:0.0115});
        
        let style = {
            fontFamily: 'amazingkids_font', 
            fontSize: '50px',
            color: '#e6fcf5',
            stroke: '#0e302f',
            strokeThickness: 12
        }

        this.text = scene.add.text(UsefulMethods.RelativePosition(x, 'x', scene), UsefulMethods.RelativePosition(y, 'y', scene), '', style);
        this.text.setOrigin(0, 0.45);
        this.text.setText(sliderText);
        this.text.setDepth(100);
        this.text.scaleX = UsefulMethods.RelativeScale(0.08, 'x', scene)
        this.text.scaleY = this.text.scaleX;

        let style2 = {
            fontFamily: 'amazingkids_font', 
            fontSize: '48px',
            color: '#e6fcf5',
            stroke: '#0e302f',
            strokeThickness: 12
        }

        this.valueText = scene.add.text(UsefulMethods.RelativePosition(x + 61.5, 'x', scene), UsefulMethods.RelativePosition(y, 'y', scene), 'ENGLISH', style2);

        this.valueText.setOrigin(0.5, 0.45);
        this.valueText.setDepth(100);
        this.valueText.scaleX = UsefulMethods.RelativeScale(0.08, 'x', scene)
        this.valueText.scaleY = this.valueText.scaleX;

        this.plus = new Button({scene:scene, x:x+posX+32, y:y, texture: plusTexture, frame:4, scale:0.0115});
        this.options = options;
    }

    create() {
        this.minus.create();
        this.plus.create();
        var color = 0xe6fcf5;
        this.minus.setTint(color);
        this.plus.setTint(color);
       // this.minus.setTint(0x82e6e2);

        this.minus.pointerUp = () => { this.value = this.value>0 ? this.value-1 : this.value; }
        this.plus.pointerUp = () => { this.value = this.value<this.options.length-1 ? this.value+1 : this.value; }
    }

    update(delta) {
        this.valueText.setText(this.options[this.value]);
    }
}