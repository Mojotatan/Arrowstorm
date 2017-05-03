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
        var leftBlockStack = d.leftWall.create(99, i * 60.5, 'brick')

        leftBlockStack.scale.setTo(3, 3)

        leftBlockStack.body.immovable = true 

        //leftBlockStack.gravity.y = 6
    }

    //creating right wall
    d.rightWall = d.game.add.group()
    d.rightWall.enableBody = true

    for (let j = 0; j < 9; j++) {
        var rightBlockStack = d.leftWall.create(837, j * 60.5, 'brick')

        rightBlockStack.scale.setTo(3, 3)
        rightBlockStack.body.immovable = true
    }


    //creating ledge 
    let ledge = d.platforms.create(320, 425, 'ground');
    ledge.body.immovable = true

    //creating walls 
    let wall = d.platforms.create(0, 580, 'ground');
    wall.rotation = 23.565
    wall.scale.setTo(3, 3)
    wall.body.immovable = true

    let wall2 = d.platforms.create(930, 600, 'ground')
    wall2.rotation = 23.565
    wall2.scale.setTo(3, 3)
    wall2.body.immovable = true

    let ledgeLeft = d.platforms.create(-90, 300, 'ground')
    ledgeLeft.body.immovable = true

    let upperLedge = d.platforms.create(450, 200, 'grassBlock')
    upperLedge.body.immovable = true

    let ledgeRight = d.platforms.create(d.game.world.width - 192 - 84, 100, 'grassBlock')
    ledgeRight.body.immovable = true

    d.roboraj = d.game.add.sprite(128, 0, 'roboraj')
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


  }

export function resetArrow(arrow) {
    arrow.kill()
}
