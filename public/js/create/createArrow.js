export default function createArrow(d, player, arrowType) {

  // Create each arrow if player.numArrows > 0
  console.log('the current player in createArrow', d[player].bow.world)
  let currPlayer = d.currentPlayer

  if (arrowType === 'regular') {
    //let arrow  = d.game.add.sprite(player.x, player.y, 'arrow')
    let arrow  = d.game.add.sprite(d[player].bow.world.x, d[player].bow.world.y, 'arrow')

    arrow.scale.set(2, 2)

    // Set its pivot point to the center of the arrow
    arrow.anchor.setTo(0.5, 0.5)

    // Enable physics on the arrow
    d.game.physics.arcade.enable(arrow)
    arrow.body.gravity.y = 1500

    arrow.checkWorldBounds = true

    arrow.type = 'regular'

    d.arrowsArray.push(arrow);

    d.arrow = arrow
  } else {
    let arrow  = d.game.add.sprite(d[player].bow.world.x, d[player].bow.world.y, 'arrow')

    arrow.scale.set(2, 2)

    // Set its pivot point to the center of the arrow
    arrow.anchor.setTo(0.5, 0.5)

    // Enable physics on the arrow
    d.game.physics.arcade.enable(arrow)

    arrow.checkWorldBounds = true

    arrow.body.bounce.set(1.2)

    arrow.type = 'bouncyArrow'

    arrow.lifespan = 2000

    d.arrowsArray.push(arrow);

    d.arrow = arrow
  }

}
