export default function fireArrow(d) {

    const shotDelay = 300  // milliseconds (10 bullets/3 seconds)
    let lastArrowShotAt

    // Enforce a short delay between shots by recording
    // the time that each arrow is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (lastArrowShotAt === undefined) lastArrowShotAt = 0
    if (d.game.time.now - lastArrowShotAt < shotDelay) return
    lastArrowShotAt = d.game.time.now

    // Get a dead arrow from the pool
    let arrow = d.arrowsGroup.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (!arrow) return

    // This makes the arrow "alive"
    arrow.revive()

    arrow.reset(d.player1.x, d.player1.y)

    // if (d.game.physics.arcade.collide(arrow, d.platforms, stopMoving, null, this)) {
    //     console.log('collision!!!')
    // }

    if (d.aimUp.isDown) {
        if (d.aimLeft.isDown) {
            arrow.rotation = -0.785
            arrow.body.velocity.y = -1000
            arrow.body.velocity.x = -1000
            arrow.body.acceleration.y = 1000
            arrow.body.acceleration.x = 1000
            arrow.angle -= 10
        } else if (d.aimRight.isDown) {
            arrow.rotation = 0.785
            arrow.body.velocity.y = -1000
            arrow.body.velocity.x = 1000
            arrow.body.acceleration.y = 1000
            arrow.body.acceleration.x = -1000
        } else {
            arrow.rotation = 0
            arrow.body.velocity.y = -1000
            arrow.body.acceleration.y = 1000
        }
    } else if (d.aimDown.isDown) {
        if (d.aimLeft.isDown) {
            arrow.rotation = -2.355
            arrow.body.velocity.y = 1000
            arrow.body.velocity.x = -1000
            arrow.body.acceleration.y = -1000
            arrow.body.acceleration.x = 1000
        } else if (d.aimRight.isDown) {
            arrow.rotation = 2.355
            arrow.body.velocity.y = 1000
            arrow.body.velocity.x = 1000
            arrow.body.acceleration.y = -1000
            arrow.body.acceleration.x = -1000
        } else {
            arrow.rotation = 3.14
            arrow.body.velocity.y = 1000
            arrow.body.acceleration.y = -1000
        }
    } else if (d.aimRight.isDown) {
        arrow.rotation = 1.57
        arrow.body.velocity.x = 1000
        arrow.body.acceleration.x = -1000
    } else {
        arrow.rotation = -1.57
        arrow.body.velocity.x = -1000
        arrow.body.acceleration.x = 1000
    }

}

// function stopMoving(arrow) {
//     console.log('in the stopMoving function!!!')
//     arrow.body.velocity.y = 0
//     arrow.body.velocity.x = 0
// }
