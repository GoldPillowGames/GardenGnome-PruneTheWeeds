![Logo](https://user-images.githubusercontent.com/44704611/99666511-620fc500-2a6b-11eb-8b4b-4eccd9de9838.png)

## Visión General
### Tema
La maestría del contraataque como arte. 
### Género  
Arcade, aventura y acción. 
### Plataformas objetivo 
Navegador: Google Chrome, Mozilla Firefox 
### Modelo de monetización  
Tipo: Free to play

El objetivo es llegar a un acuerdo con una compañía conocida, en el que la compañía lance una línea de productos cuya temática sea la misma que la del juego (y de la que recibiríamos un porcentaje de los beneficios), y al mismo tiempo dentro del juego se publicite dicha compañía y sus productos. De esta forma, se produciría un proceso de retroalimentación en el que la compañía vendería más productos gracias a la publicidad del juego, y al mismo ese aumento de ventas supondría también un aumento de los ingresos de Gold Pillow Games.  

#### Mapa de empatía:
![Modelo_Empatia_Gold_Pillow_Games](https://user-images.githubusercontent.com/44704611/99603174-11648180-2a03-11eb-8e79-f300098ddc1d.png)

#### Canvas:
![ModeloCanvas (1)](https://user-images.githubusercontent.com/44704611/99667252-6ab4cb00-2a6c-11eb-80c0-36070c903d7f.png)

#### Caja de herramientas:
![Caja de herramientas](https://user-images.githubusercontent.com/44704611/99704363-951c7d80-2a98-11eb-8d14-9bbd86566efd.png)

### Alcance del proyecto 
#### Tiempo y coste
- **Coste principal:** 87.50 € 
- **Tiempo:** 7 semanas 
#### Equipo
| Nombre | Roles |
| ----------- | ----------- |
| Germán López Gutiérrez | Game Designer, Programador |
| Elvira Gutiérrez Bartolomé  | Arte 2D |
| Ignacio Atance Loras | Level Designer, Programador |
| Jorge Sánchez Sánchez | Arte 2D |
| Fernando Martín Espina | Game Designer, Programador |

#### Licencias y Hardware
| Nombre | Software / Licencia | Coste Total
| ----------- | ----------- | ----------- |
| Ignacio Atance Loras  | 1. Clip Studio Paint | 22.50€ |
| Jorge Sánchez Sánchez  | 1. Clip Studio Paint<br/> | 45€ |
| Elvira Gutiérrez Bartolomé  | 1. Photoshop | 20€ |
| Germán López Gutiérrez  | 1. Gimp | 0€ |
| Fernando Martín Espina  | 1. Gimp | 0€ |
|  | **Coste Total**  | 87.50€ |

### Influencias 

#### Redungeon
- **Medio:** Videojuego 
- **Motivo:** El estilo visual en formato pixel art. 
#### Sekiro: Shadows Die Twice
- **Medio:** Videojuego 
- **Motivo:** La mecánica del parry como elemento clave en el sistema de combate. 

### Elevator Pitch
Garden Gnome: Prune the Weeds es un juego arcade para un solo jugador donde se debe avanzar por un escenario procedimental en 2 dimensiones eliminando enemigos, siendo la mecánica principal el contraataque, la cual toma inspiración en juegos como Sekiro: Shadows Die Twice. El juego se ha desarrollado haciendo uso de Javascript moderno orientado a objetos y el framework Phaser 3, lo cual ha agilizado el avance del proyecto y ha permitido que sea jugable en navegadores como Google Chrome y Firefox. El diseño visual del juego se basa en elementos de la naturaleza y la jardinería, concluyendo en un resultado simpático y amigable para todos los públicos, cumpliendo el juego los requisitos para obtener un hipotético Pegi 3, lo que permite que la suma de todos estos puntos dé lugar a un juego divertido y apto para el público objetivo. 

### Descripción general del proyecto
El juego consiste en el avance de un personaje en un mundo de fantasía, partiendo de su reino hasta llegar al castillo de la maldad, donde el protagonista se enfrentará al mayor de los males.
Durante el transcurso de los niveles, surgirán encuentros con enemigos en donde la única forma de defenderse y atacar a los mismos es contratacando en el momento exacto, siendo esta la mecánica principal y la única forma de progresar hasta llegar al jefe final.

### ¿Qué hace al juego especial?
- La mecánica de contrataque como recurso imprescindible en el combate.
- La accesibilidad en el estilo visual y en su jugabilidad.
- Assets propios y de calidad (Sprites, sonidos, música, etc.).
- Una aventura de corta duración donde el jugador sienta que sus reflejos han mejorado.

## Historia
### Sinopsis
Un gnomo de jardín, que llevaba una vida pacífica, se ve invadido por una serie de monstruos, por lo que deberá luchar contra ellos para proteger su hogar. 

### Resumen
La vida de un gnomo de jardín no suele ser especialmente interesante, y la del protagonista de Gargen Gnome: Prune the weeds no es diferente. Pero tiene un objetivo claro, cuidar y proteger su jardín, por lo que cuando este se ve invadido por una serie de monstruos, no duda es armarse con su hacha y salir a por ellos. Las criaturas parecen no acabarse nunca, pero el gnomo no piensa rendirse, por lo que luchará hasta el final, cueste lo que cueste. 

## Jugabilidad
### Qué experiencia se busca
La sensación de mejora constante a nivel personal ya que la vida y el daño del personaje son constantes durante la aventura. Sin embargo, lo que el jugador sentirá como progreso, serán sus reflejos al responder con mayor certeza a los ataques enemigos y sus respectivos patrones. 

### Mecánicas principales
#### Avance Lateral
El jugador hará progresar al personaje en scroll lateral mediante las teclas A y D en PC, y el deslizamiento del dedo sobre cualquier punto de la pantalla en dispositivos móviles.<br/><br/>
![i1](https://user-images.githubusercontent.com/55363746/99445458-da687000-291d-11eb-9e4b-4596c00a17e2.png)
#### Contrataque
Durante el combate, los enemigos tienen patrones de ataque definidos, a los cuales el jugador deberá responder deslizando el dedo o el ratón sobre la pantalla al momento de recibir dicho ataque. Si el jugador logra hacer esto correctamente, no recibirá ningún daño y hará que el enemigo vea desgastado su aguante (representado como la barra amarilla bajo la vida).<br/><br/>
![i2](https://user-images.githubusercontent.com/55363746/99445303-a8570e00-291d-11eb-8a4c-7c7fea981aa5.png)<br/>
![i3](https://user-images.githubusercontent.com/55363746/99445459-db010680-291d-11eb-9bc5-62dcc31a9e86.png)
#### Ataque
Si en un enfrentamiento, el enemigo gasta todo su aguante, el jugador cuenta con un tiempo variante en función del tipo de enemigo para atacarle. En esta situación debe hacer click (o presionar en la pantalla en dispositivos móviles) múltiples veces sobre el rival para reducirle la cantidad de puntos de vida hasta que este recupere su aguante o muera.<br/><br/>
![i4](https://user-images.githubusercontent.com/55363746/99445463-db010680-291d-11eb-8334-0e22fd28e022.png)
### Enemigos
#### Rana
La rana se hincha y lanza la lengua al personaje para atacarlo.
#### Seta
La seta tiene un ataque donde escupe al personaje.
#### Cactus
El cactus ataca alzando sus brazos al aire y pegando un puñetazo al suelo donde lanza una onda expansiva al protagonista.
#### Planta carnívora
La planta tiene un ciclo de ataque donde retrocede levemente y se lanza a morder al personaje.
#### Caracol
El caracol tiene un ataque que consiste en el lanzamiento de un rayo por su vara, la cual muestra unos rayos que crecen levemente antes de lanzar su proyectil.

## Aspecto visual
### Contexto
El videojuego contará con un estilo cartoon con figuras y paletas de colores pastel similares al de juegos como Rogue Legacy o Redungeon, con diseños amigables para el jugador casual. La temática de los diseños se centrará en un estilo “Guerra en el jardín” donde tendremos que enfrentarnos tanto a plantas como animales que se nos crucen en nuestro camino al objetivo.
### Referencias Visuales 
#### Referencias generales
![i5](https://user-images.githubusercontent.com/55363746/99445858-6ed2d280-291e-11eb-9fed-f61666a7609d.jpg)
![i6](https://user-images.githubusercontent.com/55363746/99445859-6ed2d280-291e-11eb-8bdf-3ece0165fc41.jpg)
#### Referencias específicas
![i7](https://user-images.githubusercontent.com/55363746/99445852-6d090f00-291e-11eb-963e-a1d5b97740ee.jpg)
![i8](https://user-images.githubusercontent.com/55363746/99445854-6da1a580-291e-11eb-8e52-31414ef21838.jpg)

## Interfaz de Usuario
### HUD

En la esquina superior izquierda se mostrará la barra de vida del jugador, y al lado de esta aparecerá la cabeza del gnomo. 

Debajo de la barra de vida aparecerán los puntos conseguidos por el jugador hasta el momento. 

Encima de los enemigos se mostrará su barra de vida y su barra de resistencia. A la izquierda de estas 2 barras se mostrará una flecha indicando la dirección del parry. 

En la esquina superior derecha habrá un botón que servirá para terminar la partida y volver al menú principal. 

### Menú principal
En el menú de inicio se encontrará como background el personaje principal caminando sobre un terreno verde que nunca termina y montañas de fondo (teniendo en cuenta el faralaje para que sea notoria la profundidad de las capas). 

A su vez, en el frontground se encuentran 3 botones, siendo el del medio el de jugar, el de la izquierda el de ajustes y el de la derecha el de créditos y contacto.

El título se ubica en la parte superior con una leve animación de escalado ejecutándose en bucle. 

En cuanto a la transición inicial, esta comienza con un fade in de 200 milisegundos de duración a la par que los tres botones de la mitad inferior de la pantalla ascienden mientras rotan levemente en un ángulo de 45º hasta colocarse en sus respectivos lugares. 

![Captura3](https://user-images.githubusercontent.com/44704611/99705347-e4af7900-2a99-11eb-8019-d665e74a664c.png)

Si se pulsa el botón de jugar (el del centro), los 3 botones desaparecerán con una animación, para aparecer otros 2 botones. Aquí el jugador podrá elegir entre uno de los 2 escenarios disponibles para jugar. Cuando esto suceda, de nuevo desaparecerán los botones y aparecerán otros nuevos para elegir la dificultad. Será entonces cuando el jugador elija la dificultad, se producirá un fade out de 200 milisegundos, y empezará la partida. 

### Menú de opciones

En el menú de opciones, se puede configurar el volumen global del juego, y los volúmenes de los efectos de sonido y de la música por separado, para que se pueda configurar la mezcla al gusto del jugador. 

También se podrá elegir el idioma, entre el inglés y el español, y habrá un botón para volver al menú principal. 

![Captura2](https://user-images.githubusercontent.com/44704611/99705345-e416e280-2a99-11eb-890b-83ef6ed6f92d.png)

### Menú de créditos y contacto

En la escena de créditos y contacto, se mostrarán los autores del proyecto, las referencias necesarias y una forma de contacto por correo electrónico, para poder comunicarse con los desarrolladores. 

También habrá un botón para volver al menú principal. 

![Captura5](https://user-images.githubusercontent.com/44704611/99705351-e5480f80-2a99-11eb-80cd-5a46413da3d8.png)

## Assets necesarios

### Diseños 2D

#### Personaje principal
Se trataría de un gnomo de jardín armado con un hacha similar al estilo de los gnomos de la película de Gnomeo y Julieta.  
     
#### Enemigos
Diseño de una rana, un caracol mago, un cactus en una maceta, una seta que escupe, y una planta carnívora.

### Sonido
#### Música

- **Música de menú.**
- **Música de combate.**
- **Música para caminar por el escenario.**

#### Efectos de sónidos:

- **Sonido para los botones.** 
- **Sonido de impacto entre el hacha y los monstruos.**
- **Sonido del hacha parando un ataque enemigo.**
- **Sonido de derrota del gnomo.**
- **Sonido para los monstruos.**

### Código

#### Script del personaje 

Se gestiona tanto el movimiento del personaje, como su comportamiento en los combates. También se gestionan sus animaciones, y su puntuación. 

#### Script del nivel 1

Nada más empezar, crea al jugador, el escenario, los 3 primeros enemigos y todos los elementos de la interfaz (algunos empezarán ocultos). Cada vez que el jugador derrote a un enemigo (a excepción del primero) se generará nuevo terreno y un nuevo enemigo en la dirección X de la escena, para que el nivel sea infinito. Para generar este nuevo terreno se utilizan aquellos objetos que se encuentren a la izquierda del jugador, por lo que nunca los iba a volver a ver. De esta forma se evitan problemas de rendimiento al no tener cada vez más objetos en la escena, y al no tener que eliminarlos e instanciarlos de nuevo cada vez que se quiera hacer avanzar el terreno. Para crear los enemigos se utiliza la clase Enemy, y se les asigna una función que se ejecutará cuando el jugador se acerque suficiente, para iniciar el combate. Los enemigos se generan de forma aleatoria cada vez (a excepción de los 3 primeros).  

#### Script del nivel 2 

El funcionamiento es parecido al del nivel 1, pero con un nuevo enemigo, con sus características correspondientes, y un aspecto visual diferente.

#### Script del enemigo

Se configura el enemigo con los datos que se le hayan pasado en el constructor (vida, resistencia, animaciones, tiempo de ataque y de contraataque...). Funciona como una máquina de estados, ya que el enemigo puede estar en 3 estados distintos, pasando de uno a otro cada cierto tiempo, o tras un suceso. Si se encuentra “atacando”, no puede perder vida ni resistencia o ser contraatacado. Si está en estado “parry” si podrá ser contraatacado, perdiendo resistencia, pero no vida, y si se le acaba la resistencia, pasará a estado “cansado” y podrá perder vida por los ataques del jugador.

#### Script de los botones 

Gestiona todo el comportamiento y las animaciones de los botones. Se posiciona y escala en función de los parámetros recibidos en el constructor. Se configura siempre para estar en una capa visible por el jugador, y para moverse junto a la cámara de la escena en la que se encuentra. La función que se ejecuta cuando se pulsa el botón se define una vez instanciada la clase, de forma que cada instancia.  

#### Script del menú principal 

Gestiona el comportamiento de los botones del menú, y la decoración del mismo. Al principio aparecen 3 botones, uno para ir al menú de créditos, otro para ir al menú de opciones y otro para jugar. Este último hará aparecer 2 nuevos botones, uno por escenario, y tras elegir aparecerán 2 botones para elegir la dificultad. 

#### Script de los controles 

Se encarga de recibir y gestionar todas las entradas, bien sean a través del teclado y el ratón, o bien sea a través de la pantalla táctil del teléfono. 

#### Script de la escena de Game Over 

Muestra la puntuación obtenida durante la partida, y permite volver a jugar, o volver al menú de inicio. 

#### Script de funciones

Contiene funciones genéricas útiles para los programadores en cualquier otro script.  

#### Script del slider

Sirve para crear barras deslizantes que se mueven de un lado a otro con el ratón.

#### Script de la escena de configuración 

Permite al jugador modificar el volumen global, el de la música o el de los efectos de sonido. También hay un botón para volver al menú principal. 

#### Script de la escena de créditos 

Muestra los autores del proyecto, un correo para contactar con el equipo, y un botón para volver al menú principal. 

#### Script para mostrar el logo 

Muestra una pequeña animación del logo del equipo desarrollador, antes de pasar al menú principal. 

#### Script de la pantalla de carga

Gestiona la carga de todo el material necesario para el juego (tanto visual como sonoro). Una vez ha sido cargado, se pide al jugador que pulse, para comenzar. Mientras se produce la carga, se muestra una animación donde se ven a los personajes del juego.

#### Script de la clase “Contenedor de elementos de interfaz” 

Se trata de un contenedor, al que se pueden añadir distintos elementos de la interfaz, para que todos se comporten de la misma manera (avancen con la cámara y se escalen si la cámara hace zoom). 

#### Script de la escena de pruebas 

Escena donde los programadores harán cualquier tipo de prueba necesaria, antes de añadirse al juego final. 

#### Script para el gestor de audio

Contiene 2 funciones, para reproducir música y audio respectivamente. También se encarga de que los sonidos y la música se reproduzcan con el volumen correspondiente. 

#### Script de un selector

Permite elegir entre varias opciones preestablecidas por los programadores (por ejemplo, entre varios idiomas). 

#### Script de la nube 

Permite instanciar nubes en las escenas. Controla el comportamiento de las mismas. 

## Animación

### Personaje principal  

- **Andar** 
- **Atacar con hacha** 
- **Parry superior** 
- **Parry inferior** 
- **Muerte** 

### NPC hostil 1 - Rana 

- **Idle** 
- **Ataque** 

### NPC hostil 2 - Champiñón 

- **Idle** 
- **Ataque**

### NPC hostil 3 - Cactus 

- **Idle** 
- **Ataque** 

### NPC hostil 4 - Planta 

- **Idle** 
- **Ataque** 

### NPC hostil 5 - Caracol 

- **Idle** 
- **Ataque**

## Calendario
| Hito | Fecha |
| ----------- | ----------- |
| Inicio del proyecto | 09/10/2020 |
| Definición de la paleta de colores | 19/10/2020 |
| Assets comunes y de los escenarios | 29/10/2020 |
| Animaciones de enemigos parametrizadas | 10/11/2020 |
| Juego infinito, dificulad, y barras de vida | 15/11/2020 |
| Spritesheets del personaje | 16/11/2020 |
| Importación de los assets al proyecto de Phaser | 16/11/2020 |
| Fin del proyecto | 19/11/2020 |
