/**
 * Codigo desarrollado por:
 * -
 * German Lopez Gutierrez
 * Ignacio Atance Loras
 * Alberto Romero Abarca
 * Jorge Sanchez Sanchez
 * Elvira 
 * -
 */

//Escena para testeo de juego de plataformas
class platformTesting extends Phaser.Scene{
    //Constructor de la escena, con el identificador de la misma.
    constructor(){
        super({key:"platformTesting"});
    }

  /**
   * Método que se ejecuta ANTES de cargar la página
   * En el se inicializan los sprites y otros elementos
   * como la barra de carga
   */
  preload(){
    // #region VARIABLES
    this.debugMode             = true;

    //this.sys.game.config.width = 100;
    
    this.width                 = this.sys.game.config.width;
    this.height                = this.sys.game.config.height;
    
    this.nullGravity           = -1000;
    this.jumpForce             = -535;
    this.xSpeed                = 180; // 280
    this.ended                 = false;
    this.isPlayable            = false;
    this.pointerOver           = true;
    this.fallingP1             = false;

    // Movimiento con ratón o pulsación
    this.isMouseMoving = false;
    this.initialMouseX = 0;
    this.initialMouseY = 0;
    
    this.player1CanMove    = true;

    this.DButton = this.input.keyboard.addKey('D');
    this.AButton = this.input.keyboard.addKey('A');
    this.WButton = this.input.keyboard.addKey('W');

    this.rightButton = this.input.keyboard.addKey('right');
    this.leftButton  = this.input.keyboard.addKey('left');
    this.upButton    = this.input.keyboard.addKey('space');
    // #endregion

    this.load.image('Law'       ,  'assets/test/Law.jpg');
    this.load.image('Floor'     ,  'assets/game-elements/ground.png');
    this.load.image('Circle-UI' ,  'assets/test/circle-ui.png');
  }

  /**
   * Método que se ejecuta al comienzo del juego, cuandos se ha creado todo.
   */
  create(){

    this.movementPointerId = 0;
    this.input.addPointer(2);

    this.InitFloor();
    this.InitPlayer();   
    this.InitColliders();
    this.InitMobileCircleUI();

    if(this.debugMode)
    {
        this.HandleMobileTouchMovement();
    }
    else
    {
      if(this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone)
      {
        this.HandleMobileTouchMovement();
      }
    }

    this.SetupCamera();
  }

  /**
   * Configura la cámara (seguimiento, zoom, etc)
   */
  SetupCamera(){
    // Ambos zooms sirven
    // this.cameras.main.setZoom(1.3);
    // this.cameras.main.zoom = 0.5;

    // La cámara sigue al jugador
    this.cameras.main.startFollow(this.player1, true, 0.09, 0.09);
  }

