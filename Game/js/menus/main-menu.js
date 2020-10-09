/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Fernando Martín Espina
 * Jorge Sanchez Sanchez
 * Elvira Gutiérrez Bartolomé
 * -
 */

class mainMenu extends Phaser.Scene{
    constructor(){
        super({key:"mainMenu"});
      }

    preload(){
        this.load.image('Title-Example'  , 'assets/test/example.png');
        this.load.image('Title-Title'    , 'assets/test/title.png');
        this.load.image('Play-Button'    , 'assets/test/play-button.png');
        this.load.image('Settings-Button', 'assets/test/settings-button.png');
        this.load.image('Credits-Button', 'assets/test/credits-button.png');
        this.load.image('Settings-Menu-Background', 'assets/test/settings-menu-background.png');

        // #region Loading Bar
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0xffe0ac, 0.8).setDepth(6000);
            progressBox.fillRect(20, 555, 760, 20).setDepth(5000);

            this.load.on('progress', function (value) {
                console.log(value);
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(25, 560, 750 * value, 10);
                });

            // Texto loading
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 30,
                y: height / 1.05 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });

            loadingText.setDepth(11000);

            var assetText = this.make.text({
                x: width / 1.35,
                y: height / 1.03 - 50,
                text: '',
                boundsAlignH: "right",
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            assetText.setDepth(11000);


            this.load.on('progress', function (value) {
                console.log(value);
            });

            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
                console.log(file.src);
            });

            // Destructor
            this.load.on('complete', function () {
                console.log('complete');
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                assetText.destroy();
            });
            // #endregion

        this.progressB = progressBar;
        this.progressBx = progressBox;
        this.loading = loadingText;
        this.asset = assetText;
    }

    
  
    
    create(){
        this.progressB.destroy();
        this.progressBx.destroy();
        this.loading.destroy();
        this.asset.destroy();

        this.blackBackground = this.add.sprite(0,0,'black-background').setInteractive();
        this.blackBackground.displayWidth = 20000;
        this.blackBackground.scaleY       = this.blackBackground.scaleX;
        this.blackBackground.setDepth(12000);
        this.blackBackground.visible = false;

        // //Variable auxiliar que guarda la escena actual en ella. Es importante porque en los eventos, si ponemos this, no devuelve la escena,
        // //sino el objeto que ha llamado al evento (eso objeto puede ser un botón, por ejemplo)
        // var that = this;
        this.width  = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.cameras.main.fadeIn(1000);

        this.SettingsButtonsContainer = this.add.sprite(this.width/3, this.height/1.32,'').setInteractive();
        this.SettingsButtonsContainer.alpha = 0;
        this.SettingsButtonsContainer.setDepth(0);
        this.InitControlsButton();
        this.InitAudioButton();
        this.InitSettingsMenu();
        this.InitPlayButton();
        this.InitSettingsButton();
        this.InitCreditsButton();

        this.PlayTitle1Tween();
        this.PlayTitle2Tween();

    }

    RelativePosition(value, axis) 
    {
      var result = 0;
      switch(axis)
      {
        case "x":
          result = this.width * value/100;
          break;
        case "y":
          result = this.height * value/100;
          break;
        default:
          break;
      }
      return result;
    }
  
    RelativeScale(value, axis)
    {
      var result = 0;
      switch(axis)
      {
        case "x":
          result = this.width * value/100;
          break;
        case "y":
          result = this.height * value/100;
          break;
        default:
          break;
      }
      return result;
    }

    InitControlsButton(){
        this.ControlsButtonSelected = false;
        this.ControlsButton_Image = this.add.sprite(this.width/6.5,this.height/1.504,'Play-Button').setInteractive();
        this.ControlsButton_Image.alpha = 0;
        this.ControlsButton_Image.displayWidth = 230;
        this.ControlsButton_Image.scaleY= this.ControlsButton_Image.scaleX;
        this.ControlsButton_Image.setDepth(1990);
        this.ControlsButton_OriginalPosX = this.ControlsButton_Image.x;
        this.ControlsButton_OriginalScale = this.ControlsButton_Image.scaleY;

        this.ControlsButton = this.add.sprite(this.ControlsButton_Image.x, this.ControlsButton_Image.y,'Play-Button').setInteractive();
        this.ControlsButton.displayWidth = 245;
        this.ControlsButton.scaleY= this.ControlsButton.scaleX;
        this.ControlsButton.setDepth(2000);
        this.ControlsButton.alpha = 0.0001;

        var that = this;

        this.ControlsButton.on('pointerdown', function(){
            that.ControlsButtonSelected = true;
            that.tweens.add({
                targets: that.ControlsButton_Image,
                scaleX: 0.9,
                scaleY: 0.9,
                ease: 'Linear',
                duration: 55,
                yoyo: true,
                repeat: 0
            });
        });

        this.ControlsButton.on('pointerover', function() {
            if(that.ControlsButtonSelected === false){
                that.tweens.add({
                    targets: that.ControlsButton_Image,
                    scaleX: 0.92,
                    scaleY: 0.92,
                    ease: 'Linear' ,
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
            }
         });

         this.ControlsButton.on('pointerout', function() {
                    that.tweens.add({
                    targets: that.ControlsButton_Image,
                    scaleX: that.ControlsButton_OriginalScale,
                    scaleY: that.ControlsButton_OriginalScale,
                    ease: 'Linear' ,
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
                that.ControlsButtonSelected = false;
             
         });
    }

    InitAudioButton(){
        this.AudioButtonSelected = false;
        this.AudioButton_Image = this.add.sprite(0, 0,'Play-Button').setInteractive();
        this.AudioButton_Image.alpha = 0;
        this.AudioButton_Image.displayWidth = 230;
        this.AudioButton_Image.scaleY= this.AudioButton_Image.scaleX;
        this.AudioButton_Image.setDepth(1990);
        this.AudioButton_OriginalPosX = this.AudioButton_Image.x;
        this.AudioButton_OriginalScale = this.AudioButton_Image.scaleY;

        this.AudioButton = this.add.sprite(this.AudioButton_Image.x, this.AudioButton_Image.y,'Play-Button').setInteractive();
        this.AudioButton.displayWidth = 245;
        this.AudioButton.scaleY= this.AudioButton.scaleX;
        this.AudioButton.setDepth(2000);
        this.AudioButton.alpha = 0.0001;

        var that = this;

        this.AudioButton.on('pointerdown', function(){
            that.AudioButtonSelected = true;
            that.tweens.add({
                targets: that.AudioButton_Image,
                scaleX: 0.9,
                scaleY: 0.9,
                ease: 'Linear',
                duration: 55,
                yoyo: true,
                repeat: 0
            });
        });

        this.AudioButton.on('pointerover', function() {
            if(that.AudioButtonSelected === false){
                that.tweens.add({
                    targets: that.AudioButton_Image,
                    scaleX: 0.92,
                    scaleY: 0.92,
                    ease: 'Linear' ,
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
            }
         });

         this.AudioButton.on('pointerout', function() {
             that.AudioButtonSelected = false;
             if(that.AudioButtonSelected === false){
                    that.tweens.add({
                    targets: that.AudioButton_Image,
                    scaleX: that.AudioButton_OriginalScale,
                    scaleY: that.AudioButton_OriginalScale,
                    ease: 'Linear' ,
                    duration: 80,
                    yoyo: false,
                    repeat: 0
                });
             }
         });
    }

    InitPlayButton(){
        this.PlayButtonSelected = false;
        this.PlayButton_Image = this.add.sprite(this.width/6.5,this.height/1.504,'Play-Button').setInteractive();
        this.PlayButton_Image.displayWidth = this.RelativeScale(17.5,"x");
        this.PlayButton_Image.scaleY= this.PlayButton_Image.scaleX;
        this.PlayButton_Image.setDepth(1990);
        this.playButton_OriginalPosX = this.PlayButton_Image.x;
        this.playButton_OriginalScale = this.PlayButton_Image.scaleY;

        this.PlayButton = this.add.sprite(this.PlayButton_Image.x, this.PlayButton_Image.y,'Play-Button').setInteractive();
        this.PlayButton.displayWidth = 245;
        this.PlayButton.scaleY= this.PlayButton.scaleX;
        this.PlayButton.setDepth(2000);
        this.PlayButton.alpha = 0.0001;

        var that = this;

        this.PlayButton.on('pointerdown', function(){
            that.PlayButtonSelected = true;
            that.tweens.add({
                targets: that.PlayButton_Image,
                scaleX: that.PlayButton_Image.scaleX - 0.02,
                scaleY: that.PlayButton_Image.scaleX - 0.02,
                ease: 'Linear',
                duration: 55,
                yoyo: true,
                repeat: 0
            });
            // that.sound2.play();
            that.cameras.main.fadeOut(200);
            that.scene.get("mainMenu").time.addEvent({delay: 210, callback: function(){that.scene.start('platformTesting');}, callbackScope:this, loop:false});
        });

        this.PlayButton.on('pointerover', function() {
            if(that.PlayButtonSelected === false){
            that.tweens.add({
                targets: that.PlayButton_Image,
                scaleX: that.PlayButton_Image.scaleX - 0.04,
                scaleY: that.PlayButton_Image.scaleX - 0.04,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            }
        });

        this.PlayButton.on('pointerout', function() {
            that.tweens.add({
                targets: that.PlayButton_Image,
                scaleX: that.playButton_OriginalScale,
                scaleY: that.playButton_OriginalScale,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            that.PlayButtonSelected = false;
        });
    }

    InitSettingsButton(){
        this.SettingsButtonSelected = false;
        this.SettingsButtonSelected_Opened = false;
        this.SettingsButton_Image = this.add.sprite(this.width/6.5,this.height/1.32,'Settings-Button').setInteractive();
        this.SettingsButton_Image.displayWidth = this.RelativeScale(17.5,"x");
        this.SettingsButton_Image.scaleY= this.SettingsButton_Image.scaleX;
        this.SettingsButton_Image.setDepth(1990);
        this.settingsButton_OriginalPosX = this.SettingsButton_Image.x;
        this.settingsButton_OriginalScale = this.SettingsButton_Image.scaleY;

        this.SettingsButton = this.add.sprite(this.SettingsButton_Image.x, this.SettingsButton_Image.y,'Settings-Button').setInteractive();
        this.SettingsButton.displayWidth = 245;
        this.SettingsButton.scaleY= this.SettingsButton.scaleX;
        this.SettingsButton.setDepth(2000);
        this.SettingsButton.alpha = 0.0001;

        var that = this;

        this.SettingsButton.on('pointerdown', function(){
            if(that.SettingsButtonSelected === false && that.SettingsButtonSelected_Opened === false){
                that.tweens.add({
                    targets: that.SettingsButtonsContainer,
                    x: that.SettingsButtonsContainer.x + 20,
                    ease: 'Sine.easeInOut',
                    duration: 350,
                    yoyo: false,
                    repeat: 0
                });
    
                that.tweens.add({
                    targets: that.ControlsButton_Image,
                    alpha: 1,
                    ease: 'Sine.easeInOut',
                    duration: 350,
                    yoyo: false,
                    repeat: 0
                });
    
                that.tweens.add({
                    targets: that.AudioButton_Image,
                    alpha: 1,
                    ease: 'Sine.easeInOut',
                    duration: 350,
                    yoyo: false,
                    repeat: 0
                });
    
                that.tweens.add({
                    targets: that.SettingsMenuBackground,
                    x: that.SettingsMenuBackground_OriginalPosX - 640,
                    ease: 'Sine.easeInOut',
                    duration: 350,
                    yoyo: false,
                    repeat: 0
                });
                
            }

            that.tweens.add({
                targets: that.SettingsButton_Image,
                scaleX: that.SettingsButton_Image.scaleX - 0.02,
                scaleY: that.SettingsButton_Image.scaleY - 0.02,
                ease: 'Linear',
                duration: 55,
                yoyo: true,
                repeat: 0
            });

            that.SettingsButtonSelected = true;
            that.SettingsButtonSelected_Opened = true;
        });

        this.SettingsButton.on('pointerover', function() {
            if(that.SettingsButtonSelected === false){
            that.tweens.add({
                targets: that.SettingsButton_Image,
                scaleX: that.SettingsButton_Image.scaleX - 0.04,
                scaleY: that.SettingsButton_Image.scaleY - 0.04,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            }
        });

         this.SettingsButton.on('pointerout', function() {
            that.tweens.add({
                targets: that.SettingsButton_Image,
                scaleX: that.settingsButton_OriginalScale,
                scaleY: that.settingsButton_OriginalScale,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            that.SettingsButtonSelected = false;
         });
    }

    InitCreditsButton(){
        this.CreditsButtonSelected = false;
        this.CreditsButton_Image = this.add.sprite(this.width/6.5,this.height/1.175,'Credits-Button').setInteractive();
        this.CreditsButton_Image.displayWidth = this.RelativeScale(17.5,"x");
        this.CreditsButton_Image.scaleY= this.CreditsButton_Image.scaleX;
        this.CreditsButton_Image.setDepth(1990);
        this.creditsButton_OriginalPosX = this.CreditsButton_Image.x;
        this.creditsButton_OriginalScale = this.CreditsButton_Image.scaleY;

        this.CreditsButton = this.add.sprite(this.CreditsButton_Image.x, this.CreditsButton_Image.y,'Credits-Button').setInteractive();
        this.CreditsButton.displayWidth = 245;
        this.CreditsButton.scaleY= this.CreditsButton.scaleX;
        this.CreditsButton.setDepth(2000);
        this.CreditsButton.alpha = 0.0001;

        var that = this;

        this.CreditsButton.on('pointerdown', function(){
            that.CreditsButtonSelected = true;
                that.tweens.add({
                    targets: that.CreditsButton_Image,
                    scaleX: that.CreditsButton_Image.scaleX - 0.02,
                    scaleY: that.CreditsButton_Image.scaleY - 0.02,
                    ease: 'Linear',
                    duration: 55,
                    yoyo: true,
                    repeat: 0
                });
            
        });

        this.CreditsButton.on('pointerover', function() {
            if(that.CreditsButtonSelected === false){
            that.tweens.add({
                targets: that.CreditsButton_Image,
                scaleX: that.CreditsButton_Image.scaleX - 0.04,
                scaleY: that.CreditsButton_Image.scaleY - 0.04,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            }
         });

         this.CreditsButton.on('pointerout', function() {
            that.tweens.add({
                targets: that.CreditsButton_Image,
                scaleX: that.creditsButton_OriginalScale,
                scaleY: that.creditsButton_OriginalScale,
                ease: 'Linear' ,
                duration: 80,
                yoyo: false,
                repeat: 0
            });
            that.CreditsButtonSelected = false;
         });
    }

    InitSettingsMenu(){
        this.SettingsMenuBackground = this.add.sprite(this.width/1.31 + 640,this.height / 2,'Settings-Menu-Background').setInteractive();
        this.SettingsMenuBackground.setDepth(1990);
        this.SettingsMenuBackground_OriginalPosX = this.SettingsMenuBackground.x;

    }

    PlayTitle1Tween(){
        this.title1 = this.add.sprite(this.width / 2.2, this.height/6,'Title-Example');
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

    PlayTitle2Tween(){
        this.title2 = this.add.sprite(this.width / 1.8, this.height/4.5,'Title-Title');
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

    update(){
        this.ControlsButton_Image.x = this.SettingsButtonsContainer.x;
        this.ControlsButton_Image.y = this.SettingsButtonsContainer.y - 32.5;
        this.ControlsButton.x = this.ControlsButton_Image.x;
        this.ControlsButton.y = this.ControlsButton_Image.y;

        this.AudioButton_Image.x = this.SettingsButtonsContainer.x;
        this.AudioButton_Image.y = this.SettingsButtonsContainer.y + 32.5;
        this.AudioButton.x = this.AudioButton_Image.x;
        this.AudioButton.y = this.AudioButton_Image.y;
    }
}