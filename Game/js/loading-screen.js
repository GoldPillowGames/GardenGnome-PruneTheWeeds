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

        this.load.image('Circle-UI', 'assets/test/circle-ui.png');
        this.load.image('Frog', 'assets/test/Rana1.png');
        this.load.image('Arrow', 'assets/props/arrow.png');
        this.load.image('Cross', 'assets/props/cross.png');
        this.load.image('Tick', 'assets/props/tick.png');

        this.load.image('BaseFloor1', ['assets/Level 1/sueloTileado.png', 'assets/Level 1/sueloTileado_n.png']);
        this.load.image('BaseSky1', 'assets/Level 1/cielo_base2.png');

        this.load.image('BaseFloor2', 'assets/Level 2/sueloTileadoNoche.png');
        this.load.image('BaseSky2', 'assets/Level 2/cielo_base_noche.png');

        this.load.image('WoodFenceNight', 'assets/Level 2/verjas_madera_noche.png');
        this.load.image('BrokenFenceNight', 'assets/Level 2/verjas_rotas_noche.png');

        this.load.image('MetalFence', 'assets/props/metal_fence.png');
        this.load.image('WoodFence', ['assets/props/wood_fence_small.png', 'assets/props/wood_fence_small_n.png']);
        this.load.image('Grass', ['assets/props/grass.png', 'assets/props/grass_n.png']);
        this.load.image('GrassNight', 'assets/Level 2/hierba_noche.png');
        this.load.image('Shovel1', ['assets/props/shovel1.png', 'assets/props/shovel1_n.png']);
        this.load.image('Shovel2', ['assets/props/shovel2.png', 'assets/props/shovel2_n.png']);
        this.load.image('Shovel3', ['assets/props/shovel3.png', 'assets/props/shovel3_n.png']);
        this.load.image('Shovel1Night', 'assets/Level 2/pala1_noche.png');
        this.load.image('Shovel2Night', 'assets/Level 2/pala2_noche.png');
        this.load.image('Shovel3Night', 'assets/Level 2/pala3_noche.png');
        this.load.image('Rake', ['assets/props/rake.png', 'assets/props/rake_n.png']);
        this.load.image('RakeNight', 'assets/Level 2/rastrillo_noche.png');
        this.load.image('DarkBackground', 'assets/end-game-backgroundLittle.png');
        this.load.image('LogoJuego', 'assets/main-menu/logo.png');
        this.load.image('House', 'assets/props/house.png');
        this.load.image('gnome-dead', ['assets/character/gnome-dead.png', 'assets/character/gnome-dead_n.png']);
        this.load.image('gnome-hurt', ['assets/character/gnome-hurt.png', 'assets/character/gnome-hurt_n.png']);

        this.load.audio('theme1', 'assets/audio/level1.wav');
        this.load.audio('menu-theme', 'assets/audio/menu-theme.wav');
        this.load.audio('battle-theme1', 'assets/audio/battle-theme1.wav');

        this.load.audio('ButtonSound', 'assets/menu-sounds/papersound4.mp3');

        this.load.audio('axeAttack', 'assets/audio/sfx/axe-attack.wav');
        this.load.audio('enemyDeath1', 'assets/audio/sfx/death1.wav');
        this.load.audio('enemyDamage1', 'assets/audio/sfx/enemyDamage1.wav');
        this.load.audio('finalAttack1', 'assets/audio/sfx/final-attack.mp3');
        this.load.audio('gnomeDamaged1', 'assets/audio/sfx/gnomeDamaged1.wav');
        this.load.audio('walkSound', 'assets/audio/sfx/walkingSound.mp3');

        this.load.image('SettingsBackground', ['assets/main-menu/settings-background.png', 'assets/main-menu/settings-background_n3.png']);
        this.load.image('SliderBar', 'assets/main-menu/slider-bar.png');
        this.load.image('Plus', 'assets/main-menu/plus.png');
        this.load.image('Minus', 'assets/main-menu/minus.png');
        this.load.image('ExitButton', 'assets/main-menu/exit.png');

        this.load.image('Play-Button'    , 'assets/main-menu/play.png');
        this.load.image('Settings-Button', 'assets/main-menu/settings.png');
        this.load.image('Credits-Button' , 'assets/main-menu/credits.png');
        this.load.image('Level-1'        , 'assets/main-menu/level_1.png');
        this.load.image('Level-2'        , 'assets/main-menu/level_2.png');
        this.load.image('Easy-Button'    , 'assets/main-menu/easy.png');
        this.load.image('Hard-Button'    , 'assets/main-menu/hard.png');
        this.load.image('GnomeHead' , 'assets/character/gnomehead.png');
        this.load.image('AxeIcon', 'assets/main-menu/score-icon.png');
        this.load.image('AxeIconBorderless', 'assets/main-menu/score-icon-borderless.png');

        this.load.image('arrowRight' , 'assets/main-menu/right.png');
        this.load.image('arrowLeft' , 'assets/main-menu/left.png');

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
            y: that.height / 1.06,
            text: 'Please wait...',
            style: {
                font: '26px amazingkids_font',
                fill: '#ffffff'
                
            }
            
        });
        loadingText.setOrigin(0.5, 0.5);
        loadingText.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
        loadingText.scaleY = loadingText.scaleY;

        let percentText = this.make.text({
            x: that.width / 2,
            y: that.height / 1.11675,
            text: '0%',
            style: {
                font: '22px amazingkids_font',
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        percentText.scaleX = UsefulMethods.RelativeScale(0.08, "x", this);
        percentText.scaleY = percentText.scaleY;

        this.load.on('progress', (percent) => {
            loadingBar.clear();
            percentText.setText(parseInt(percent * 100) + '%');

            loadingBar.fillRect(that.width / 2 - that.width / 2.423,
                that.height / 1.145,
                that.width * percent / 1.216,
                30);
            loadingBar.strokeRect(that.width / 2 - that.width / 2.423,
                that.height / 1.145,
                that.width / 1.216,
                30);
        })

        this.load.on('fileprogress', (file) => {

        })
        this.load.on('complete', () => {
            that.isLoading = false;
            var isPC = !(that.sys.game.device.os.android || that.sys.game.device.os.iOS || that.sys.game.device.os.iPad || that.sys.game.device.os.iPhone);
            isPC ? loadingText.setText('Click anywhere to start') : loadingText.setText('Touch anywhere to start');
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
            frames: [ { key: 'WalkingGnome', frame: 2 } ],
            frameRate: 20
          });
          this.anims.create({
            key: 'GnomeHurt',
            frames: [{ key: "gnome-hurt", frame: 0 }],
            frameRate: 20,
          });
      }
}
