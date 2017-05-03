//import Phaser from '../../phaser/phaser'

export default function createFunc(d) {
    //  We're going to be using physics, so enable the Arcade Physics system
    d.game.physics.startSystem(Phaser.Physics.ARCADE);
    //set platforms
    d.platforms = game.add.group()

    //enable physics on platforms
    d.platforms.enableBody = true
    d.platforms.physicsBodyType = Phaser.Physics.ARCADE
    //creating the ground 
    let ground = d.platforms.create(0, d.game.world.height - 64, 'ground')

    //scaling the ground 
    ground.scale.setTo(2, 2)

    ground.body.immovable = true

    d.guy = d.game.add.sprite(0, 400, 'raj')
    d.guy.scale.set(4, 4)

    //setting physics to guy 
    d.game.physics.arcade.enable(d.guy)

    d.guy.body.gravity.y = 300
    d.guy.body.bounce.y = 0.3
    d.guy.body.collideWorldBounds = true


    d.player = d.game.add.group()
    d.player.enableBody = true
    d.player.physicsBodyType = Phaser.Physics.ARCADE

    d.roboraj = d.player.create(128, 0, 'roboraj')
    d.roboraj.scale.set(4, 4)
    d.roboraj.pivot.set(15, 0)
    // d.game.physics.arcade.enable(roboraj)
    d.roboraj.body.gravity.y = 500
    // d.roboraj.body.bounce.y = 0.3
    d.roboraj.body.collideWorldBounds = true

    d.roboraj.animations.add('walk', [0, 1], 10, true)

    bow = d.player.create(384, 400, 'bow')
    bow.scale.set(4, 4)


    let arrow = d.game.add.sprite(256, 0, 'arrow')
    arrow.scale.set(4, 4)

    d.game.stage.backgroundColor = "#999999"

  }
