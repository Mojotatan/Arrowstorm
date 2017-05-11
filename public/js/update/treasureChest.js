import d from '../game'
import createWings from '../create/createWings'
import {appendArrowDisplay} from './arrowDisplay'

export default function treasureChest(treasureHitPlayer1, treasureHitPlayer2){
	if (treasureHitPlayer1) {
        if (d.player1.treasure.payload === 'extraArrows') {
            d.player1.numArrows++
            appendArrowDisplay('player1', d.player1.numArrows)
            d.player1.numArrows++
            appendArrowDisplay('player1', d.player1.numArrows)
        } else if (d.player1.treasure.payload === 'wings') {
            createWings(d, 'player1')
            d.player1.wings = true
            d.player1.wingStart = d.game.time.now
        } else if (d.player1.treasure.payload === 'invisibility') {
            d.player1.invisibility = true
            d.player1.alpha = 0.1
            d.player1.invisibleStart = d.game.time.now
        } else if (d.player1.treasure.payload === 'bouncyArrow') {
            d.player1.nextArrowType = 'bouncyArrow'
        }

        d.treasure.kill()
    }

    if (treasureHitPlayer2) {
        console.log('d.player2 in treasureChest', d.player2)
        if (d.player2.treasure.payload === 'extraArrows') {
            d.player2.numArrows++
            appendArrowDisplay('player2', d.player2.numArrows)
            d.player2.numArrows++
            appendArrowDisplay('player2', d.player2.numArrows)
        } else if (d.player2.treasure.payload === 'wings') {
            createWings(d, 'player2')
            d.player2.wings = true
            d.player2.wingStart = d.game.time.now
        } else if (d.player2.treasure.payload === 'invisibility') {
            d.player2.invisibility = true
            d.player2.alpha = 0.1
            d.player2.invisibleStart = d.game.time.now
        } else if (d.player2.treasure.payload === 'bouncyArrow') {
            d.player2.nextArrowType = 'bouncyArrow'
        }

        d.treasure.kill()
    }

}
