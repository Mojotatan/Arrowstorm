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

  // the shield wall tiles should be impassible to arrows but passible to players
  // CURRENTLY NOT IMPLEMENTED -- WILL DO LATER IF DEEMED IMPORTANT ENOUGH
  d.shields = d.game.add.group()
  d.shields.enableBody = true
  d.shields.physicsBodyType = Phaser.Physics.ARCADE

  // the spike tiles should kill players upon collision
  d.spikes = d.game.add.group()
  d.spikes.enableBody = true
  d.spikes.physicsBodyType = Phaser.Physics.ARCADE

  //parse map data
  let map = JSON.parse(d.game.cache.getText('map'))

  console.log(map)
  map.blocks.forEach(block => {
    let newBlock = d.platforms.create(block.x, block.y, block.tile)
    newBlock.scale.set(.25, .25)
    newBlock.body.immovable = true
  })

  map.shields.forEach(shield => {
    let newShield = d.shields.create(shield.x, shield.y, 'shieldWall')
    newShield.body.immovable = true
    newShield.rotation = shield.rotation
  })

  map.spikes.forEach(spike => {
    let newSpike = d.spikes.create(spike.x, spike.y, 'spikes')
    newSpike.body.immovable = true
    newSpike.anchor.set(.5, .5)
    newSpike.rotation = spike.rotation
  })

  // create players
  createPlayer(d, 'blackMage', 'player1', map.p1Start)
  createPlayer(d, 'fatKid', 'player2', map.p2Start)

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

  // arrow and shooting
  d.spaceBar = d.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  d.game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  d.spaceBar.onDown.add(() => fireArrow(d, false))

  d.arrowsArray = []

  //create treasures array
  d.treasuresArray = []

  // Checks for new player - keep this at the end of this function
  Client.askNewPlayer();
}
