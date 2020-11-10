import UsefulMethods from './useful-methods.js';

export default class StreetLight extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let {scene, x, y, texture, frame} = data;
        super(scene, UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        // #endregion

        this.scene = scene;

        var light  = this.scene.lights.addLight(0, 0, 100000, 0xe6fcf5, 0.2);
            this.scene.lights.enable().setAmbientColor(0xc3c3c3);
            this.scene.input.on('pointermove', function (pointer) {
                light.x = pointer.x;
                light.y = pointer.y;
            });

        this.scene.add.existing(this);
    }

    create() {
        this.displayWidth = UsefulMethods.RelativeScale(10, "x", this.scene);
        this.scaleY = this.scaleX;
    }

    update(delta) {

    }
}