import fireArrow from './fireArrow'
import aim from './aim'
import {playerMoved, onAimRight, onAimUp, onAimLeft, onAimDown, playerDead, hitTC, point} from '../client'
import d, { localState } from '../game'
import wrap from './wrap'
import createTreasureChest from '../create/createTreasureChest'
import playerAim from './playerAim'
import arrowPhysics from './arrowPhysics'
import treasureChest from './treasureChest'

//import Client from '../client'

export default function updateFunc() {
  if (d.currentPlayer) {
    let currPlayer = d.currentPlayer

    //Define collisions
    let hitPlatform1, hitPlatform2, hitPlatform3, hitPlatform4

    if (d.player1) {
      wrap(d.player1)
      hitPlatform1 = d.game.physics.arcade.collide(d.platforms, d.player1)
    }
    if (d.player2) {
      wrap(d.player2)
      hitPlatform2 = d.game.physics.arcade.collide(d.platforms, d.player2)
    }
    if (d.player3) {
      wrap(d.player3)
      hitPlatform3 = d.game.physics.arcade.collide(d.platforms, d.player3)
    }
    if (d.player4) {
      wrap(d.player4)
      hitPlatform4 = d.game.physics.arcade.collide(d.platforms, d.player4)
    }

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
      let treasureHitPlatforms = d.game.physics.arcade.collide(d.treasure, d.platforms)
      let treasureHitPlayer1, treasureHitPlayer2, treasureHitPlayer3, treasureHitPlayer4
      if (d.player1) treasureHitPlayer1 = d.game.physics.arcade.collide(d.treasure, d.player1)
      if (d.player2) treasureHitPlayer2 = d.game.physics.arcade.collide(d.treasure, d.player2)
      if (d.player3) treasureHitPlayer3 = d.game.physics.arcade.collide(d.treasure, d.player3)
      if (d.player4) treasureHitPlayer4 = d.game.physics.arcade.collide(d.treasure, d.player4)

      if (treasureHitPlatforms) {
        d.treasure.body.velocity.x = 0
        d.treasure.body.velocity.y = 0
        d.treasure.body.acceleration = 0
        d.treasure.body.gravity.y = 0
        d.treasure.body.immovable = true
      }
      if (d.treasure.body.velocity.y > 1000) d.treasure.body.velocity.y = 1000

      // treasureChest details and logic
      if (treasureHitPlayer1) {
        treasureChest('player1')
        if (d.currentPlayer === 'player1') {
          hitTC(d.myGame.id, d.player1.treasure.payload, "player1")
        }
      }
      else if (treasureHitPlayer2) {
        treasureChest('player2')
        if (d.currentPlayer === 'player2') {
          hitTC(d.myGame.id, d.player2.treasure.payload, "player2")
        }
      }
      else if (treasureHitPlayer3) {
        treasureChest('player3')
        if (d.currentPlayer === 'player3') {
          hitTC(d.myGame.id, d.player3.treasure.payload, "player3")
        }
      }
      else if (treasureHitPlayer4) {
        treasureChest('player4')
        if (d.currentPlayer === 'player4') {
          hitTC(d.myGame.id, d.player4.treasure.payload, "player4")
        }
      }
    }

    // initializing cursor
    let cursors = d.game.input.keyboard.createCursorKeys();
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

    // max downward velocity
    if (d[currPlayer].body.velocity.y > 1000) d[currPlayer].body.velocity.y = 1000

    d[currPlayer].bow.rotation = 0
    d[currPlayer].bow.position.set(2, 16)

    // d[currPlayer].body.velocity.y = (d[currPlayer].body.touching.left || d[currPlayer].body.touching.right) && d[currPlayer].body.velocity.y > 0 ? 6 : d[currPlayer].body.velocity.y
    d[currPlayer].body.gravity.y = (d[currPlayer].body.touching.left || d[currPlayer].body.touching.right) && d[currPlayer].body.velocity.y > 0 ? 50 : 1200

    if (cursors.left.isDown && !d[currPlayer].forceJump) {
      d[currPlayer].body.velocity.x += d[currPlayer].body.touching.down ? -300 : -150
      if (d[currPlayer].jump === 'right' && d[currPlayer].body.velocity.x < 150) d[currPlayer].body.velocity.x = 150

      if (d[currPlayer].scale.x < 0) d[currPlayer].scale.x *= -1

      d[currPlayer].animations.play('walk')

    }
    else if (cursors.right.isDown && !d[currPlayer].forceJump) {
      //  Move to the right
      d[currPlayer].body.velocity.x += d[currPlayer].body.touching.down ? 300 : 150
      if (d[currPlayer].jump === 'left' && d[currPlayer].body.velocity.x > -150) d[currPlayer].body.velocity.x = -150

      if (d[currPlayer].scale.x > 0) d[currPlayer].scale.x *= -1

      d[currPlayer].animations.play('walk')
    }
    else {
      d[currPlayer].animations.stop()
      d[currPlayer].frame = 2
    }

    let amIGrounded
    if (currPlayer === 'player1') amIGrounded = hitPlatform1
    else if (currPlayer === 'player2') amIGrounded = hitPlatform2
    else if (currPlayer === 'player3') amIGrounded = hitPlatform3
    else if (currPlayer === 'player4') amIGrounded = hitPlatform4

    if (cursors.up.isDown && d[currPlayer].body.touching.down && amIGrounded) {
      d[currPlayer].body.velocity.y = -600
    }
    else if (cursors.up.isDown && !d[currPlayer].jump && (d[currPlayer].body.touching.right || d[currPlayer].body.touching.left) && amIGrounded) {
      d[currPlayer].body.velocity.y = -600
      let dir = d[currPlayer].body.touching.right ? -1 : 1
      d[currPlayer].body.velocity.x = 300 * dir
      d[currPlayer].scale.x *= -1
      d[currPlayer].forceJump = true
      d[currPlayer].jump = d[currPlayer].body.touching.right ? 'left' : 'right'
    }

    // flying with wings
    if (cursors.up.isDown && d[currPlayer].treasure.payload === 'wings' && d[currPlayer].wings === true) {
      d[currPlayer].body.velocity.y = -300
    }

    // aiming the bow
    aim()

    // arrow collisions
    arrowPhysics()

    // send your movement to server
    playerMoved(d.myGame.id, d.currentPlayer, d[player].x, d[player].y, d[player].frame, d[player].scale.x, d[player].bow.position, d[player].bow.rotation)
    
  }

  let maxAlive = 0
  let curAlive = 0
  if (d.player1) {
    maxAlive++
    if (d.player1.alive) curAlive++
  }
  if (d.player2) {
    maxAlive++
    if (d.player2.alive) curAlive++
  }
  if (d.player3) {
    maxAlive++
    if (d.player3.alive) curAlive++
  }
  if (d.player4) {
    maxAlive++
    if (d.player4.alive) curAlive++
  }

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

