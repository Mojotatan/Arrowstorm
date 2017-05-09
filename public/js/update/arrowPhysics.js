import d from '../game'
import { arrowIsDead } from '../client'

export default function arrowPhysics() {
	d.arrowsArray.forEach((arrow, idx) => {

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

      if (d.game.physics.arcade.collide(arrow, d.player1)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player1.kill()
          d.player1.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player1.numArrows++
        }
      }

      if (d.game.physics.arcade.collide(arrow, d.player2)) {
        if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
          d.player2.kill()
          d.player2.numArrows = 0
        } else {
          arrow.kill()
          arrowIsDead(d.myGame.id, idx)
          d.arrowsArray.push(arrow)
          d.player2.numArrows++
        }
      }
    })
}