  /**
   * Configura la UI que únicamente será mostrada en móvil (pulsación sobre la pantalla)
   */
  InitMobileCircleUI(){
    this.circle_UI = this.add.sprite(this.RelativePosition(0, "x"), this.RelativePosition(0, "y"), 'Circle-UI').setInteractive();
    this.circle_UI.alpha = 0;
    this.circle_UI.scaleX = 0.32;
    this.circle_UI.scaleY= this.circle_UI.scaleX;
    this.circle_UI.setDepth(10000);

    this.circle_UI_Base = this.add.sprite(this.width,this.height,'Circle-UI').setInteractive();
    this.circle_UI_Base.alpha = 0;
    this.circle_UI_Base.scaleX= 0.02;
    this.circle_UI_Base.scaleY= this.circle_UI_Base.scaleX;
    this.circle_UI_Base.setDepth(11000);
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

  /**
   * Configura el movimiento del personaje mediante la pulsación sobre la pantalla
   * en dispositivos móviles
   */
  HandleMobileTouchMovement(){
    // Cuando el presiona el click izquierdo en el estado de caminar se
    // guarda la coordenada inicial del ratón en el eje x
    this.input.on('pointerdown', function (pointer) {
      if(this.isMouseMoving === false){
        this.movementPointerId = pointer.id;
        this.isMouseMoving = true;
        this.initialMouseX = pointer.x /*+ this.cameras.main.x*/;
        this.initialMouseY = pointer.y /*+ this.cameras.main.y*/;
        this.circle_UI_Base.x = this.initialMouseX;
        this.circle_UI_Base.y = this.initialMouseY;
        this.circle_UI.x = Phaser.Math.Clamp(pointer.x, this.initialMouseX - 150, this.initialMouseX + 150);
        this.circle_UI.y = Phaser.Math.Clamp(pointer.y, this.initialMouseY - 150, this.initialMouseY + 150);
        this.tweens.add({
          targets: this.circle_UI,
          alpha: 0.65,
          scaleX: 0.35,
          scaleY: 0.35,
          ease: 'Linear' ,
          duration: 80,
          yoyo: false,
          repeat: 0
        });
        this.tweens.add({
          targets: this.circle_UI_Base,
          alpha: 0.65,
          scaleX: 0.025,
          scaleY: 0.025,
          ease: 'Linear' ,
          duration: 80,
          yoyo: false,
          repeat: 0
        });
      }
    }, this);

    // Cuando se mantiene presionado el click izquierdo del ratón y
    // se mueve el ratón, se resta la posición anterior del ratón en el eje x
    // a la actual y en función del valor obtenido, el personaje se mueve en una u
    // otra dirección
    this.input.on('pointermove', function (pointer) {
      // Comprobamos si el id del puntero es el mismo que inició el movimiento
      if(this.movementPointerId === pointer.id){
        if(this.isMouseMoving){
          if(pointer.x - this.initialMouseX > 0){
            this.player1.setVelocityX(this.xSpeed);
            //print("Moving");
          }
          else if(pointer.x - this.initialMouseX < 0){
            this.player1.setVelocityX(-this.xSpeed);
          }
         // this.initialMouseX = pointer.x;
        }
        this.circle_UI.x = Phaser.Math.Clamp(pointer.x, this.initialMouseX - 130, this.initialMouseX + 130);
        this.circle_UI.y = Phaser.Math.Clamp(pointer.y, this.initialMouseY - 130, this.initialMouseY + 130);
        //this.circle_UI.x = pointer.x;
        //this.circle_UI.y = pointer.y;
      }
    }, this);

    // Cuando se suelta el click izquierdo del ratón, el personaje
    // detiene su movimiento horizontal
    this.input.on('pointerup', function (pointer) {
      // Comprobamos si el id del puntero es el mismo que inició el movimiento
      if(this.movementPointerId === pointer.id){
        this.player1.setVelocityX(0);
        this.isMouseMoving = false;
        //this.circle_UI.alpha = 0;
        this.tweens.add({
          targets: this.circle_UI,
          alpha: 0,
          scaleX: 0.32,
          scaleY: 0.32,
          ease: 'Linear' ,
          duration: 80,
          yoyo: false,
          repeat: 0
        });
        this.tweens.add({
          targets: this.circle_UI_Base,
          alpha: 0,
          scaleX: 0.01,
          scaleY: 0.01,
          ease: 'Linear' ,
          duration: 80,
          yoyo: false,
          repeat: 0
        });
      }
    }, this);
  }

  /**
   * Inicializa la superficie sobre la que el personaje camina (sin hacer)
   */
  InitFloor(){
    this.floor = this.physics.add.image(this.RelativePosition(50, "x"), this.RelativePosition(50, "y"),'Floor',4);
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;
  }

  /**
   * Salto del personaje
   */
  PlayerJump(){
    if(Phaser.Input.Keyboard.JustDown(this.upButton)){
      // Salto
      this.player1.setVelocityY(this.jumpForce);
    }
  }

  /**
   * Configura al jugador y su representación en pantalla
   */
  InitPlayer(){
    //Al escribir physics, le indicamos que el objeto está sujeto a las leyes de la física, indicadas en el archivo game.js
    this.player1   = this.physics.add.sprite(this.RelativePosition(10, "x"), this.RelativePosition(75, "y"),'Law',4);
    this.player1.scaleX = this.RelativeScale(0.005, "x");
    this.player1.scaleY = this.player1.scaleX ;

    this.player1.setCollideWorldBounds(true);
  }

  /**
   * Inicializa la relación entre los distintos elementos que
   * pueden colisionar entre sí
   */
  InitColliders(){
    this.walls = this.physics.add.staticGroup();
    this.wall_left = this.walls.create(-25,this.height/2,'wall');
    this.wall_left.setAlpha(0);
    this.wall_right   = this.walls.create(825,this.height/2,'wall');
    this.wall_right.setAlpha(0);
    this.physics.add.collider(this.player1, this.floor);
  }

  /**
   * Método que se ejecuta constantemente, en el de momento solo están los controles de movimiento.
   */
  update(delta){
    // #region Teclas y movimiento
    if(this.isMouseMoving === false){
      if(this.AButton.isDown){

        if(this.player1CanMove)
          this.player1.setVelocityX(-this.xSpeed);
  
      }else if(this.DButton.isDown){
  
        if(this.player1CanMove)
          this.player1.setVelocityX(this.xSpeed);
  
      }else{
  
        this.player1.setVelocityX(0);
  
      }
  
      this.PlayerJump();
    }
    

  }

}