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



    // Creating left brick wall
    d.leftWall = d.game.add.group()
    d.leftWall.enableBody = true 

    for (let i = 0; i < 9; i++) {
        var leftBlockStack = d.leftWall.create(0, i * 60.5, 'brick')

        leftBlockStack.scale.setTo(3, 3)

        leftBlockStack.body.immovable = true 

        //leftBlockStack.gravity.y = 6
    }

    //creating right wall
    d.rightWall = d.game.add.group()
    d.rightWall.enableBody = true

    for (let j = 0; j < 9; j++) {
        var rightBlockStack = d.leftWall.create(930, j * 60.5, 'brick')

        rightBlockStack.scale.setTo(3, 3)
        rightBlockStack.body.immovable = true
    }


    //creating ledge 
    let ledge = d.platforms.create(350, 385, 'ground');
    ledge.body.immovable = true

    //creating walls 
    // let wall = d.platforms.create(0, 580, 'ground');
    // wall.rotation = 23.565
    // wall.scale.setTo(3, 3)
    // wall.body.immovable = true

    let wall2 = d.platforms.create(930, 600, 'ground')
    wall2.rotation = 23.565
    wall2.scale.setTo(3, 3)
    wall2.body.immovable = true

    let ledgeLeft = d.platforms.create(-90, 200, 'ground')
    ledgeLeft.body.immovable = true



    d.guy = d.game.add.sprite(0, 400, 'raj')
    d.guy.scale.set(2, 2)

    //setting physics to d.guy 
    d.game.physics.arcade.enable(d.guy)

    d.guy.body.gravity.y = 300
    d.guy.body.bounce.y = 0.3
    d.guy.body.collideWorldBounds = true

    // let roboraj = d.game.add.sprite(128, 0, 'roboraj1')
    // roboraj.scale.set(4, 4)

    // let arrow = d.game.add.sprite(256, 0, 'arrow')
    // arrow.scale.set(4, 4)

    // let bow = d.game.add.sprite(384, 0, 'bow')
    // bow.scale.set(4, 4)

    d.game.stage.backgroundColor = "#999999"


  }
