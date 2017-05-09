import d from '../game'

export default function createTreasureChest(posX, posY) {

  let currPlayer

  if (d.currentPlayer) {
        currPlayer = d.currentPlayer
    }

  d.treasure  = d.game.add.sprite(posX, posY, 'treasure')

  d.treasure.scale.set(0.1, 0.1)

  d.treasure.anchor.setTo(0.5, 0.5)

  d.game.physics.arcade.enable(d.treasure)
  d.treasure.body.gravity.y = 1200

  d.treasure.checkWorldBounds = true

  d[currPlayer].treasure.payload = d.treasuresArray[Math.floor(Math.random() * d.treasuresArray.length)]
  console.log('d.treasure.payload is', d[currPlayer].treasure.payload)

}
