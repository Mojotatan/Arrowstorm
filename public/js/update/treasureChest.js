import d from '../game'
import createWings from '../create/createWings'

export default function treasureChest(treasureHitPlayer1, treasureHitPlayer2){
	if (treasureHitPlayer1) {
        if (d.player1.treasure.payload === 'extraArrows') {
            d.player1.numArrows += 2
            console.log('player1 numArrows is', d.player1.numArrows)
        } else if (d.player1.treasure.payload === 'wings') {
            createWings(d, 'player1')
            d.player1.wings = true
            d.player1.wingStart = d.game.time.now
            console.log('d.treasure.payload is wings')
        } else if (d.player1.treasure.payload === 'invisibility') {
            d.player1.invisibility = true
            d.player1.alpha = 0.1
            d.player1.invisibleStart = d.game.time.now
            console.log('d.treasure.payload is invisibility')
        } else if (d.player1.treasure.payload === 'bouncyArrow') {
            d.player1.nextArrowType = 'bouncyArrow'
            console.log('d.treasure.payload is bouncyArrow')
        }

        d.treasure.kill()
    }

    if (treasureHitPlayer2) {
        console.log('d.player2 in treasureChest', d.player2)
        if (d.player2.treasure.payload === 'extraArrows') {
            d.player2.numArrows += 2
            console.log('player2 numArrows is', d.player2.numArrows)
        } else if (d.player2.treasure.payload === 'wings') {
            createWings(d, 'player2')
            d.player2.wings = true
            d.player2.wingStart = d.game.time.now
            console.log('d.treasure.payload is wings')
        } else if (d.player2.treasure.payload === 'invisibility') {
            d.player2.invisibility = true
            d.player2.alpha = 0.1
            d.player2.invisibleStart = d.game.time.now
            console.log('d.treasure.payload is invisibility')
        } else if (d.player2.treasure.payload === 'bouncyArrow') {
            d.player2.nextArrowType = 'bouncyArrow'
            console.log('d.treasure.payload is bouncyArrow')
        }

        d.treasure.kill()
    }

}
