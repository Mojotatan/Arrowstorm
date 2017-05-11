import d from '../game'

export default function(map) {
  d.preview = d.game.add.group()

  map.blocks.forEach(block => {
    let x = block.x - 192
    x /= 2
    let y = block.y / 2
    y += 320
    let newBlock = d.preview.create(x, y, block.tile)
    newBlock.scale.set(.125, .125)
  })

}