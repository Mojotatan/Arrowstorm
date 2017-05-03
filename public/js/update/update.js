console.log('the phaser in update', Phaser)

export default function updateFunc(d) {

    //Define collisions 
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.guy)

    // initializing cursor 
    let cursors = d.game.input.keyboard.createCursorKeys();
    //stand still
    d.guy.body.velocity.x = 0

    if (cursors.left.isDown)
    {
      d.guy.body.velocity.x = -250
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        d.guy.body.velocity.x = 250

        //player.animations.play('right');
    }

    if((cursors.up.isDown) && d.guy.body.touching.down && hitPlatform) {
      d.guy.body.velocity.y = -350
    }

}
