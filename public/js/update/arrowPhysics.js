import d from '../game'
import wrap from './wrap'
import { arrowIsDead, playerDead } from '../client'
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
      d.players.forEach(player => {
        if (d.game.physics.arcade.collide(arrow, d[player])) {
          if (arrow.body.velocity.x !== 0 || arrow.body.velocity.y !== 0 || arrow.type === 'bouncyArrow') {
            d[player].kill()
            playerDead(d.myGame.id, player)
            d[player].numArrows = 0
            let blood = d.game.add.sprite(d[player].x, d[player].y, 'blood')
            blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
            blood.scale.set(2, 2)
            blood.anchor.x = .5
            blood.animations.play('death')
            blood.animations.currentAnim.killOnComplete = true
          } else {
            arrow.kill()
            arrowIsDead(d.myGame.id, idx)
            d.arrowsArray.push(arrow)
            d[player].numArrows++
            appendArrowDisplay(player, d[player].numArrows)
          }
        }
      })
    }
  })
}