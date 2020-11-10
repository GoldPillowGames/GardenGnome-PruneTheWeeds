import UsefulMethods from '../js/useful-methods.js';

export default class UIContainer extends Phaser.GameObjects.Container {
    constructor(data) {
        let { scene, x, y } = data;
        super(scene, x, y);
        this.scene = scene;

        this.originalX = x;
        this.originalY = y;
        this.originalScaleX = this.scaleX;
        this.originalScaleY = this.scaleY;

        this.scene.add.existing(this);
    }

    create() {
        this.setScrollFactor(0);
        this.setDepth(999);
    }

    update() {
        var currentZoom = this.scene.cameras.main.zoom;

        this.scaleX = this.originalScaleX / currentZoom;
        this.scaleY = this.originalScaleY / currentZoom;
    }
}