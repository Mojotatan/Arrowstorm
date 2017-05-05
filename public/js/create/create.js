import createPlayer from './player'

export default function createFunc(d) {

  //add background 
  d.game.add.image(0, 0, 'background')
  //  We're going to be using physics, so enable the Arcade Physics system
  d.game.physics.startSystem(Phaser.Physics.ARCADE);
//   d.game.physics.arcade.bounds = new Phaser.Rectangle(192, 0, 640, 640)
//   d.game.physics.arcade.OVERLAP_BIAS = 1
  //set platforms
  d.platforms = d.game.add.group()
  
  //enable physics on platforms
  d.platforms.enableBody = true
  d.platforms.physicsBodyType = Phaser.Physics.ARCADE

//   //creating the ground
//   let ground = d.platforms.create(-800, d.game.world.height - 64, 'ground')
//   let ground2 = d.platforms.create(400, d.game.world.height - 64, 'ground')

//   //scaling the ground
//   ground.scale.setTo(2, 2)
//   ground2.scale.setTo(2, 2)

//   ground.body.immovable = true
//   ground2.body.immovable = true


//   for (let i = 0; i < 20; i++) {
//       let block = d.platforms.create(192 + 32 * i, 608, 'grass')

//       block.scale.set(.25, .25)

//       block.body.immovable
//   }

  // Creating left brick wall
  d.leftWall = d.game.add.group()
  d.leftWall.enableBody = true

  for (let i = 0; i < 5; i++) {
      var leftBlockStack = d.leftWall.create(64, i * 32 * 4, 'brick')

      leftBlockStack.scale.setTo(4, 4)

      leftBlockStack.body.immovable = true

      leftBlockStack.body.checkCollision.up = false
      leftBlockStack.body.checkCollision.down = false
  }

  //creating right wall
  d.rightWall = d.game.add.group()
  d.rightWall.enableBody = true

  for (let j = 0; j < 5; j++) {
      var rightBlockStack = d.leftWall.create(832, j * 32 * 4, 'brick')

      rightBlockStack.scale.setTo(4, 4)
      rightBlockStack.body.immovable = true
      rightBlockStack.body.checkCollision.up = false
      rightBlockStack.body.checkCollision.down = false
  }


  //creating ledge 
  let ledge = d.platforms.create(450, 300, 'grassBlockLedge');
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

  let ledgeLeft = d.platforms.create(180, 250, 'grassBlockLedge')
  ledgeLeft.body.immovable = true

  let upperLedge = d.platforms.create(450, 100, 'grassBlock')
  upperLedge.body.immovable = true


  let ledgeRight = d.platforms.create(d.game.world.width - 192 - 84, 100, 'grassBlock')
  ledgeRight.body.immovable = true

  let blocktest = d.platforms.create(768, 512, 'dirt')
  blocktest.scale.set(.5, .5)
  blocktest.body.immovable = true
  blocktest.body.checkCollision.down = false
  blocktest.body.checkCollision.up = false

  let blocktest2 = d.platforms.create(768, 448, 'dirt')
  blocktest2.scale.set(.5, .5)
  blocktest2.body.immovable = true
  blocktest2.body.checkCollision.down = false


  createPlayer(d, 'fatKid', 'player1', {x: 128, y: 0})


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

//   d.game.stage.backgroundColor = "#999999"


}

export function resetArrow(arrow) {
    arrow.kill()
}
