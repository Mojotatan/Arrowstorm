import d from '../game'
import createWings from '../create/createWings'
import {appendArrowDisplay} from './arrowDisplay'

export default function treasureChest(player){

  if (d[player].treasure.payload === 'extraArrows') {
    d[player].numArrows++
    appendArrowDisplay(player, d[player].numArrows)
    d[player].numArrows++
    appendArrowDisplay(player, d[player].numArrows)
  } else if (d[player].treasure.payload === 'wings') {
    createWings(d, player)
    d[player].wings = true
    d.game.time.events.add(5000, function() {
      d[player].wings = false
      d[player].wingLeft.kill()
      d[player].wingRight.kill()
    })
  } else if (d[player].treasure.payload === 'invisibility') {
    d[player].alpha = 0.1
    d.game.time.events.add(5000, function() {
      d[player].alpha = 1
    })
  } else if (d[player].treasure.payload === 'bouncyArrow') {
    d[player].nextArrowType = 'bouncyArrow'
  } else if (d[player].treasure.payload === 'shrink') {
    d[player].scale.set(.5, .5)
    d.game.time.events.add(5000, function() {
      d[player].scale.set(1.5, 1.5)
    })
  }

  d.treasure.kill()
}