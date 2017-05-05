import Client from '../client'
import createPlayer from './player'
import createArrows from './createArrows'
import d from '../game'

export default function createFunc() {
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

  for (let i = 0; i < 20; i++) {
      if (i === 4) i += 4
      let block = d.platforms.create(192 + 32 * i, 608, 'stone')
      block.scale.set(.25, .25)
      block.body.immovable = true
  }
  // to avoid weirdness we would need to make another row of blocks off camera above and below
  // but i don't think it's important for now
  for (let i = 0; i < 20; i++) {
    if (i === 4) i += 4
    let block = d.platforms.create(192 + 32 * i, 0, 'stone')
    block.scale.set(.25, .25)
    block.body.immovable = true
}

  for (let i = 0; i < 19; i++) {
      let block = d.platforms.create(192, 32 * i, 'stone')
      block.scale.set(.25, .25)
      block.body.immovable = true
      block.body.checkCollision.up = false
      block.body.checkCollision.down = false
      if (i === 11) {
        block.body.checkCollision.down = true
        i += 3
      } else if (i === 15) block.body.checkCollision.up = true
  }

  for (let i = 0; i < 19; i++) {
    let block = d.platforms.create(800, 32 * i, 'stone')
    block.scale.set(.25, .25)
    block.body.immovable = true
    block.body.checkCollision.up = false
    block.body.checkCollision.down = false
    if (i === 11) {
      block.body.checkCollision.down = true
      i += 3
    } else if (i === 15) block.body.checkCollision.up = true
  }

    // Creating left brick wall
    d.leftWall = d.game.add.group()

    for (let i = 0; i < 5; i++) {
        var leftBlockStack = d.leftWall.create(64, i * 32 * 4, 'brick')

        leftBlockStack.scale.setTo(4, 4)
    }

  //creating right wall
  d.rightWall = d.game.add.group()

  for (let j = 0; j < 5; j++) {
      var rightBlockStack = d.leftWall.create(832, j * 32 * 4, 'brick')

      rightBlockStack.scale.setTo(4, 4)
  }

  //creating ledge (this is the lowest ledge in the center)
  let ledge = d.platforms.create(450, 300, 'grassBlockLedge');
  ledge.body.immovable = true

    //creating visual walls
    // let wall = d.platforms.create(0, 580, 'ground');
    // wall.rotation = 23.565
    // wall.scale.setTo(3, 3)
    // wall.body.immovable = true
  
    // let wall2 = d.platforms.create(930, 600, 'ground')
    // wall2.rotation = 23.565
    // wall2.scale.setTo(3, 3)
    // wall2.body.immovable = true

  // let ledgeLeft = d.platforms.create(180, 250, 'grassBlockLedge')//this is the ledge on the left brick wall
  // ledgeLeft.body.immovable = true

  let upperLedge = d.platforms.create(450, 100, 'grassBlock')
  upperLedge.body.immovable = true


  // let ledgeRight = d.platforms.create(d.game.world.width - 192 - 84, 100, 'grassBlock')
  // ledgeRight.body.immovable = true


  createPlayer(d, 'fatKid', 'player1', {x: 244, y: 0})

  Client.askNewPlayer();
  
Client.askNewPlayer();
  d.spaceBar = d.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  d.game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)

    // Create arrow group
    createArrows(d)

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