
export default function updateFunc(d) {

    console.log('player in update', d.player)

    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.player)
    // let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.guy)

    // initializing cursor 
    let cursors = d.game.input.keyboard.createCursorKeys();
    //stand still
    d.player.body.velocity.x = 0

    if (cursors.left.isDown)
    {
      d.player.body.velocity.x = -250

      if (d.roboraj.scale.x < 0) d.roboraj.scale.x *= -1

      d.roboraj.animations.play('walk')

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        d.player.body.velocity.x = 250


        if (d.roboraj.scale.x > 0) d.roboraj.scale.x *= -1

        d.roboraj.animations.play('walk')
    }
    else {
      d.roboraj.animations.stop()
    }

    if((cursors.up.isDown) && d.roboraj.body.touching.down && hitPlatform) {
      d.player.body.velocity.y = -350
    }

}
