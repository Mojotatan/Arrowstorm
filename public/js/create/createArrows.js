import resetArrow from './resetArrow'

export default function createArrows(d) {

  const numOfArrows = 1;

  // Create an object pool of arrows
  d.arrowsGroup = d.game.add.group()

  for (let i = 0; i < numOfArrows; i++) {

    // Create each arrow and add it to the group.
    d.arrow = d.game.add.sprite(0, 0, 'arrow')
    d.arrowsGroup.add(d.arrow)

    d.arrow.scale.set(2, 2)

    // Set its pivot point to the center of the d.arrow
    d.arrow.anchor.setTo(0.5, 0.5)

    // Enable physics on the d.arrow
    d.game.physics.arcade.enable(d.arrow)
    d.arrow.body.gravity.y = 1500

    d.arrow.checkWorldBounds = true
  }

  d.arrowsGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetArrow);

}
