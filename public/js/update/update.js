import {findA} from '../util'
import fireArrow from './fireArrow'
import {playerMoved} from '../client'
import d from '../game'
//import Client from '../client'

export default function updateFunc() {

    //Check for existing players 


    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player1)
    let hitBricks = d.game.physics.arcade.collide(d.leftWall, d.player1)

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

    //stand still
    // if (d.player1.body.touching.down) d.player1.body.velocity.x = 0
    // else if (d.player1.body.velocity.x > 0) d.player1.body.velocity.x -= 100
    // else if (d.player1.body.velocity.x < 0) d.player1.body.velocity.x += 100

    // if (d.player1.body.velocity.x < 300 && d.player1.body.velocity.x > -300) d.player1.body.velocity.x = 0

    if (d.player1.body.velocity.y >= -200) d.player1.forceJump = false
    if (d.player1.body.touching.down || d.player1.body.touching.right || d.player1.body.touching.left) d.player1.jump = false
    if (!d.player1.forceJump) {
        if (!d.player1.body.touching.down) {
            if (d.player1.body.velocity.x > 150) d.player1.body.velocity.x = 150
            else if (d.player1.body.velocity.x < -150) d.player1.body.velocity.x = -150
        } else {
            d.player1.body.velocity.x = 0
        }
    }

    d.bow.rotation = 0
    d.bow.position.set(2, 16)


    d.player1.body.gravity.y = (d.player1.body.touching.left || d.player1.body.touching.right) && d.player1.body.velocity.y > 0 ? 50 : 1200

    if (cursors.left.isDown && !d.player1.forceJump)
    {
      d.player1.body.velocity.x += d.player1.body.touching.down ? -300 : -150
      if (d.player1.jump === 'right' && d.player1.body.velocity.x < 150) d.player1.body.velocity.x = 150

      if (d.player1.scale.x < 0) d.player1.scale.x *= -1

      d.player1.animations.play('walk')

    }
    else if (cursors.right.isDown && !d.player1.forceJump)
    {
        //  Move to the right
        d.player1.body.velocity.x += d.player1.body.touching.down ? 300 : 150
        if (d.player1.jump === 'left' && d.player1.body.velocity.x > -150) d.player1.body.velocity.x = -150

        if (d.player1.scale.x > 0) d.player1.scale.x *= -1

        d.player1.animations.play('walk')
    }
    else {
      d.player1.animations.stop()
      d.player1.frame = 2
    }

    if (cursors.up.isDown && d.player1.body.touching.down && hitPlatform) {
      d.player1.body.velocity.y = -600
    }
    else if (cursors.up.isDown && !d.player1.jump && (d.player1.body.touching.right || d.player1.body.touching.left) && (hitPlatform || hitBricks)) {
      d.player1.body.velocity.y = -600
      let dir = d.player1.body.touching.right ? -1 : 1
      d.player1.body.velocity.x = 300 * dir
      d.player1.scale.x *= -1
      d.player1.forceJump = true
      d.player1.jump = d.player1.body.touching.right ? 'left' : 'right'
    }

    // you can turn your player by either moving in a direction or by aiming in a direction
    // the direction you aim in takes precedent over the direction you move in
    // which allows for strafing
    if (d.aimLeft.isDown) {
      if (d.player1.scale.x < 0) d.player1.scale.x *= -1
    }
    else if (d.aimRight.isDown) {
      if (d.player1.scale.x > 0) d.player1.scale.x *= -1
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

    d.game.physics.arcade.collide(d.arrow, d.leftWall)
    d.game.physics.arcade.collide(d.arrow, d.rightWall)
    //d.game.physics.arcade.collide(d.arrow, d.platforms)
    d.arrow.angle -= 1

    if (d.spaceBar.isDown) {
        fireArrow(d)
    }
    // console.log('player1 x is', d.player1.x)
    playerMoved(d.player1.x, d.player1.y)

}

export function opponentPos(positionObj) {
    console.log('the new position is ', positionObj)
    d.player1.x = positionObj.x
    d.player1.y = positionObj.y
}

