import d from '../game'

export default function(map) {
  d.preview = d.game.add.group()

  map.blocks.forEach(block => {
    let x = block.x - 192
    x /= 2
    x += 32
    let y = block.y / 2
    y += 320 - 32
    let newBlock = d.preview.create(x, y, block.tile)
    newBlock.scale.set(.5, .5)
  })

}