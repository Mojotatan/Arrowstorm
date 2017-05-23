import d from '../game'
import createArrow from '../create/createArrow'
import { arrowShot } from '../client'

export default function fireArrow(opponentBool, opponent, shotDirection) {

  let currPlayer

  if (d.currentPlayer) {
    currPlayer = d.currentPlayer
  }

  if (opponentBool === true) {
    createArrow(opponent, d[opponent].nextArrowType)
    createTrajectory(shotDirection.up, shotDirection.down, shotDirection.left, shotDirection.right)
    d[opponent].numArrows--
    d[opponent].nextArrowType = 'regular'
  }
  else {
    const shotDelay = 300  // milliseconds (10 bullets/3 seconds)
    let lastArrowShotAt

    // Enforce a short delay between shots by recording
    // the time that each arrow is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (lastArrowShotAt === undefined) lastArrowShotAt = 0
    if (d.game.time.now - lastArrowShotAt < shotDelay) return
    lastArrowShotAt = d.game.time.now

    if (d[currPlayer].numArrows > 0) {
      arrowShot(d.myGame.id, currPlayer, d[currPlayer].shotDirection)
      createArrow(currPlayer, d[currPlayer].nextArrowType)
    }

    // If there aren't any arrows available then don't shoot
    // if (!d.arrow || d[currPlayer].numArrows <= 0) return

    if (d[currPlayer].numArrows <= 0) return

    createTrajectory(d.aimUp.isDown, d.aimDown.isDown, d.aimLeft.isDown, d.aimRight.isDown)

    d[currPlayer].numArrows--
    d[currPlayer].nextArrowType = 'regular'

  }

}

function createTrajectory(up, down, left, right) {
  if (up) {
    if (left) {
      d.arrow.rotation = -0.785
      d.arrow.body.velocity.y = -1000
      d.arrow.body.velocity.x = -1000
      d.arrow.body.acceleration.y = 1000
      d.arrow.body.acceleration.x = 1000
    } else if (right) {
      d.arrow.rotation = 0.785
      d.arrow.body.velocity.y = -1000
      d.arrow.body.velocity.x = 1000
      d.arrow.body.acceleration.y = 1000
      d.arrow.body.acceleration.x = -1000
    } else {
      d.arrow.rotation = 0
      d.arrow.body.velocity.y = -1414
      d.arrow.body.acceleration.y = 1000
    }
  } else if (down) {
    if (left) {
      d.arrow.rotation = -2.355
      d.arrow.body.velocity.y = 1000
      d.arrow.body.velocity.x = -1000
      d.arrow.body.acceleration.y = -1000
      d.arrow.body.acceleration.x = 1000
    } else if (right) {
      d.arrow.rotation = 2.355
      d.arrow.body.velocity.y = 1000
      d.arrow.body.velocity.x = 1000
      d.arrow.body.acceleration.y = -1000
      d.arrow.body.acceleration.x = -1000
    } else {
      d.arrow.rotation = 3.14
      d.arrow.body.velocity.y = 1414
      d.arrow.body.acceleration.y = -1000
    }
  } else if (right || d[d.currentPlayer].scale.x < 0) {
      d.arrow.rotation = 1.57
      d.arrow.body.velocity.x = 1414
      d.arrow.body.acceleration.x = -1000
    } else {
      d.arrow.rotation = -1.57
      d.arrow.body.velocity.x = -1414
      d.arrow.body.acceleration.x = 1000
    }

    if (d.arrow.type === 'bouncyArrow') {
      d.arrow.rotation = 0
      d.arrow.body.acceleration.set(0, 0)
    }
}