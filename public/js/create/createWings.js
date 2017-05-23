export default function createWings (d, player) {

  // the first two sprites on the sheet are always for walking
  // the last sprite is a standing animation if there is one

  d[player].wingLeft = d.game.add.sprite(0, 0, 'wing')
  d[player].wingLeft.anchor.set(1, 0.5)
  d[player].wingLeft.scale.set(0.05)
  d[player].wingLeft.position.set(10, 10)

  d[player].wingRight = d.game.add.sprite(0, 0, 'wing')
  d[player].wingRight.anchor.set(1, 0.5)
  d[player].wingRight.scale.set(0.05)
  d[player].wingRight.scale.x *= -1
  d[player].wingRight.position.set(10, 10)

  d[player].addChild(d[player].wingLeft)
  d[player].addChild(d[player].wingRight)

  console.log('player in createWings', d[player])
}
