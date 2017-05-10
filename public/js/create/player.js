export default function createPlayer (d, spriteName, player, position) {
  // character sprites are 20 by 32
  console.log()

  d[player] = d.game.add.sprite(position.x, position.y, spriteName)
  d[player].scale.set(1.5, 1.5) // (2, 2) looks better but is a bit big for the map
  d[player].pivot.set(10, 0)
  d[player].numArrows = 5
  d.game.physics.arcade.enable(d[player])
  d[player].body.gravity.y = 1200
  // d[player].body.bounce.y = 0.3
  // d[player].body.collideWorldBounds = true

  // the first two sprites on the sheet are always for walking
  // the last sprite is a standing animation if there is one
  d[player].animations.add('walk', [0, 1], 10, true)

  d[player].bow = d.game.add.sprite(0, 0, 'bow')
  d[player].bow.anchor.set(1, .5)

  d[player].addChild(d[player].bow)

}
