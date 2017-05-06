import createArrow from '../create/createArrow'
import { arrowShot } from '../client'

export default function fireArrow(d, opponent) {

    let currPlayer

    if (d.currentPlayer) {
        currPlayer = d.currentPlayer
    }
    
    if (opponent === true) {
        if (d[currPlayer] === 'player1') {
            createArrow(d, d['player2'])
        }
        else {
            createArrow(d, d['player1'])
        }
    }

    else {


        const shotDelay = 300  // milliseconds (10 bullets/3 seconds)
        let lastArrowShotAt

        // Enforce a short delay between shots by recording
        // the time that each arrow is shot and testing if
        // the amount of time since the last shot is more than
        // the required delay.
        if (lastArrowShotAt === undefined) lastArrowShotAt = 0
        if (d.game.time.now - lastArrowShotAt < shotDelay) return
        lastArrowShotAt = d.game.time.now

        if (d[currPlayer].numArrows > 0) {
                arrowShot()
                createArrow(d, d[currPlayer])
        }

        // If there aren't any arrows available then don't shoot
        if (!d.arrow || d[currPlayer].numArrows <= 0) return
        
    }


    if (d.aimUp.isDown) {
        if (d.aimLeft.isDown) {
            d.arrow.rotation = -0.785
            d.arrow.body.velocity.y = -1000
            d.arrow.body.velocity.x = -1000
            d.arrow.body.acceleration.y = 1000
            d.arrow.body.acceleration.x = 1000
        } else if (d.aimRight.isDown) {
            d.arrow.rotation = 0.785
            d.arrow.body.velocity.y = -1000
            d.arrow.body.velocity.x = 1000
            d.arrow.body.acceleration.y = 1000
            d.arrow.body.acceleration.x = -1000
        } else {
            d.arrow.rotation = 0
            d.arrow.body.velocity.y = -1414
            d.arrow.body.acceleration.y = 1000
        }
    } else if (d.aimDown.isDown) {
        if (d.aimLeft.isDown) {
            d.arrow.rotation = -2.355
            d.arrow.body.velocity.y = 1000
            d.arrow.body.velocity.x = -1000
            d.arrow.body.acceleration.y = -1000
            d.arrow.body.acceleration.x = 1000
        } else if (d.aimRight.isDown) {
            d.arrow.rotation = 2.355
            d.arrow.body.velocity.y = 1000
            d.arrow.body.velocity.x = 1000
            d.arrow.body.acceleration.y = -1000
            d.arrow.body.acceleration.x = -1000
        } else {
            d.arrow.rotation = 3.14
            d.arrow.body.velocity.y = 1414
            d.arrow.body.acceleration.y = -1000
        }
    } else if (d.aimRight.isDown) {
        d.arrow.rotation = 1.57
        d.arrow.body.velocity.x = 1414
        d.arrow.body.acceleration.x = -1000
    } else {
        d.arrow.rotation = -1.57
        d.arrow.body.velocity.x = -1414
        d.arrow.body.acceleration.x = 1000
    }

    if (opponent === false) {
        d[currPlayer].numArrows--
    }

}
