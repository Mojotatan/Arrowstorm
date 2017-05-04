import {findA} from '../util'

export default function updateFunc(d) {

    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player1)
    let hitBricks = d.game.physics.arcade.collide(d.leftWall, d.player1)


    // initializing cursor
    let cursors = d.game.input.keyboard.createCursorKeys();
    d.aimLeft = d.game.input.keyboard.addKey(Phaser.Keyboard.A)
    d.aimUp = d.game.input.keyboard.addKey(Phaser.Keyboard.W)
    d.aimRight = d.game.input.keyboard.addKey(Phaser.Keyboard.D)
    d.aimDown = d.game.input.keyboard.addKey(Phaser.Keyboard.S)

    //stand still
    d.player1.body.velocity.x = 0
    d.bow.rotation = 0
    d.bow.position.set(2, 16)

    if (cursors.left.isDown)
    {
      d.player1.body.velocity.x = -300

      if (d.player1.scale.x < 0) d.player1.scale.x *= -1

      d.player1.animations.play('walk')

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        d.player1.body.velocity.x = 300

        if (d.player1.scale.x > 0) d.player1.scale.x *= -1

        d.player1.animations.play('walk')
    }
    else {
      d.player1.animations.stop()
      d.player1.frame = 2
    }

    if((cursors.up.isDown) && d.player1.body.touching.down && hitPlatform) {
      d.player1.body.velocity.y = -500
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


    if (d.spaceBar.isDown) {
        fireArrow(d)
    }

}

function fireArrow(d) {
    let arrow = d.arrows.getFirstExists(false)
    if (arrow) {
        arrow.scale.set(4,4)
        arrow.animations.play('fire')
        arrow.body.gravity.y = 400
        //arrow.body.collideWorldBounds = true
        arrow.reset(d.player1.x, d.player1.y)


        if (d.aimUp.isDown) {
            if (d.aimLeft.isDown) {
                arrow.rotation = -0.785
                arrow.body.velocity.y = -1000
                arrow.body.velocity.x = -1000
            } else if (d.aimRight.isDown) {
                arrow.rotation = 0.785
                arrow.body.velocity.y = -1000
                arrow.body.velocity.x = 1000
            } else {
                arrow.rotation = 0
                arrow.body.velocity.y = -1000
            }
        } else if (d.aimDown.isDown) {
            if (d.aimLeft.isDown) {
                arrow.rotation = -2.355
                arrow.body.velocity.y = 1000
                arrow.body.velocity.x = -1000
            } else if (d.aimRight.isDown) {
                arrow.rotation = 2.355
                arrow.body.velocity.y = 1000
                arrow.body.velocity.x = 1000
            } else {
                arrow.rotation = 3.14
                arrow.body.velocity.y = 1000
            }
        } else if (d.aimRight.isDown) {
            arrow.rotation = 1.57
            arrow.body.velocity.x = 1000
        } else {
            arrow.rotation = -1.57
            arrow.body.velocity.x = -1000
        }
    }
}


