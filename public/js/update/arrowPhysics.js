import d from '../game'
import wrap from './wrap'
import { arrowIsDead } from '../client'
import {appendArrowDisplay} from './arrowDisplay'

export default function arrowPhysics() {
	d.arrowsArray.forEach((arrow, idx) => {
    wrap(arrow)

    let arrowHitPlatforms = d.game.physics.arcade.collide(arrow, d.platforms)
    let arrowHitSpikes = d.game.physics.arcade.collide(arrow, d.spikes)

    if (arrow.body.velocity.x > 0) {
      arrow.angle += 1
    }
    if (arrow.body.velocity.x < 0) {
      arrow.angle -= 1
    }

    if (arrow && arrow.type === 'regular' && (arrowHitPlatforms || arrowHitSpikes)) {
      arrow.body.velocity.x = 0
      arrow.body.velocity.y = 0
      arrow.body.acceleration = 0
      arrow.body.gravity.y = 0
      arrow.body.immovable = true
    }

    if (arrow.deploy) {
      if (d.player1 && d.game.physics.arcade.collide(arrow, d.player1)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player1.kill()
          d.player1.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player1.numArrows++
          appendArrowDisplay('player1', d.player1.numArrows)
        }
      }

      if (d.player2 && d.game.physics.arcade.collide(arrow, d.player2)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player2.kill()
          d.player2.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player2.numArrows++
          appendArrowDisplay('player2', d.player2.numArrows)
        }
      }

      if (d.player3 && d.game.physics.arcade.collide(arrow, d.player3)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player3.kill()
          d.player3.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player3.numArrows++
          appendArrowDisplay('player3', d.player3.numArrows)
        }
      }

      if (d.player4 && d.game.physics.arcade.collide(arrow, d.player4)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player4.kill()
          d.player4.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player4.numArrows++
          appendArrowDisplay('player4', d.player4.numArrows)
        }
      }
    }
  })
}