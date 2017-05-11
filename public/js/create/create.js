import Client from '../client'
import createPlayer from './player'
import fireArrow from '../update/fireArrow'
import d from '../game'
import createTreasureChest from './createTreasureChest'
import {removeArrowDisplay} from '../update/arrowDisplay'

export default function createFunc() {
  // important for the kill cam
  d.go = true

  // Obj for all players
  d.playerMap = {}
  let currPlayer

  //checking for current player
  if (d.currentPlayer) {
        currPlayer = d.currentPlayer
    }

  d.game.input.recordPointerHistory = true

  //parse map data
  // let map = JSON.parse(d.game.cache.getText('map'))
  let map = d.map

  //add background
  d.background = d.game.add.image(192, 0, map.background.file)
  d.background.scale.set(map.background.scale, map.background.scale)

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

  // add blocks
  map.blocks.forEach(block => {
    let newBlock = d.platforms.create(block.x, block.y, block.tile)
    newBlock.body.immovable = true
  })

  // add shields to map (NOT IMPLEMENTED)
  map.shields.forEach(shield => {
    let newShield = d.shields.create(shield.x, shield.y, 'shieldWall')
    newShield.body.immovable = true
    newShield.rotation = shield.rotation
  })

  // add spikes to map
  map.spikes.forEach(spike => {
    let newSpike = d.spikes.create(spike.x, spike.y, 'spikes')
    newSpike.body.immovable = true
    newSpike.anchor.set(.5, .5)
    newSpike.rotation = spike.rotation
  })

  // create players
  createPlayer(d, d.myGame.chars[1], 'player1', map.p1Start)
  createPlayer(d, d.myGame.chars[2], 'player2', map.p2Start)

  //   // Creating left brick wall
  //   d.leftWall = d.game.add.group()
  //   for (let i = 0; i < 5; i++) {
  //     var leftBlockStack = d.leftWall.create(64, i * 32 * 4, 'brick')
  //     leftBlockStack.scale.setTo(4, 4)
  //   }

  // //creating right wall
  // d.rightWall = d.game.add.group()
  // for (let j = 0; j < 5; j++) {
  //   var rightBlockStack = d.leftWall.create(832, j * 32 * 4, 'brick')
  //   rightBlockStack.scale.setTo(4, 4)
  // }

  d.game.add.text(16, 0, 'Player One', {fill: '#FFFFFF'})
  let avatar1 = d.game.add.image(6, 176, d.myGame.chars[1])
  avatar1.crop(new Phaser.Rectangle(0, 0, 20, 16))
  avatar1.scale.set(9, 9)
  d.game.add.text(96, 96, d.myGame.score[1], {fontSize: 48, fill: '#FFFFFF'})

  d.game.add.text(848, 0, 'Player Two', {fill: '#FFFFFF'})
  let avatar2 = d.game.add.image(838, 176, d.myGame.chars[2])
  avatar2.crop(new Phaser.Rectangle(0, 0, 20, 16))
  avatar2.scale.set(9, 9)
  d.game.add.text(928, 96, d.myGame.score[2], {fontSize: 48, fill: '#FFFFFF'})

  d[currPlayer].shotDirection = {left: false, right: false, up: false, down: false}
  // arrow and shooting
  d.spaceBar = d.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  d.game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  d.spaceBar.onDown.add(() => {
    fireArrow(d, false, null, d[currPlayer].shotDirection)
    removeArrowDisplay(currPlayer)
  })

  d.arrowsArray = []

  //create treasures
  d.treasuresArray = ['extraArrows', 'wings', 'invisibility']

  d.player1.treasure = {}
  d.player2.treasure = {}

  d.treasure = null
  d.game.time.events.add(4000, function() {createTreasureChest(map.treasureSpawn.x, map.treasureSpawn.y)})
  d.player1.nextArrowType = 'regular'
  d.player2.nextArrowType = 'regular'

}
