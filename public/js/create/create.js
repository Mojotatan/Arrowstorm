import Client from '../client'
//import d from '../game'

export default function createFunc(d) {

    // Obj for all players
    d.playerMap = {}

    //add background 
    d.game.add.image(0, 0, 'background')
    //  We're going to be using physics, so enable the Arcade Physics system
    d.game.physics.startSystem(Phaser.Physics.ARCADE);
    //set platforms
    d.platforms = d.game.add.group()

    //enable physics on platforms
    d.platforms.enableBody = true
    d.platforms.physicsBodyType = Phaser.Physics.ARCADE

    //creating the ground
    let ground = d.platforms.create(0, d.game.world.height - 64, 'ground') //this is the ground
    let ground2 = d.platforms.create(250, d.game.world.height - 64, 'ground') // so is this

    //scaling the ground
    ground.scale.setTo(2, 2)
    ground2.scale.setTo(2, 2)

    ground.body.immovable = true
    ground2.body.immovable = true

    // Creating left brick wall
    d.leftWall = d.game.add.group()
    d.leftWall.enableBody = true

    for (let i = 0; i < 9; i++) {
        var leftBlockStack = d.leftWall.create(99, i * 60.5, 'brick')

        leftBlockStack.scale.setTo(3, 3)

        leftBlockStack.body.immovable = true

        //leftBlockStack.gravity.y = 6
    }

    //creating right brick wall
    d.rightWall = d.game.add.group()
    d.rightWall.enableBody = true

    for (let j = 0; j < 9; j++) {
        var rightBlockStack = d.leftWall.create(837, j * 60.5, 'brick')

        rightBlockStack.scale.setTo(3, 3)
        rightBlockStack.body.immovable = true
    }


    //creating ledge (this is the lowest ledge in the center)
    let ledge = d.platforms.create(450, 425, 'grassBlockLedge');
    ledge.body.immovable = true

    //creating walls 
    let wall = d.platforms.create(0, 580, 'ground');
    wall.rotation = 23.563
    wall.scale.setTo(3, 3)
    wall.body.immovable = true

    let wall2 = d.platforms.create(930, 600, 'ground')
    wall2.rotation = 23.56
    wall2.scale.setTo(3, 3)
    wall2.body.immovable = true

    let ledgeLeft = d.platforms.create(180, 300, 'grassBlockLedge') //this is the ledge on the left brick wall
    ledgeLeft.body.immovable = true

    let upperLedge = d.platforms.create(450, 200, 'grassBlock')
    upperLedge.body.immovable = true


    let ledgeRight = d.platforms.create(d.game.world.width - 192 - 84, 100, 'grassBlock') //this is the ledge on the upper right 
    ledgeRight.body.immovable = true

    d.roboraj = d.game.add.sprite(128, 0, 'roboraj')
    console.log('roboraj in create', d)
    d.roboraj.scale.set(2, 2)
    d.roboraj.pivot.set(15, 0)
    d.game.physics.arcade.enable(d.roboraj)
    d.roboraj.body.gravity.y = 400
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

    d.game.stage.backgroundColor = "#999999"

    Client.askNewPlayer();


  }

export function resetArrow(arrow) {
    arrow.kill()
}

export function addNewPlayer(d, id, x, y) {
    d.playerMap[id] = d.game.add.sprite(x, y, 'roboraj')
    d.playerMap[id].scale.set(2, 2)
    d.game.physics.arcade.enable(d.playerMap[id])
    d.playerMap[id].body.gravity.y = 400
}
