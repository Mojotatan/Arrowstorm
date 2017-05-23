import d from '../game'
import {findA} from '../util'

export default function aim() {
  // you can turn your player by either moving in a direction or by aiming in a direction
  // the direction you aim in takes precedent over the direction you move in
  // which allows for strafing

  if (d.aimLeft.isDown) {
    if (d[currPlayer].scale.x < 0) d[currPlayer].scale.x *= -1
  }
  else if (d.aimRight.isDown) {
    if (d[currPlayer].scale.x > 0) d[currPlayer].scale.x *= -1
  }

  // diagonal directions
  let distanceFromCenter = findA(8)

  if (d.aimDown.isDown) {
    if (d.aimDown.isDown && d.aimLeft.isDown) {
      d[currPlayer].bow.rotation = -.785
      d[currPlayer].bow.position.set(10 - distanceFromCenter, 16 + distanceFromCenter)
    }
    else if (d.aimDown.isDown && d.aimRight.isDown) {
      d[currPlayer].bow.rotation = -.785
      d[currPlayer].bow.position.set(10 - distanceFromCenter, 16 + distanceFromCenter)
    }
    else {
      d[currPlayer].bow.rotation = -1.57
      d[currPlayer].bow.position.set(10, 24)
    }
  }
  if (d.aimUp.isDown) {
    if (d.aimUp.isDown && d.aimLeft.isDown) {
      d[currPlayer].bow.rotation = .785
      d[currPlayer].bow.position.set(10 - distanceFromCenter, 16 - distanceFromCenter)
    }
    else if (d.aimUp.isDown && d.aimRight.isDown) {
      d[currPlayer].bow.rotation = .785
      d[currPlayer].bow.position.set(10 - distanceFromCenter, 16 - distanceFromCenter)
    }
    else {
      d[currPlayer].bow.rotation = 1.57
      d[currPlayer].bow.position.set(10, 8)
    }
  }
}