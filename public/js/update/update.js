console.log('the phaser in update', Phaser)

export default function updateFunc({game, guy, platforms}) {

    //Define collisions 
    let hitPlatform = game.physics.arcade.collide(platforms, guy)

    // initializing cursor 
    let cursors = game.input.keyboard.createCursorKeys();
    //stand still
    guy.body.velocity.x = 0

    if (cursors.left.isDown)
    {
      guy.body.velocity.x = -150
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        guy.body.velocity.x = 150

        //player.animations.play('right');
    }

    if((cursors.up.isDown) && guy.body.touching.down && hitPlatform) {
      guy.body.velocity.y = -350
    }

}
