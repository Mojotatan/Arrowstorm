//import Phaser from '../../phaser/phaser'

export default function createFunc({game, guy, platforms}) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //set platform
    platforms = game.add.group()

    //enable physics on platform 
    platforms.enableBody = true
    platforms.physicsBodyType = Phaser.Physics.ARCADE
    //creating the ground 
    let ground = platforms.create(0, game.world.height - 64, 'ground')

    //scaling the ground 
    ground.scale.setTo(2, 2)

    ground.body.immovable = true

    guy = game.add.sprite(0, 400, 'raj')
    guy.scale.set(4, 4)

    //setting physics to guy 
    game.physics.arcade.enable(guy)

    guy.body.gravity.y = 300
    guy.body.bounce.y = 0.3
    guy.body.collideWorldBounds = true

    let roboraj = game.add.sprite(128, 0, 'roboraj1')
    roboraj.scale.set(4, 4)

    let arrow = game.add.sprite(256, 0, 'arrow')
    arrow.scale.set(4, 4)

    let bow = game.add.sprite(384, 0, 'bow')
    bow.scale.set(4, 4)

    game.stage.backgroundColor = "#999999"

    return {
        guy, 
        platforms,
    }



  }
