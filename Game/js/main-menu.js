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
import Button from '../js/button.js';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenu');
    }

    preload(){
        this.hardMode = false;
    }

    create() {


        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        

        this.blackBackground = this.add.sprite(0, 0, 'black-background').setInteractive();
        this.blackBackground.displayWidth = 20000;
        this.blackBackground.scaleY = this.blackBackground.scaleX;
        this.blackBackground.setDepth(12000);
        this.blackBackground.visible = false;

        // //Variable auxiliar que guarda la escena actual en ella. Es importante porque en los eventos, si ponemos this, no devuelve la escena,
        // //sino el objeto que ha llamado al evento (eso objeto puede ser un botón, por ejemplo)
        // var that = this;
        
        this.levelButtonsPosition = 120;
        var that = this;

        this.cameras.main.fadeIn(550);

        // this.SettingsButtonsContainer = this.add.sprite(this.width/3, this.height/1.32,'').setInteractive();
        // this.SettingsButtonsContainer.alpha = 0;
        // this.SettingsButtonsContainer.setDepth(0);
        // this.InitControlsButton();
        // this.InitAudioButton();
        // this.InitSettingsMenu();
        // this.InitPlayButton();
        // this.InitSettingsButton();
        // this.InitCreditsButton();

        this.PlayTitle1Tween();
        this.PlayTitle2Tween();

        //#region Variables temporales
        let levelName;
        let difficultyButtons;
        let levelButtons;
        let mainButtons;
        //#endregion

        var text = this.add.text(UsefulMethods.RelativePosition(50, 'x', this), UsefulMethods.RelativePosition(42, 'y', this), '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        text.setStyle({
            color: '#ffffff',
            align: 'center'
        });
        text.setOrigin(0.5);

        //#region Botones de selección de dificultad
        this.difficultyButton1 = new Button({ scene: this, x: 40, y: 120, texture: 'Easy-Button', frame: 4, scale: 0.0225 });
        this.difficultyButton1.create();
        this.difficultyButton1.pointerUp = function () {
            that.hardMode = false;
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({ delay: 210, callback: function () { that.scene.start(levelName); }, callbackScope: this, loop: false });
        }

        this.difficultyButton2 = new Button({ scene: this, x: 60, y: 120, texture: 'Hard-Button', frame: 4, scale: 0.0225 });
        this.difficultyButton2.create();
        this.difficultyButton2.pointerUp = function () {
            that.hardMode = true;
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({ delay: 210, callback: function () { that.scene.start(levelName); }, callbackScope: this, loop: false });
        }

        difficultyButtons = [this.difficultyButton1, this.difficultyButton2];
        //#endregion

        //#region Botones de selección de nivel
        this.level1Button = new Button({ scene: this, x: 30, y: 120, texture: 'Credits-Button', frame: 4, scale: 0.0225 });
        this.level1Button.create();
        this.level1Button.pointerUp = function () {
            text.setText("Select a Difficulty Level");
            levelName = 'Level_1';
            that.ShowButtons(difficultyButtons);
            this.playPressedButtonArray(levelButtons);
        }

        this.level2Button = new Button({ scene: this, x: 50, y: 120, texture: 'Credits-Button', frame: 4, scale: 0.0225 });
        this.level2Button.create();
        this.level2Button.pointerUp = function () {
            text.setText("Select a Difficulty Level");
            that.ShowButtons(difficultyButtons);
            levelName = 'platformTesting';
            this.playPressedButtonArray(levelButtons);
        }

        this.level3Button = new Button({ scene: this, x: 70, y: 120, texture: 'Credits-Button', frame: 4, scale: 0.0225 });
        this.level3Button.create();
        this.level3Button.pointerUp = function () {
            text.setText("Select a Difficulty Level");
            // Level 1
            // that.scene.get("mainMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('platformTesting');}, callbackScope:this, loop:false});
            that.ShowButtons(difficultyButtons);
            levelName = 'platformTesting';
            this.playPressedButtonArray(levelButtons);
        }
        levelButtons = [this.level1Button, this.level2Button, this.level3Button];
        //#endregion

        //#region Botones del menú principal
        this.playButton = new Button({ scene: this, x: 50, y: 60, texture: 'Play-Button', frame: 4, scale: 0.0225 });
        this.playButton.create();
        this.playButton.pointerUp = function () {
            text.setText("Select a Level");
            that.ShowButtons(levelButtons);
            this.playPressedButtonArray(mainButtons);
        }

        this.settingsButton = new Button({ scene: this, x: 20, y: 60, texture: 'Settings-Button', frame: 4, scale: 0.02 });
        this.settingsButton.create();
        this.settingsButton.pointerUp = function () {
            that.cameras.main.fadeOut(225);
            that.scene.get("mainMenu").time.addEvent({ delay: 510, callback: function () { that.scene.start("settingsMenu"); }, callbackScope: this, loop: false });
        }

        this.creditsButton = new Button({ scene: this, x: 80, y: 60, texture: 'Credits-Button', frame: 4, scale: 0.02 });
        this.creditsButton.create();
        this.creditsButton.pointerUp = function () {
            // Credits
            that.cameras.main.fadeOut(225);
            that.scene.get("mainMenu").time.addEvent({ delay: 510, callback: function () { that.scene.start("creditsMenu"); }, callbackScope: this, loop: false });
        }
        mainButtons = [this.playButton, this.settingsButton, this.creditsButton];
        //#endregion

        this.buttons = [this.level1Button, this.level2Button, this.level3Button, this.playButton, this.settingsButton, this.creditsButton, this.difficultyButton1, this.difficultyButton2];
    }


    ShowButtons(array) {
        array.forEach(element => {
            this.tweens.add({
                targets: element,
                delay: 380,
                y: UsefulMethods.RelativePosition(60, 'y', this),
                ease: 'Sine.easeInOut',
                duration: 500,
                yoyo: false,
                repeat: 0
            });
        });
    }

    PlayTitle1Tween() {
        this.title1 = this.add.sprite(this.width / 2.2, this.height / 6, 'Title-Example');
        this.title1.displayWidth = 350;
        this.title1.scaleY = this.title1.scaleX;

        var title1_Anim = this.tweens.add({
            targets: this.title1,

            scaleX: 1.1,
            scaleY: 1.1,
            ease: 'Sine.easeInOut',
            duration: 1800,
            yoyo: true,
            repeat: -1
        });
    }

    PlayTitle2Tween() {
        this.title2 = this.add.sprite(this.width / 1.8, this.height / 4.5, 'Title-Title');
        this.title2.displayWidth = 275;
        this.title2.scaleY = this.title2.scaleX;


        var title2_Anim = this.tweens.add({
            targets: this.title2,
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'Sine.easeInOut',
            duration: 1800,
            yoyo: true,
            delay: 1800,
            repeat: -1
        });
    }

    update(delta) {
        this.buttons.forEach(element => {
            element.update(delta);
        });
        this.playButton.update(delta);
    }
}