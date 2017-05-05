import Client from '../client'
import createPlayer from './player'
import fireArrow from '../update/fireArrow'
import d from '../game'

export default function createFunc() {
  // Obj for all players
  d.playerMap = {}

  //add background
  d.background = d.game.add.image(0, 0, 'space')
  d.background.scale.set(.3333, .3333)

  //  We're going to be using physics, so enable the Arcade Physics system
  d.game.physics.startSystem(Phaser.Physics.ARCADE);
  //set platforms
  d.platforms = d.game.add.group()
  //enable physics on platforms
  d.platforms.enableBody = true
  d.platforms.physicsBodyType = Phaser.Physics.ARCADE

  //parse map data
  let map = JSON.parse(d.game.cache.getText('map'))
  createPlayer(d, 'fatKid', 'player1', map.p1Start)


  map.blocks.forEach(block => {
    let newBlock = d.platforms.create(block.x, block.y, block.tile)
    newBlock.scale.set(.25, .25)
    newBlock.body.immovable = true
  })

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

  d.spaceBar = d.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  d.game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  d.spaceBar.onDown.add(() => fireArrow(d))

  // Checks for new player - keep this at the end of this function
  Client.askNewPlayer();
}

export function resetArrow(arrow) {
    arrow.kill()
}

// export function addNewPlayer(d, id, x, y) {
//     d.playerMap[id] = d.game.add.sprite(x, y, 'fatKid')
//     d.playerMap[id].scale.set(2, 2)
//     d.game.physics.arcade.enable(d.playerMap[id])
//     d.playerMap[id].body.gravity.y = 400
// }
