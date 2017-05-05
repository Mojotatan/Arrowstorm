import {findA} from '../util'
import fireArrow from './fireArrow'
import {playerMoved} from '../client'
import d, { localState } from '../game'
import wrap from './wrap'

//import Client from '../client'
console.log('before update', d)

export default function updateFunc() {

    //Check for existing players
    
    if (d.currentPlayer) {
        let currPlayer = d.currentPlayer
    

    //console.log('the d in update is', d[currPlayer], currPlayer)
    //World wrap
    wrap(d.player1)

    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player1)
    let hitPlatformP2 = d.game.physics.arcade.collide(d.platforms, d.player2)

    // define collisions for new players
    for (let i = 0; i < d.playerMap.length; i++) {
        d.game.physics.arcade.collide(d.platforms, d.playerMap[i])
    }


    // initializing cursor
    let cursors = d.game.input.keyboard.createCursorKeys();
    d.aimLeft = d.game.input.keyboard.addKey(Phaser.Keyboard.A)
    d.aimUp = d.game.input.keyboard.addKey(Phaser.Keyboard.W)
    d.aimRight = d.game.input.keyboard.addKey(Phaser.Keyboard.D)
    d.aimDown = d.game.input.keyboard.addKey(Phaser.Keyboard.S)


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

    d.bow.rotation = 0
    d.bow.position.set(2, 16)

    // d[currPlayer].body.velocity.y = (d[currPlayer].body.touching.left || d[currPlayer].body.touching.right) && d[currPlayer].body.velocity.y > 0 ? 6 : d[currPlayer].body.velocity.y
    d[currPlayer].body.gravity.y = (d[currPlayer].body.touching.left || d[currPlayer].body.touching.right) && d[currPlayer].body.velocity.y > 0 ? 50 : 1200

    if (cursors.left.isDown && !d[currPlayer].forceJump)
    {
      d[currPlayer].body.velocity.x += d[currPlayer].body.touching.down ? -300 : -150
      if (d[currPlayer].jump === 'right' && d[currPlayer].body.velocity.x < 150) d[currPlayer].body.velocity.x = 150

      if (d[currPlayer].scale.x < 0) d[currPlayer].scale.x *= -1

      d[currPlayer].animations.play('walk')

    }
    else if (cursors.right.isDown && !d[currPlayer].forceJump)
    {
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
    else if (cursors.up.isDown && !d[currPlayer].jump && (d[currPlayer].body.touching.right || d[currPlayer].body.touching.left) && (hitPlatform || hitBricks)) {
      d[currPlayer].body.velocity.y = -600
      let dir = d[currPlayer].body.touching.right ? -1 : 1
      d[currPlayer].body.velocity.x = 300 * dir
      d[currPlayer].scale.x *= -1
      d[currPlayer].forceJump = true
      d[currPlayer].jump = d[currPlayer].body.touching.right ? 'left' : 'right'
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
        d.bow.rotation = -.785
        d.bow.position.set(10 - distanceFromCenter, 16 + distanceFromCenter)
      }
      else if (d.aimDown.isDown && d.aimRight.isDown) {
        d.bow.rotation = -.785
        d.bow.position.set(10 - distanceFromCenter, 16 + distanceFromCenter)
      }
      else {
        d.bow.rotation = -1.57
        d.bow.position.set(10, 24)
      }
    }
    if (d.aimUp.isDown) {
      if (d.aimUp.isDown && d.aimLeft.isDown) {
        d.bow.rotation = .785
        d.bow.position.set(10 - distanceFromCenter, 16 - distanceFromCenter)
      }
      else if (d.aimUp.isDown && d.aimRight.isDown) {
        d.bow.rotation = .785
        d.bow.position.set(10 - distanceFromCenter, 16 - distanceFromCenter)
      }
      else {
        d.bow.rotation = 1.57
        d.bow.position.set(10, 8)
      }
    }

    // arrow collisions
    let arrowHitleftWall = d.game.physics.arcade.collide(d.arrow, d.leftWall)
    let arrowHitrightWall = d.game.physics.arcade.collide(d.arrow, d.rightWall)
    let arrowHitPlatforms = d.game.physics.arcade.collide(d.arrow, d.platforms)
    let arrowHitPlayer = d.game.physics.arcade.collide(d.arrow, d[currPlayer])

    if (d.arrow) {
        if (d.arrow.body.velocity.x > 0) {
            d.arrow.angle += 1
        }
        if (d.arrow.body.velocity.x < 0) {
            d.arrow.angle -= 1
        }
    }

    if (arrowHitPlatforms || arrowHitrightWall || arrowHitleftWall) {
        d.arrow.body.velocity.x = 0
        d.arrow.body.velocity.y = 0
        d.arrow.body.acceleration = 0
        d.arrow.body.gravity.y = 0
        d.arrow.body.immovable = true
    }

    if (arrowHitPlayer) {
        if (d.arrow.body.velocity.x === 0 && d.arrow.body.velocity.y === 0) {
            d.arrow.kill()
            d[currPlayer].numArrows++
        } else {
            d[currPlayer].kill()
            d[currPlayer].numArrows = 0
        }

    }

    // console.log('player1 x is', d.player1.x)
    //playerMoved(d.player1.x, d.player1.y)
    if (d.currentPlayer === 'player1') {
        playerMoved(d.currentPlayer, d.player1.x, d.player1.y)
    }
    else if (d.currentPlayer === 'player2') {
        playerMoved(d.currentPlayer, d.player2.x, d.player2.y)
    }
}

}

export function opponentPos(positionObj) {
    //console.log('the new position is ', positionObj)
    // d.player2.x = positionObj.x
    // d.player2.y = positionObj.y
    // console.log ('the local state in update', localState)
    //console.log('the player map in update', positionObj)

    if (d.currentPlayer === 'player1') {
        d.player2.x = positionObj.x
        d.player2.y = positionObj.y
    }
    else if (d.currentPlayer === 'player2') {
        d.player1.x = positionObj.x
        d.player1.y = positionObj.y
    }
    // console.log('the d is ', d)
    // if (!d.playerMap) {
    //    d.playerMap = {}
    // }
    // let keyArr = Object.keys(d.playerMap)
    // console.log(keyArr)
    // Object.keys(d.playerMap).forEach(function(key){
    //     if (key !== localState.player) {
    //         d.playerMap[key].x = positionObj.x
    //         d.playerMap[key].y = positionObj.y
    //     }
    // })


}

