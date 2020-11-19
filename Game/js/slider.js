import UsefulMethods from '../js/useful-methods.js';
import Button from '../js/button.js'

export default class Slider extends Phaser.GameObjects.Container {
    constructor(data) {
        let {scene, x, y, sliderTexture, minusTexture, plusTexture, sliderText, currentValue} = data;
        super(scene, x, y);

        this.scene = scene;

        this.value = currentValue;
        this.disabledAlpha = 0.5;

        this.scene.add.existing(this);


        var posX = 45;
        this.minus = new Button({scene:scene, x:x + posX, y:y, texture: minusTexture, frame:4, scale:0.011, multipleUse: true});
        
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

        // this.minus.scaleX = 0.135;
        // this.minus.scaleY = this.minus.scaleX;
        this.sliderBar1 = new Button({scene:scene, x:x+posX+6, y:y, texture: sliderTexture, frame:4, scale:0.075 , multipleUse: true});
        //this.sliderBar1 = this.scene.add.sprite(UsefulMethods.RelativePosition(x+posX+6,    "x", scene), UsefulMethods.RelativePosition(y, "y", scene), sliderTexture);
        this.sliderBar1.create();
        this.sliderBar1.pointerUp = () => {this.value = 1;}

        this.sliderBar2 = new Button({scene:scene, x:x+posX+11, y:y, texture: sliderTexture, frame:4, scale:0.075, multipleUse: true});
        //this.sliderBar1 = this.scene.add.sprite(UsefulMethods.RelativePosition(x+posX+6,    "x", scene), UsefulMethods.RelativePosition(y, "y", scene), sliderTexture);
        this.sliderBar2.create();
        this.sliderBar2.pointerUp = () => {this.value = 2;}

        this.sliderBar3 = new Button({scene:scene, x:x+posX+16, y:y, texture: sliderTexture, frame:4, scale:0.075, multipleUse: true});
        //this.sliderBar1 = this.scene.add.sprite(UsefulMethods.RelativePosition(x+posX+6,    "x", scene), UsefulMethods.RelativePosition(y, "y", scene), sliderTexture);
        this.sliderBar3.create();
        this.sliderBar3.pointerUp = () => {this.value = 3;}

        this.sliderBar4 = new Button({scene:scene, x:x+posX+21, y:y, texture: sliderTexture, frame:4, scale:0.075, multipleUse: true});
        //this.sliderBar1 = this.scene.add.sprite(UsefulMethods.RelativePosition(x+posX+6,    "x", scene), UsefulMethods.RelativePosition(y, "y", scene), sliderTexture);
        this.sliderBar4.create();
        this.sliderBar4.pointerUp = () => {this.value = 4;}

        this.sliderBar5 = new Button({scene:scene, x:x+posX+26, y:y, texture: sliderTexture, frame:4, scale:0.075, multipleUse: true});
        //this.sliderBar1 = this.scene.add.sprite(UsefulMethods.RelativePosition(x+posX+6,    "x", scene), UsefulMethods.RelativePosition(y, "y", scene), sliderTexture);
        this.sliderBar5.create();
        this.sliderBar5.pointerUp = () => {this.value = 5;}

        this.sliderBar = [this.sliderBar1, this.sliderBar2, this.sliderBar3, this.sliderBar4, this.sliderBar5];

        this.plus = new Button({scene:scene, x:x+posX+32, y:y, texture: plusTexture, frame:4, scale:0.011, multipleUse: true});
    }

    create() {
        this.minus.create();
        this.plus.create();
        var color = 0xe6fcf5;
        this.minus.setTint(color);
        this.plus.setTint(color);
       // this.minus.setTint(0x82e6e2);

        this.minus.pointerUp = () => { this.value = this.value>0 ? this.value-1 : this.value; }
        this.plus.pointerUp = () => { this.value = this.value<5 ? this.value+1 : this.value; }
    }

    update(delta) {
        this.minus.update();
        this.plus.update();
        this.sliderBar[0].update();
        this.sliderBar[1].update();
        this.sliderBar[2].update();
        this.sliderBar[3].update();
        this.sliderBar[4].update();
        var color = 0xe6fcf5;
        switch(this.value)
        {
            case 0:
                this.sliderBar[0].alpha = this.disabledAlpha;
                this.sliderBar[0].setTint(color);
                this.sliderBar[1].alpha = this.disabledAlpha;
                this.sliderBar[1].setTint(color);
                this.sliderBar[2].alpha = this.disabledAlpha;
                this.sliderBar[2].setTint(color);
                this.sliderBar[3].alpha = this.disabledAlpha;
                this.sliderBar[3].setTint(color);
                this.sliderBar[4].alpha = this.disabledAlpha;
                this.sliderBar[4].setTint(color);
                break;
            case 1:
                this.sliderBar[0].alpha = 1;
                this.sliderBar[0].setTint(0xe54242);
                this.sliderBar[1].alpha = this.disabledAlpha;
                this.sliderBar[1].setTint(color);
                this.sliderBar[2].alpha = this.disabledAlpha;
                this.sliderBar[2].setTint(color);
                this.sliderBar[3].alpha = this.disabledAlpha;
                this.sliderBar[3].setTint(color);
                this.sliderBar[4].alpha = this.disabledAlpha;
                this.sliderBar[4].setTint(color);
                break;
            case 2:
                this.sliderBar[0].alpha = 1;
                this.sliderBar[0].setTint(0xfdcd0c);
                this.sliderBar[1].alpha = 1;
                this.sliderBar[1].setTint(0xfdcd0c);
                this.sliderBar[2].alpha = this.disabledAlpha;
                this.sliderBar[2].setTint(color);
                this.sliderBar[3].alpha = this.disabledAlpha;
                this.sliderBar[3].setTint(color);
                this.sliderBar[4].alpha = this.disabledAlpha;
                this.sliderBar[4].setTint(color);
                break;
            case 3:
                this.sliderBar[0].alpha = 1;
                this.sliderBar[0].setTint(color);
                this.sliderBar[1].alpha = 1;
                this.sliderBar[1].setTint(color);
                this.sliderBar[2].alpha = 1;
                this.sliderBar[2].setTint(color);
                this.sliderBar[3].alpha = this.disabledAlpha;
                this.sliderBar[3].setTint(color);
                this.sliderBar[4].alpha = this.disabledAlpha;
                this.sliderBar[4].setTint(color);
                break;
            case 4:
                this.sliderBar[0].alpha = 1;
                this.sliderBar[0].setTint(color);
                this.sliderBar[1].alpha = 1;
                this.sliderBar[1].setTint(color);
                this.sliderBar[2].alpha = 1;
                this.sliderBar[3].alpha = 1;
                this.sliderBar[4].alpha = this.disabledAlpha;
                break;
            case 5:
                this.sliderBar[0].alpha = 1;
                this.sliderBar[0].setTint(color);
                this.sliderBar[1].alpha = 1;
                this.sliderBar[1].setTint(color);
                this.sliderBar[2].alpha = 1;
                this.sliderBar[3].alpha = 1;
                this.sliderBar[4].alpha = 1;
                break;
        }
    }
}