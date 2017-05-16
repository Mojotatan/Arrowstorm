import d from '../game'
import createWings from '../create/createWings'
import {appendArrowDisplay} from './arrowDisplay'

export default function treasureChest(treasureHitPlayer1, treasureHitPlayer2, treasureHitPlayer3, treasureHitPlayer4){
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

	if (treasureHitPlayer3) {
    if (d.player3.treasure.payload === 'extraArrows') {
      d.player3.numArrows++
      appendArrowDisplay('player3', d.player3.numArrows)
      d.player3.numArrows++
      appendArrowDisplay('player3', d.player3.numArrows)
    } else if (d.player3.treasure.payload === 'wings') {
      createWings(d, 'player3')
      d.player3.wings = true
      d.player3.wingStart = d.game.time.now
    } else if (d.player3.treasure.payload === 'invisibility') {
      d.player3.invisibility = true
      d.player3.alpha = 0.1
      d.player3.invisibleStart = d.game.time.now
    } else if (d.player3.treasure.payload === 'bouncyArrow') {
      d.player3.nextArrowType = 'bouncyArrow'
    }

    d.treasure.kill()
  }

	if (treasureHitPlayer4) {
    if (d.player4.treasure.payload === 'extraArrows') {
      d.player4.numArrows++
      appendArrowDisplay('player4', d.player4.numArrows)
      d.player4.numArrows++
      appendArrowDisplay('player4', d.player4.numArrows)
    } else if (d.player4.treasure.payload === 'wings') {
      createWings(d, 'player4')
      d.player4.wings = true
      d.player4.wingStart = d.game.time.now
    } else if (d.player4.treasure.payload === 'invisibility') {
      d.player4.invisibility = true
      d.player4.alpha = 0.1
      d.player4.invisibleStart = d.game.time.now
    } else if (d.player4.treasure.payload === 'bouncyArrow') {
      d.player4.nextArrowType = 'bouncyArrow'
    }

    d.treasure.kill()
  }

}
