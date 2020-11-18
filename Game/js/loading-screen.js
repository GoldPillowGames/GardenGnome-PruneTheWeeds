import UsefulMethods from '../js/useful-methods.js';

// Clase correspondiente a la escena de carga.
export default class LoadingScreen extends Phaser.Scene {
    // Constructor de la escena.
    constructor() {
        super({
          key: "LoadingScreen"
          // pack: {
          //   files: [
          //       {
          //           type: 'video',
          //           key: 'simple_bg',
          //           url: './assets/videos/intro.mp4'
          //       }
          //     ]
          //   }
        });
        this.isLoading = true;
        this.isFading = false;
    }

    // Funcion preload que carga los assets.
    preload() {
      
        //this.load.image('logo', 'assets/logo.png');

        this.load.image('Law', 'assets/test/Law.jpg');
        this.load.image('Floor', 'assets/game-elements/ground.png');
        this.load.image('Circle-UI', 'assets/test/circle-ui.png');
        this.load.image('Frog', 'assets/test/Rana1.png');
        this.load.image('Arrow', 'assets/props/arrow.png');
        this.load.image('Cross', 'assets/props/cross.png');
        this.load.image('Tick', 'assets/props/tick.png');

        this.load.image('BaseFloor1', ['assets/Level 1/sueloTileado.png', 'assets/Level 1/sueloTileado_n.png']);
        this.load.image('BaseSky1', 'assets/Level 1/cielo_base2.png');

        this.load.image('MetalFence', 'assets/props/metal_fence.png');
        this.load.image('WoodFence', ['assets/props/wood_fence_small.png', 'assets/props/wood_fence_small_n.png']);
        this.load.image('Grass', ['assets/props/grass.png', 'assets/props/grass_n.png']);
        this.load.image('Shovel1', ['assets/props/shovel1.png', 'assets/props/shovel1_n.png']);
        this.load.image('Shovel2', ['assets/props/shovel2.png', 'assets/props/shovel2_n.png']);
        this.load.image('Shovel3', ['assets/props/shovel3.png', 'assets/props/shovel3_n.png']);
        this.load.image('Rake', ['assets/props/rake.png', 'assets/props/rake_n.png']);
        this.load.image('StreetLight', 'assets/test/lightplaceholder.png');
        this.load.image('DarkBackground', 'assets/end-game-background.png');
        this.load.image('LogoJuego', 'assets/main-menu/logo.png');
        this.load.image('gnome-dead', ['assets/character/gnome-dead.png', 'assets/character/gnome-dead_n.png']);

        

        this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        
        this.load.image('SettingsBackground', ['assets/main-menu/settings-background.png', 'assets/main-menu/settings-background_n3.png']);
        this.load.image('SliderBar', 'assets/main-menu/slider-bar.png');
        this.load.image('Plus', 'assets/main-menu/plus.png');
        this.load.image('Minus', 'assets/main-menu/minus.png');
        this.load.image('ExitButton', 'assets/main-menu/exit.png');

        this.load.image('Title-Example'  , 'assets/test/example.png');
        this.load.image('Title-Title'    , 'assets/test/title.png');
        this.load.image('Play-Button'    , 'assets/main-menu/play.png');
        this.load.image('Settings-Button', 'assets/main-menu/settings.png');
        this.load.image('Credits-Button' , 'assets/main-menu/rankings.png');
        this.load.image('Easy-Button'    , 'assets/main-menu/easy.png');
        this.load.image('Hard-Button'    , 'assets/main-menu/hard.png');
        this.load.image('Settings-Menu-Background', 'assets/test/settings-menu-background.png');
        this.load.image('GnomeHead' , 'assets/character/gnomehead.png');

        this.load.image('Exit' , 'assets/props/exit.png');

        this.loadAssetsEnemies();

        //this.load.video('intro', 'assets/videos/intro.mp4', 'canplaythrough', true, false);

        

        // Codigo relativo a la barra de carga.
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        var that = this;
        //this.add.image(0, 0, "simple_bg").setOrigin(0, 0).setScale(this.width/2, this.height/2);
        this.video = this.add.video(UsefulMethods.RelativePosition(50, "x", this), UsefulMethods.RelativePosition(50, "y", this), 'intro');
        // video.displayHeight = this.height;
        // video.displayWidth = this.width;
        this.video.play(true);
        this.video.setLoop(true);
        
        this.loadVideo = function(){ 
          if(!document["hidden"]){
            that.video = that.add.video(UsefulMethods.RelativePosition(50, "x", that), UsefulMethods.RelativePosition(50, "y", that), 'intro');
            that.video.play(true);
            that.video.displayHeight = that.height;
            that.video.displayWidth = that.width;
            if(that.video.isPlaying()){
              UsefulMethods.print(that.video.isPlaying());
            }
            that.video.setLoop(true);
            
          }
        }
        document.addEventListener("visibilitychange", this.loadVideo());
        // let background = this.add.graphics({
        //     fillStyle: {
        //         color: 0x404040
        //     }
        // });
        // background.fillRect(0, 0, that.width, that.height);

        let loadingBar = this.add.graphics({
            lineStyle: {
                width: 3,
                color: 0x996600
            },
            fillStyle: {
                color: 0xffff00
            }
        });

        let loadingText = this.make.text({
            x: that.width / 2,
            y: that.height / 1.065,
            text: 'Please wait...',
            style: {
                font: '18px Monaco',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: that.width / 2,
            y: that.height / 1.12 - 1.5,
            text: '0%',
            style: {
                font: '14px Impact',
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // let assetText = this.make.text({
        //     x: that.width / 2,
        //     y: that.height / 2 + 40,
        //     text: '',
        //     style: {
        //         font: '18px Monaco',
        //         fill: '#ffffff'
        //     }
        // });
        // assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', (percent) => {
            loadingBar.clear();
            percentText.setText(parseInt(percent * 100) + '%');

            loadingBar.fillRect(that.width / 2 - that.width / 2.4,
                that.height / 1.145,
                that.width * percent / 1.2115,
                25);
            loadingBar.strokeRect(that.width / 2 - that.width / 2.4,
                that.height / 1.145,
                that.width / 1.2115,
                25);
        })

        this.load.on('fileprogress', (file) => {
            //assetText.setText('Loading: ' + file.key);
        })
        this.load.on('complete', () => {
            that.isLoading = false;
            loadingText.setText('Click anywhere to start');
            //assetText.setText('Load complete.');
        })

    }
    
    loadAssetsEnemies(){
        this.load.spritesheet('CarnivoreFlower', 'assets/enemies/texture.png', {
          frameWidth: 550,
          frameHeight: 660
      });
  
  
      this.load.spritesheet('IdleCactus' , 'assets/enemies/cactusidle.png',{
          frameWidth: 640,
          frameHeight: 360
      });
  
  
        this.load.spritesheet('AttackCactus' , 'assets/enemies/cactusattack.png',{
          frameWidth: 640,
          frameHeight: 360
      });
  
      this.load.spritesheet('IdleFrog' , 'assets/enemies/frogidle.png',{
          frameWidth: 640,
          frameHeight: 360
      });
  
  
        this.load.spritesheet('AttackFrog' , 'assets/enemies/frogattacklittle.png',{
          frameWidth: 640,
          frameHeight: 360
      });
  
  
      this.load.spritesheet('IdleMushroom' , 'assets/enemies/mushroomidle.png',{
          frameWidth: 640,
          frameHeight: 360
      });
  
  
        this.load.spritesheet('AttackMushroom' , 'assets/enemies/mushroomattack.png',{
          frameWidth: 640,
          frameHeight: 360
      });

      this.load.spritesheet('IdleSnail' , 'assets/enemies/snailidle.png',{
        frameWidth: 640,
        frameHeight: 360
    });


      this.load.spritesheet('AttackSnail' , 'assets/enemies/snailattack.png',{
        frameWidth: 640,
        frameHeight: 360
    });

    this.load.spritesheet('IdlePlant' , 'assets/enemies/plantidle.png',{
        frameWidth: 640,
        frameHeight: 360
    });


      this.load.spritesheet('AttackPlant' , 'assets/enemies/plantattack.png',{
        frameWidth: 640,
        frameHeight: 360
    });

    this.load.spritesheet('WalkingGnome', 'assets/character/gnomewalking.png',{
        frameWidth: 455,
        frameHeight:430
    });
    
    this.load.spritesheet('AttackingGnome', 'assets/character/gnomeattackingshort.png',{
        frameWidth: 455,
        frameHeight:430
    });

    this.load.spritesheet('ParryUpGnome', 'assets/character/gnomeparryup.png', {frameWidth: 455, frameHeight: 430});
    this.load.spritesheet('ParryDownGnome', 'assets/character/gnomeparrydown.png', {frameWidth: 455, frameHeight: 430});

    }

    create() {

        this.createAnimationsEnemies();
        
        var that = this;

        this.input.on('pointerdown', function () {
            if (!that.isLoading && !that.isFading) {
                that.isFading = true;

                that.cameras.main.fadeOut(200);
                that.scene.get("LoadingScreen").time.addEvent({ delay: 210, callback: function () { that.scene.start("mainMenu"); }, callbackScope: this, loop: false });

                //that.customTransition(this.scene, 'SplashScreen', 1000);
            }
        });
    }

    createAnimationsEnemies(){
        this.anims.create({
          key: 'FrogIdleAnim',
          frames: this.anims.generateFrameNumbers('IdleFrog', { start: 0, end: 6 }),
          frameRate: 9,
          repeat: -1
        });
      
      
      this.anims.create({
          key: 'FrogAttackAnim',
          frames: this.anims.generateFrameNumbers('AttackFrog', { start: 0, end: 9 }),
          frameRate: 7,
          repeat: -1
        });
    
      this.anims.create({
          key: 'CactusIdleAnim',
          frames: this.anims.generateFrameNumbers('IdleCactus', { start: 0, end: 5 }),
          frameRate: 9,
          repeat: -1
        });
    
    
      this.anims.create({
          key: 'MushroomAttackAnim',
          frames: this.anims.generateFrameNumbers('AttackMushroom', { start: 0, end: 11 }),
          frameRate: 12,
          repeat: -1
        });
    
        this.anims.create({
          key: 'MushroomIdleAnim',
          frames: this.anims.generateFrameNumbers('IdleMushroom', { start: 0, end: 7 }),
          frameRate: 9,
          repeat: -1
        });
    
    
      this.anims.create({
          key: 'CactusAttackAnim',
          frames: this.anims.generateFrameNumbers('AttackCactus', { start: 0, end: 11 }),
          frameRate: 8,
          repeat: -1
        });

        this.anims.create({
            key: 'SnailIdleAnim',
            frames: this.anims.generateFrameNumbers('IdleSnail', { start: 0, end: 7 }),
            frameRate: 9,
            repeat: -1
          });
      
      
        this.anims.create({
            key: 'SnailAttackAnim',
            frames: this.anims.generateFrameNumbers('AttackSnail', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'PlantIdleAnim',
            frames: this.anims.generateFrameNumbers('IdlePlant', { start: 0, end: 5 }),
            frameRate: 9,
            repeat: -1
          });
      
      
        this.anims.create({
            key: 'PlantAttackAnim',
            frames: this.anims.generateFrameNumbers('AttackPlant', { start: 0, end: 11 }),
            frameRate: 12,
            repeat: -1
          });


          this.anims.create({
            key: 'GnomeAttackAnim',
            frames: this.anims.generateFrameNumbers('AttackingGnome', { start: 0, end: 2 }),
            frameRate: 9,
            repeat: 0
          });

          this.anims.create({
            key: 'GnomeAttackAnimLast',
            frames: this.anims.generateFrameNumbers('AttackingGnome', { start: 1, end: 2 }),
            frameRate: 9,
            repeat: 0
          });

          this.anims.create({
            key: 'GnomeParryUp',
            frames: [ { key: 'ParryUpGnome', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'GnomeParryDown',
            frames: [ { key: 'ParryDownGnome', frame: 0 } ],
            frameRate: 20
        });

          this.anims.create({
            key: 'GnomeWalkAnim',
            frames: this.anims.generateFrameNumbers('WalkingGnome', { start: 0, end: 9 }),
            frameRate: 16,
            repeat: -1
          });
          this.anims.create({
            key: 'GnomeStopAnim',
            frames: this.anims.generateFrameNumbers('WalkingGnome', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: -1
          });
    
      }
}
