import {findA} from '../util'
import fireArrow from './fireArrow'
import {playerMoved, onAimRight, onAimUp, onAimLeft, onAimDown, playerDead, hitTC, point} from '../client'
import d, { localState } from '../game'
import wrap from './wrap'
import createTreasureChest from '../create/createTreasureChest'
import playerAim from './playerAim'
import arrowPhysics from './arrowPhysics'
import treasureChest from './treasureChest'

//import Client from '../client'

export default function scrubdateFunc() {
  d.slowmo.visible = !d.slowmo.visible

  let moment = d.history[0]

  //Turn down player physics to avoid unwanted movement
  d.player1.body.gravity.x = 0
  d.player1.body.gravity.y = 0

  //World wrap
  wrap(d.player1)
  wrap(d.player2)

  if (d.arrow) wrap(d.arrow)

  wrap(d.treasure)

  //Define collisions
  let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player1)
  let hitPlatformP2 = d.game.physics.arcade.collide(d.platforms, d.player2)
  let hitSpikes = d.game.physics.arcade.collide(d.spikes, d.player1)
  let hitSpikesP2 = d.game.physics.arcade.collide(d.spikes, d.player2)

  //Spike collisions
  if (hitSpikes) {
    d.player1.kill()
    d.player1.numArrows = 0
  }
  if (hitSpikesP2) {
    d.player2.kill()
    d.player2.numArrows = 0
  }

  // define collisions for new players
  for (let i = 0; i < d.playerMap.length; i++) {
    d.game.physics.arcade.collide(d.platforms, d.playerMap[i])
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