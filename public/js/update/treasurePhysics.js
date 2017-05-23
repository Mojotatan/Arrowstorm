import d from '../game'
import treasureChest from './treasureChest'
import {hitTC} from '../client'

export default function treasurePhysics() {
  // Treasure chest collisions
  let treasureHitPlatforms = d.game.physics.arcade.collide(d.treasure, d.platforms)
  if (treasureHitPlatforms) {
    d.treasure.body.velocity.x = 0
    d.treasure.body.velocity.y = 0
    d.treasure.body.acceleration = 0
    d.treasure.body.gravity.y = 0
    d.treasure.body.immovable = true
  }
  if (d.treasure.body.velocity.y > 1000) d.treasure.body.velocity.y = 1000

  d.players.forEach(player => {
    let treasureHitPlayer = d.game.physics.arcade.collide(d.treasure, d[player])
    if (treasureHitPlayer) {
      treasureChest(player)
      if (d.currentPlayer === player) hitTC(d.myGame.id, d[player].treasure.payload, player)
    }
  })

}