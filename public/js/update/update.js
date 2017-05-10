import {findA} from '../util'
import fireArrow from './fireArrow'
import {playerMoved, onAimRight, onAimUp, onAimLeft, onAimDown, playerDead} from '../client'
import d, { localState } from '../game'
import wrap from './wrap'
import createTreasureChest from '../create/createTreasureChest'
import playerAim from './playerAim'
import arrowPhysics from './arrowPhysics'
import treasureChest from './treasureChest'
import { hitTC } from '../client'

//import Client from '../client'

export default function updateFunc() {
  if (d.currentPlayer) {
    let currPlayer = d.currentPlayer

    //console.log('the d in update is', d[currPlayer], currPlayer)
    //World wrap
    wrap(d.player1)
    wrap(d.player2)

    if (d.arrow) wrap(d.arrow)

    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player1)
    let hitPlatformP2 = d.game.physics.arcade.collide(d.platforms, d.player2)
    let hitSpikes = d.game.physics.arcade.collide(d.spikes, d.player1)
    let hitSpikesP2 = d.game.physics.arcade.collide(d.spikes, d.player2)

    //Spike collisions
    if (hitSpikes) {
      d.player1.kill()
      d.player1.numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }
    if (hitSpikesP2) {
      d.player2.kill()
      d.player2.numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }

    // define collisions for new players
    for (let i = 0; i < d.playerMap.length; i++) {
      d.game.physics.arcade.collide(d.platforms, d.playerMap[i])
    }

    // Treasure chest collisions
    let treasureHitPlatforms = d.game.physics.arcade.collide(d.treasure, d.platforms)
    let treasureHitPlayer1 = d.game.physics.arcade.collide(d.treasure, d.player1)
    let treasureHitPlayer2 = d.game.physics.arcade.collide(d.treasure, d.player2)

    if (treasureHitPlatforms) {
      d.treasure.body.velocity.x = 0
      d.treasure.body.velocity.y = 0
      d.treasure.body.acceleration = 0
      d.treasure.body.gravity.y = 0
      d.treasure.body.immovable = true
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

    if (cursors.up.isDown && d[currPlayer].body.touching.down && hitPlatform) {
      d[currPlayer].body.velocity.y = -600
    }
    else if (cursors.up.isDown && !d[currPlayer].jump && (d[currPlayer].body.touching.right || d[currPlayer].body.touching.left) && hitPlatform) {
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

    // you can turn your player by either moving in a direction or by aiming in a direction
    // the direction you aim in takes precedent over the direction you move in
    // which allows for strafing
    if (d.aimLeft.isDown) {
      if (d[currPlayer].scale.x < 0) d[currPlayer].scale.x *= -1
    }
    else if (d.aimRight.isDown) {
      if (d[currPlayer].scale.x > 0) d[currPlayer].scale.x *= -1
    }

    // for the diagonal directions
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

    // arrow collisions
    arrowPhysics()

    // treasureChest details and logic
    if (treasureHitPlayer1 || treasureHitPlayer2) {
        console.log('treasureHitPlayer1 in update is', treasureHitPlayer1)
        console.log('treasureHitPlayer2 in update is', treasureHitPlayer2)
        console.log('current player in update', d)

        treasureChest(treasureHitPlayer1, treasureHitPlayer2)

        if (treasureHitPlayer1 && d.currentPlayer === 'player1') {
            console.log('player 1 treasure payload in update', d.player1.treasure.payload)
            hitTC(d.myGame.id, d.player1.treasure.payload, "player1")
        }
        else if (treasureHitPlayer2 && d.currentPlayer === 'player2') {
            console.log('player 2 treasure payload in update', d.player2.treasure.payload)
            hitTC(d.myGame.id, d.player2.treasure.payload, "player2")
        }
    }

    if (d.player1.wings === true && d.game.time.now - d.player1.wingStart > 5000) {
        d.player1.wings = false
        d.player1.wingLeft.kill()
        d.player1.wingRight.kill()
    }

    if (d.player2.wings === true && d.game.time.now - d.player2.wingStart > 5000) {
        d.player2.wings = false
        d.player2.wingLeft.kill()
        d.player2.wingRight.kill()
    }

    if (d.player1.invisibility === true && d.game.time.now - d.player1.invisibleStart > 5000) {
        d.player1.invisibility = false
        d.player1.alpha = 1
    }

    if (d.player2.invisibility === true && d.game.time.now - d.player2.invisibleStart > 5000) {
        d.player2.invisibility = false
        d.player2.alpha = 1
    }

    if (d.currentPlayer === 'player1') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player1.x, d.player1.y, d.player1.frame, d.player1.scale.x, d.player1.bow.position, d.player1.bow.rotation) //just sending the scale.x not the entire obj
    }
    else if (d.currentPlayer === 'player2') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player2.x, d.player2.y, d.player2.frame, d.player2.scale.x, d.player2.bow.position, d.player2.bow.rotation)
    }
  }

}

export function opponentPos(positionObj) {
//console.log('positionObj is ',positionObj)
//console.log('player2 is ', d.player2.x)
  if (d.currentPlayer === 'player1') {
    d.player2.x = positionObj.x
    d.player2.y = positionObj.y
    d.player2.frame = positionObj.frame
    d.player2.scale.x = positionObj.scale
    d.player2.bow.position.x = positionObj.position.x
    d.player2.bow.position.y = positionObj.position.y
    d.player2.bow.rotation = positionObj.rotation
  }
  else if (d.currentPlayer === 'player2') {
    d.player1.x = positionObj.x
    d.player1.y = positionObj.y
    d.player1.frame = positionObj.frame
    d.player1.scale.x = positionObj.scale // positionObj.scale is the scale.x value
    d.player1.bow.position.x = positionObj.position.x
    d.player1.bow.position.y = positionObj.position.y
    d.player1.bow.rotation = positionObj.rotation
  }
}

