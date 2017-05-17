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

export default function updateFunc() {
  if (d.currentPlayer) {
    let currPlayer = d.currentPlayer

    //Define collisions
    let hitPlatform1, hitPlatform2, hitPlatform3, hitPlatform4, hitSpikes1, hitSpikes2, hitSpikes3, hitSpikes4

    if (d.player1) {
      wrap(d.player1)
      hitPlatform1 = d.game.physics.arcade.collide(d.platforms, d.player1)
      hitSpikes1 = d.game.physics.arcade.collide(d.spikes, d.player1)
    }
    if (d.player2) {
      wrap(d.player2)
      hitPlatform2 = d.game.physics.arcade.collide(d.platforms, d.player2)
      hitSpikes2 = d.game.physics.arcade.collide(d.spikes, d.player2)
    }
    if (d.player3) {
      wrap(d.player3)
      hitPlatform3 = d.game.physics.arcade.collide(d.platforms, d.player3)
      hitSpikes3 = d.game.physics.arcade.collide(d.spikes, d.player3)
    }
    if (d.player4) {
      wrap(d.player4)
      hitPlatform4 = d.game.physics.arcade.collide(d.platforms, d.player4)
      hitSpikes4 = d.game.physics.arcade.collide(d.spikes, d.player4)
    }

    //Spike collisions
    if (hitSpikes1) {
      d.player1.kill()
      d.blood = d.game.add.sprite(d.player1.x, d.player1.y, 'blood')
      d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      d.blood.scale.set(2, 2)
      d.blood.anchor.x = .5
      d.blood.animations.play('death')
      d.blood.animations.currentAnim.killOnComplete = true
      d.player1.numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }
    if (hitSpikes2) {
      d.player2.kill()
      d.blood = d.game.add.sprite(d.player2.x, d.player2.y, 'blood')
      d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      d.blood.scale.set(2, 2)
      d.blood.anchor.x = .5
      d.blood.animations.play('death')
      d.blood.animations.currentAnim.killOnComplete = true
      d.player2.numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }
    if (hitSpikes3) {
      d.player3.kill()
      d.blood = d.game.add.sprite(d.player3.x, d.player3.y, 'blood')
      d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      d.blood.scale.set(2, 2)
      d.blood.anchor.x = .5
      d.blood.animations.play('death')
      d.blood.animations.currentAnim.killOnComplete = true
      d.player3.numArrows = 0
      playerDead(d.myGame.id, currPlayer)
    }
    if (hitSpikes4) {
      d.player4.kill()
      d.blood = d.game.add.sprite(d.player4.x, d.player4.y, 'blood')
      d.blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
      d.blood.scale.set(2, 2)
      d.blood.anchor.x = .5
      d.blood.animations.play('death')
      d.blood.animations.currentAnim.killOnComplete = true
      d.player4.numArrows = 0
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
      if (treasureHitPlayer1 || treasureHitPlayer2 || treasureHitPlayer3 || treasureHitPlayer4 ) {

        treasureChest(treasureHitPlayer1, treasureHitPlayer2, treasureHitPlayer3, treasureHitPlayer4)

        if (treasureHitPlayer1 && d.currentPlayer === 'player1') {
          hitTC(d.myGame.id, d.player1.treasure.payload, "player1")
        }
        else if (treasureHitPlayer2 && d.currentPlayer === 'player2') {
          hitTC(d.myGame.id, d.player2.treasure.payload, "player2")
        }
        else if (treasureHitPlayer3 && d.currentPlayer === 'player3') {
          hitTC(d.myGame.id, d.player3.treasure.payload, "player3")
        }
        else if (treasureHitPlayer4 && d.currentPlayer === 'player4') {
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

    if (d.player1 && d.player1.wings === true && d.game.time.now - d.player1.wingStart > 5000) {
      d.player1.wings = false
      d.player1.wingLeft.kill()
      d.player1.wingRight.kill()
    }

    if (d.player2 && d.player2.wings === true && d.game.time.now - d.player2.wingStart > 5000) {
      d.player2.wings = false
      d.player2.wingLeft.kill()
      d.player2.wingRight.kill()
    }

    if (d.player3 && d.player3.wings === true && d.game.time.now - d.player3.wingStart > 5000) {
      d.player3.wings = false
      d.player3.wingLeft.kill()
      d.player3.wingRight.kill()
    }

    if (d.player4 && d.player4.wings === true && d.game.time.now - d.player4.wingStart > 5000) {
      d.player4.wings = false
      d.player4.wingLeft.kill()
      d.player4.wingRight.kill()
    }

    if (d.player1 && d.player1.invisibility === true && d.game.time.now - d.player1.invisibleStart > 5000) {
      d.player1.invisibility = false
      d.player1.alpha = 1
    }

    if (d.player2 && d.player2.invisibility === true && d.game.time.now - d.player2.invisibleStart > 5000) {
      d.player2.invisibility = false
      d.player2.alpha = 1
    }

    if (d.player3 && d.player3.invisibility === true && d.game.time.now - d.player3.invisibleStart > 5000) {
      d.player3.invisibility = false
      d.player3.alpha = 1
    }

    if (d.player4 && d.player4.invisibility === true && d.game.time.now - d.player4.invisibleStart > 5000) {
      d.player4.invisibility = false
      d.player4.alpha = 1
    }

    if (d.currentPlayer === 'player1') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player1.x, d.player1.y, d.player1.frame, d.player1.scale.x, d.player1.bow.position, d.player1.bow.rotation) //just sending the scale.x not the entire obj
    }
    else if (d.currentPlayer === 'player2') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player2.x, d.player2.y, d.player2.frame, d.player2.scale.x, d.player2.bow.position, d.player2.bow.rotation)
    }
    else if (d.currentPlayer === 'player3') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player3.x, d.player3.y, d.player3.frame, d.player3.scale.x, d.player3.bow.position, d.player3.bow.rotation)
    }
    else if (d.currentPlayer === 'player4') {
      playerMoved(d.myGame.id, d.currentPlayer, d.player4.x, d.player4.y, d.player4.frame, d.player4.scale.x, d.player4.bow.position, d.player4.bow.rotation)
    }
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

