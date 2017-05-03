//import Phaser from '../../phaser/phaser'

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

    //setting physics to guy 
    d.game.physics.arcade.enable(d.guy)

    d.guy.body.gravity.y = 300
    d.guy.body.bounce.y = 0.3
    d.guy.body.collideWorldBounds = true


    // d.player = d.game.add.group()
    // d.game.physics.arcade.enable(d.player)
    // d.player.enableBody = true
    // d.player.physicsBodyType = Phaser.Physics.ARCADE

    d.roboraj = d.game.add.sprite(128, 0, 'roboraj')
    d.roboraj.scale.set(4, 4)
    d.roboraj.pivot.set(15, 0)
    d.game.physics.arcade.enable(d.roboraj)
    d.roboraj.body.gravity.y = 500
    // d.roboraj.body.bounce.y = 0.3
    d.roboraj.body.collideWorldBounds = true

    d.roboraj.animations.add('walk', [0, 1], 10, true)

    d.bow = d.game.add.sprite(0, 0, 'bow')
    d.bow.anchor.set(1, .5)
    // d.bow.position.set
    d.roboraj.addChild(d.bow)
    // d.bow.pivot.set(16, 16)
    // d.bow.rotation = .785 + .785
    // character sprites should be 20 by 32

    let arrow = d.game.add.sprite(256, 0, 'arrow')
    arrow.scale.set(4, 4)

    d.game.stage.backgroundColor = "#999999"

  }
