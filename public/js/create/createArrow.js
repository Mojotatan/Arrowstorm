export default function createArrow(d, player) {

  // Create each arrow if player.numArrows > 0

  d.arrow = d.game.add.sprite(player.x, player.y, 'arrow')

  d.arrow.scale.set(2, 2)

  // Set its pivot point to the center of the d.arrow
  d.arrow.anchor.setTo(0.5, 0.5)

  // Enable physics on the d.arrow
  d.game.physics.arcade.enable(d.arrow)
  d.arrow.body.gravity.y = 1500

  d.arrow.checkWorldBounds = true

}
