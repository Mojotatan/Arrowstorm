export default function createFunc(d) {

    //  We're going to be using physics, so enable the Arcade Physics system
    d.game.physics.startSystem(Phaser.Physics.ARCADE);
    //set platforms
    d.platforms = d.game.add.group()

    //enable physics on platforms
    d.platforms.enableBody = true
    d.platforms.physicsBodyType = Phaser.Physics.ARCADE
    //creating the ground
    let ground = d.platforms.create(0, d.game.world.height - 64, 'ground')
    let ground2 = d.platforms.create(250, d.game.world.height - 64, 'ground')

    //scaling the ground
    ground.scale.setTo(2, 2)
    ground2.scale.setTo(2, 2)

    ground.body.immovable = true
    ground2.body.immovable = true

    d.guy = d.game.add.sprite(0, 400, 'raj')
    d.guy.scale.set(4, 4)

    //setting physics to d.guy
    d.game.physics.arcade.enable(d.guy)

    d.guy.body.gravity.y = 300
    d.guy.body.bounce.y = 0.3
    d.guy.body.collideWorldBounds = true

    let roboraj = d.game.add.sprite(128, 0, 'roboraj1')
    roboraj.scale.set(4, 4)

    // Create arrow group
    d.arrows = d.game.add.group()
    d.arrows.enableBody = true
    d.arrows.physicsBodyType = Phaser.Physics.ARCADE

    d.arrows.createMultiple(1, 'arrow')
    d.arrows.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetArrow);
    d.arrows.callAll('anchor.setTo', 'anchor', 0.5, 1.0)
    d.arrows.setAll('checkWorldBounds', true)

    d.spaceBar = d.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    d.game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)

    let bow = d.game.add.sprite(384, 0, 'bow')
    bow.scale.set(4, 4)

    d.game.stage.backgroundColor = "#999999"

}

export function resetArrow(arrow) {
    arrow.kill()
}
