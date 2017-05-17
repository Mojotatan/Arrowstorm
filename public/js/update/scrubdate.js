import {findA} from '../util'
import fireArrow from './fireArrow'
import d, { localState } from '../game'
import wrap from './wrap'
import createTreasureChest from '../create/createTreasureChest'
import playerAim from './playerAim'
import arrowPhysics from './arrowPhysics'
import treasureChest from './treasureChest'

//import Client from '../client'

export default function scrubdateFunc() {
  d.interval++
  if (d.interval === 2) {
    d.slowmo.visible = !d.slowmo.visible
    d.interval = 0
  }

  let moment = d.history[0]

  //Turn down player physics to avoid unwanted movement
  let hitPlatform1, hitPlatform2, hitPlatform3, hitPlatform4, hitSpikes1, hitSpikes2, hitSpikes3, hitSpikes4

  if (d.player1) {
    wrap(d.player1)
    d.player1.body.gravity.set(0, 0)
    hitPlatform1 = d.game.physics.arcade.collide(d.platforms, d.player1)
    hitSpikes1 = d.game.physics.arcade.collide(d.spikes, d.player1)
  }
  if (d.player2) {
    wrap(d.player2)
    d.player2.body.gravity.set(0, 0)
    hitPlatform2 = d.game.physics.arcade.collide(d.platforms, d.player2)
    hitSpikes2 = d.game.physics.arcade.collide(d.spikes, d.player2)
  }
  if (d.player3) {
    wrap(d.player3)
    d.player3.body.gravity.set(0, 0)
    hitPlatform3 = d.game.physics.arcade.collide(d.platforms, d.player3)
    hitSpikes3 = d.game.physics.arcade.collide(d.spikes, d.player3)
  }
  if (d.player4) {
    wrap(d.player4)
    d.player4.body.gravity.set(0, 0)
    hitPlatform4 = d.game.physics.arcade.collide(d.platforms, d.player4)
    hitSpikes4 = d.game.physics.arcade.collide(d.spikes, d.player4)
  }

  d.arrowsArray.forEach(arrow => {
    wrap(arrow)
    let arrowHitPlatforms = d.game.physics.arcade.collide(arrow, d.platforms)
    let arrowHitSpikes = d.game.physics.arcade.collide(arrow, d.spikes)

    if (arrow.body.velocity.x > 0) {
      arrow.angle += 1
    }
    if (arrow.body.velocity.x < 0) {
      arrow.angle -= 1
    }

    if (arrowHitPlatforms || arrowHitSpikes) {
      arrow.body.velocity.x = 0
      arrow.body.velocity.y = 0
      arrow.body.acceleration = 0
      arrow.body.gravity.y = 0
      arrow.body.immovable = true
    }
  })

  //Spike collisions
  if (hitSpikes1) {
    d.player1.kill()
    //d.blood = d.game.add.sprite(d.player1.x, d.player1.y, 'blood')
      //d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      //d.blood.scale.set(2, 2)
      d.blood.animations.play('death')
      //d.blood.animations.currentAnim.killOnComplete = true
    d.player1.numArrows = 0
  }
  if (hitSpikes2) {
    d.player2.kill()
    d.player2.numArrows = 0
  }
  if (hitSpikes3) {
    d.player3.kill()
    d.player3.numArrows = 0
  }
  if (hitSpikes4) {
    d.player4.kill()
    d.player4.numArrows = 0
  }

  // note: not loading or dealing with treasure at all here

  // MOVE EM ROUND
  moment.forEach(snapshot => {
    if (snapshot.action === 'move') {
      d[snapshot.player].position.set(snapshot.x, snapshot.y)
      d[snapshot.player].scale.x = snapshot.scale
      d[snapshot.player].bow.rotation = snapshot.rotation
      d[snapshot.player].bow.position.set(snapshot.position.x, snapshot.position.y)
    }
    if (snapshot.action === 'shot') {
      fireArrow(d, true, snapshot.player, snapshot.shotDirection)
    }
  })

  // end the kill cam on the kill
  if (d.history.length > 1) {
    d.history.shift()
  } else if (d.go) {
    d.game.lockRender = true
    d.game.time.events.add(1500, function() {
      d.game.state.start('gameOver')
      d.game.lockRender = false
    })
    d.go = false
  }
}