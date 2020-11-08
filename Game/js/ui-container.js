import UsefulMethods from '../js/useful-methods.js';

export default class UIContainer extends Phaser.GameObjects.Container {
    constructor(data) {
        let {scene, x, y} = data;
        super(scene, x, y);
        this.scene = scene;

        this.scene.add.existing(this);
    }

    create() {
        this.setScrollFactor(0);
        this.setDepth(999);
    }

    update() {
        var currentZoom = this.scene.cameras.main.zoom;
        var offsetX = this.scene.cameras.main.offsetX;
        var offsetY = this.scene.cameras.main.offsetY;

        this.scaleX = 1 / currentZoom;
        this.scaleY = 1 / currentZoom;
        //this.x = 1 / currentZoom + offsetX;
        //this.y = 1 / currentZoom + offsetY;
    }
}