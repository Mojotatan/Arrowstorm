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
          let blood = d.game.add.sprite(d.player1.x, d.player1.y, 'blood')
          blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
          blood.scale.set(2, 2)
          blood.anchor.x = .5
          blood.animations.play('death')
          blood.animations.currentAnim.killOnComplete = true
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
          let blood = d.game.add.sprite(d.player2.x, d.player2.y, 'blood')
          blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
          blood.scale.set(2, 2)
          blood.anchor.x = .5
          blood.animations.play('death')
          blood.animations.currentAnim.killOnComplete = true
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
          let blood = d.game.add.sprite(d.player3.x, d.player3.y, 'blood')
          blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
          blood.scale.set(2, 2)
          blood.anchor.x = .5
          blood.animations.play('death')
          blood.animations.currentAnim.killOnComplete = true
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
          let blood = d.game.add.sprite(d.player4.x, d.player4.y, 'blood')
          blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
          blood.scale.set(2, 2)
          blood.anchor.x = .5
          blood.animations.play('death')
          blood.animations.currentAnim.killOnComplete = true
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