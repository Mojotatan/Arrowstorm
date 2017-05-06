export default function createArrow(d, player) {

  // Create each arrow if player.numArrows > 0

  let arrow  = d.game.add.sprite(player.x, player.y, 'arrow')

  arrow.scale.set(2, 2)

  // Set its pivot point to the center of the arrow
  arrow.anchor.setTo(0.5, 0.5)

  // Enable physics on the arrow
  d.game.physics.arcade.enable(arrow)
  arrow.body.gravity.y = 1500

  arrow.checkWorldBounds = true

  d.arrowsArray.push(arrow);

  d.arrow = arrow

}
