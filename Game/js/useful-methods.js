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

export default class UsefulMethods{
    static vectorModule(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    static RelativePosition(value, axis, scene) 
    {
      var result = 0;
      switch(axis)
      {
        case "x":
          result = scene.width * value/100;
          break;
        case "y":
          result = scene.height * value/100;
          break;
        default:
          break;
      }
      return result;
    }

    static RelativeScale(value, axis, scene)
    {
      var result = 0;
      switch(axis)
      {
        case "x":
          result = scene.width * value/100;
          break;
        case "y":
          result = scene.game.config.height * value/100;
          break;
        default:
          break;
      }
      return result;
    }
}