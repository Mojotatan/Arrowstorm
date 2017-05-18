import d from './game'
// random functions not connected to anything in particular should go here

//if pythagorean theoreum is a^2 + b^2 = c^2 and a = b
//a given c can be used to find a like so
export const findA = function(c) {
  let val = Math.pow(c, 2)
  val = val / 2
  return Math.round(Math.sqrt(val))
}

//function for creating graphics
export const shade = function(x, y, width, height, color) {
  let newShade = d.game.add.graphics(x, y)
  newShade.beginFill(color)
  newShade.drawRect(0, 0, width, height)
  newShade.endFill()
  return newShade
}