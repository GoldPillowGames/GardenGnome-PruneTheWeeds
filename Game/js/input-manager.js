import UsefulMethods from '../js/useful-methods.js';

export default class InputManager {
    constructor(scene) {
        this.scene = scene;
        this.DButton = this.scene.input.keyboard.addKey('D');
        this.AButton = this.scene.input.keyboard.addKey('A');
        this.WButton = this.scene.input.keyboard.addKey('W');
        this.rightButton = this.input.keyboard.addKey('right');
        this.leftButton = this.input.keyboard.addKey('left');
        this.upButton = this.input.keyboard.addKey('space');
    }
}