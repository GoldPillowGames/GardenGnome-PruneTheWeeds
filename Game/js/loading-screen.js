// Clase correspondiente a la escena de carga.
export default class LoadingScreen extends Phaser.Scene {
    // Constructor de la escena.
    constructor() {
        super("LoadingScreen");
        this.isLoading = true;
        this.isFading = false;
    }

    // Funcion preload que carga los assets.
    preload() {
        this.load.image('logo', 'assets/logo.png');

        this.load.image('Law', 'assets/test/Law.jpg');
        this.load.image('Floor', 'assets/game-elements/ground.png');
        this.load.image('Circle-UI', 'assets/test/circle-ui.png');
        this.load.image('Frog', 'assets/test/Rana1.png');
        this.load.image('Arrow', 'assets/Props/arrow.png');

        this.load.image('BaseFloor1', ['assets/Level 1/sueloTileado.png', 'assets/Level 1/sueloTileado_n.png']);
        this.load.image('BaseSky1', 'assets/Level 1/cielo_base2.png');

        this.load.image('MetalFence', 'assets/Props/metal_fence.png');
        this.load.image('WoodFence', ['assets/Props/wood_fence_small.png', 'assets/Props/wood_fence_small_n.png']);
        this.load.image('Grass', ['assets/Props/grass.png', 'assets/Props/grass_n.png']);
        this.load.image('Shovel1', ['assets/Props/shovel1.png', 'assets/Props/shovel1_n.png']);
        this.load.image('Shovel2', ['assets/Props/shovel2.png', 'assets/Props/shovel2_n.png']);
        this.load.image('Shovel3', ['assets/Props/shovel3.png', 'assets/Props/shovel3_n.png']);
        this.load.image('Rake', ['assets/Props/rake.png', 'assets/Props/rake_n.png']);
        this.load.image('StreetLight', 'assets/test/lightplaceholder.png');

        this.load.spritesheet('Character', 'assets/test/spritesheet-1.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('CarnivoreFlower', 'assets/enemies/texture.png', {
            frameWidth: 550,
            frameHeight: 660
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

        this.load.video('intro', 'assets/videos/intro.mp4', 'canplaythrough', true, false);

        // Codigo relativo a la barra de carga.
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        var that = this;

        let background = this.add.graphics({
            fillStyle: {
                color: 0x404040
            }
        });
        background.fillRect(0, 0, that.width, that.height);

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
            y: that.height / 2 - 20,
            text: 'Please wait...',
            style: {
                font: '18px Monaco',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: that.width / 2,
            y: that.height / 2 + 10,
            text: '0%',
            style: {
                font: '14px Impact',
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: that.width / 2,
            y: that.height / 2 + 40,
            text: '',
            style: {
                font: '18px Monaco',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', (percent) => {
            loadingBar.clear();
            percentText.setText(parseInt(percent * 100) + '%');

            loadingBar.fillRect(that.width / 2 - that.width / 8,
                that.height / 2,
                that.width * percent / 4,
                20);
            loadingBar.strokeRect(that.width / 2 - that.width / 8,
                that.height / 2,
                that.width / 4,
                20);
        })

        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading: ' + file.key);
        })
        this.load.on('complete', () => {
            that.isLoading = false;
            loadingText.setText('Click anywhere to start');
            assetText.setText('Load complete.');
        })

    }
    
    create() {
        
        var that = this;

        this.input.on('pointerdown', function () {
            if (!that.isLoading && !that.isFading) {
                that.isFading = true;

                that.cameras.main.fadeOut(200);
                that.scene.get("LoadingScreen").time.addEvent({ delay: 210, callback: function () { that.scene.start("SplashScreen"); }, callbackScope: this, loop: false });

                //that.customTransition(this.scene, 'SplashScreen', 1000);
            }
        });
    }
}
