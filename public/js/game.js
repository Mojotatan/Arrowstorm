import updateFunc from './update/update'
import createFunc from './create/create'
//import Phaser from '../phaser/phaser'
import Client from './client'

let d = {}
export default d

const gameFunc = function() {


  // game play area is a box so walls of 192 width on each side
  d.game = new Phaser.Game(1024, 640, Phaser.AUTO, '', null, false, false);

  let loadAssets = {
    preload: function() {
      d.game.load.image('raj', 'sprites/raj.png')
      d.game.load.spritesheet('roboraj', 'sprites/roboraj.png', 20, 32)
      d.game.load.spritesheet('fatKid', 'sprites/fat-kid.png', 20, 32)
      d.game.load.spritesheet('blackMage', 'sprites/black-mage.png', 20, 32)
      d.game.load.image('arrow', 'sprites/Arrow.png')
      d.game.load.image('arrowSide', 'sprites/Arrow copy.png')
      d.game.load.image('bow', 'sprites/bow-crop.png')
      d.game.load.image('ground', 'sprites/platform.png')
      d.game.load.image('brick', 'sprites/brick.png')
      d.game.load.image('grassBlock', 'sprites/grass_2x1.png')
      d.game.load.image('grassBlockLedge', 'sprites/grass_4x1.png')
      d.game.load.image('dirt', 'sprites/dirt.png')
      d.game.load.image('grass', 'sprites/grass.png')
      d.game.load.image('stone', 'sprites/stone.png')
      d.game.load.image('wood', 'sprites/wood.png')
      d.game.load.image('cobble', 'sprites/cobblestone.png')
      // d.game.load.image('space', 'sprites/space-crop.png')
      d.game.load.spritesheet('shieldWall', 'sprites/shieldwall.png')
      d.game.load.image('spikes', 'sprites/spikes.png')
      d.game.load.image('start', 'sprites/start-btn.png')
      d.game.load.image('treasure', 'sprites/treasure-chest.png')
    },
    create: function() {
      d.game.state.start('menu')
    }
  }

  let menu = {
    preload: function () {},
    create: function () {
      d.startBtn = d.game.add.button(0, 0, 'start', this.startGame, this)
      d.startBtn.scale.set(4, 4)
      
      d.mapBtn = d.game.add.button(768, 0, 'start', this.startMap, this)
      d.mapBtn.scale.set(4, 4)

      d.lobbyGames = d.game.add.group()
    },
    startGame: function () {
      Client.socket.emit('newGame', {})
      d.game.state.start('newGameOptions')
    },
    startMap: function() {
      console.log('nah man')
      console.log(d.game.state)
      // this.game.state.start('mapEditor')
    }
  }

  let newGameOptions = {
    create: function() {
      d.startBtn = d.game.add.button(384, 0, 'start', this.startGame, this)
      d.startBtn.scale.set(4, 4)

      let p1 = (d.myGame) ? d.myGame.player1 : 'BLAR'
      let p2 = (d.myGame) ? d.myGame.player2 : 'BLAR'
      d.gameReady = d.game.add.text(384, 128, '', {fill: '#FFFFFF'})
      d.lobbyP1 = d.game.add.text(0, 0, `Player 1: ${p1}`, {fill: '#FFFFFF'})
      d.lobbyP2 = d.game.add.text(0, 32, `Player 2: ${p2}`, {fill: '#FFFFFF'})

      d.leaveBtn = d.game.add.button(896, 0, 'start', this.leaveGame, this)
      d.leaveBtn.scale.set(2, 2)
      Client.askNewPlayer()
    },
    startGame: function () {
      // d.game.state.start('runGame')
      // if (d.gameReady.text === 'ready!') {
        Client.letsGo(d.myGame.id)
      // }
    },
    leaveGame: function() {
      d.game.state.start('menu')
    }
  }

  let runGame = {
    preload: function () {
      d.game.load.text('map', 'maps/default.json')
      // d.map = JSON.parse(d.game.cache.getText('map'))
      // d.game.load.image('background', d.map.background.file)
      d.game.load.image('night', 'sprites/night.png')
    },
    create: function () {createFunc(d)},
    update: function () {updateFunc(d)}
  }

  let mapEditor = {
    create: function() {
      console.log('nah man')
    },
    update: function() {}
  }

  // function gameOver() {
  //   //TO DO
  // }
  // gameOver.prototype = {
  //   update: function() {}
  // }

  d.game.state.add('loadAssets', loadAssets)
  d.game.state.add('menu', menu)
  d.game.state.add('newGameOptions', newGameOptions)
  d.game.state.add('runGame', runGame)
  d.game.state.add('mapEditor', mapEditor) // TODO
  // d.game.state.add('gameOver', gameOver)
  d.game.state.start('loadAssets')

  return {}
}()
