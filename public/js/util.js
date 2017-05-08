// random functions not connected to anything in particular should go here

//if pythagorean theoreum is a^2 + b^2 = c^2 and a = b
//a given c can be used to find a like so
export const findA = function(c) { // Maybe make the function name more descriptive
  let val = Math.pow(c, 2)
  val = val / 2
  return Math.round(Math.sqrt(val))
}