import fireArrow from './fireArrow'
import aim from './aim'
import {playerMoved, onAimRight, onAimUp, onAimLeft, onAimDown, playerDead, point} from '../client'
import d, { localState } from '../game'
import wrap from './wrap'
import playerAim from './playerAim'
import arrowPhysics from './arrowPhysics'
import treasurePhysics from './treasurePhysics'
import movement from './movement'

//import Client from '../client'

export default function updateFunc() {
  if (d.currentPlayer) {
    let currPlayer = d.currentPlayer

    //Define collisions
    d.players.forEach(player => {
      wrap(d[player])
      let hitPlatform = d.game.physics.arcade.collide(d.platforms, d[player])
      if (player === currPlayer) d.amIGrounded = hitPlatform
    })

    //Spike collisions
    let hitSpikes = d.game.physics.arcade.collide(d.spikes, d[currPlayer])
    if (hitSpikes) {
      d[currPlayer].kill()
      d.blood = d.game.add.sprite(d[currPlayer].x, d[currPlayer].y, 'blood')
      d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      d.blood.scale.set(2, 2)
      d.blood.anchor.x = .5
      d.blood.animations.play('death')
      d.blood.animations.currentAnim.killOnComplete = true
      d[currPlayer].numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }

    if (d.treasure) {
      wrap(d.treasure)
      // Treasure chest collisions
      treasurePhysics()
    }

    playerAim(currPlayer)


    // reset various parameters
    if (d[currPlayer].body.velocity.y >= -200) d[currPlayer].forceJump = false
    if (d[currPlayer].body.touching.down || d[currPlayer].body.touching.right || d[currPlayer].body.touching.left) d[currPlayer].jump = false
    if (!d[currPlayer].forceJump) {
      if (!d[currPlayer].body.touching.down) {
        if (d[currPlayer].body.velocity.x > 150) d[currPlayer].body.velocity.x = 150
        else if (d[currPlayer].body.velocity.x < -150) d[currPlayer].body.velocity.x = -150
      } else {
        d[currPlayer].body.velocity.x = 0
      }
    }

    if (d[currPlayer].body.velocity.y > 1000) d[currPlayer].body.velocity.y = 1000 // max downward velocity

    d[currPlayer].bow.rotation = 0
    d[currPlayer].bow.position.set(2, 16)

    d[currPlayer].body.gravity.y = (d[currPlayer].body.touching.left || d[currPlayer].body.touching.right) && d[currPlayer].body.velocity.y > 0 ? 50 : 1200


    // controls
    movement()

    // aiming the bow
    aim()

    // arrow collisions
    arrowPhysics()

    // send your movement to server
    playerMoved(d.myGame.id, currPlayer, d[currPlayer].x, d[currPlayer].y, d[currPlayer].frame, d[currPlayer].scale.x, d[currPlayer].bow.position, d[currPlayer].bow.rotation)
    
  }

  let maxAlive = 0
  let curAlive = 0
  d.players.forEach(player => {
    maxAlive++
    if (d[player].alive) curAlive++
  })

  if (curAlive <= 1 && curAlive !== maxAlive) {
    if (d.go) {
      let s1 = (d.player1 && d.player1.alive) ? 1 : 0
      let s2 = (d.player2 && d.player2.alive) ? 1 : 0
      let s3 = (d.player3 && d.player3.alive) ? 1 : 0
      let s4 = (d.player4 && d.player4.alive) ? 1 : 0
      point(d.myGame.id, d.round, {1: d.myGame.score[1] + s1, 2: d.myGame.score[2] + s2, 3: d.myGame.score[3] + s3, 4: d.myGame.score[4] + s4})
      d.go = false
    }
  }

}

export function opponentPos(positionObj) {
  if (d.currentPlayer !== positionObj.player) {
    d[positionObj.player].x = positionObj.x
    d[positionObj.player].y = positionObj.y
    d[positionObj.player].frame = positionObj.frame
    d[positionObj.player].scale.x = positionObj.scale
    d[positionObj.player].bow.position.x = positionObj.position.x
    d[positionObj.player].bow.position.y = positionObj.position.y
    d[positionObj.player].bow.rotation = positionObj.rotation
  }
}

