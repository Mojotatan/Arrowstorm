import axios from 'axios'
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
      d.game.load.image('space', 'sprites/space-crop.png')
      d.game.load.spritesheet('shieldWall', 'sprites/shieldwall.png')
      d.game.load.image('spikes', 'sprites/spikes.png')
      d.game.load.image('start', 'sprites/start-btn.png')
      d.game.load.image('treasure', 'sprites/treasure-chest.png')
      d.game.load.image('night', 'sprites/night.png')
      d.game.load.image('sunset', 'sprites/sunset.png')
      d.game.load.image('sel', 'sprites/sel.png')
      d.game.load.image('wing', 'sprites/wing.png')
    },
    create: function() {
      axios.get('/maps')
      .then(maps => {
        // console.log(maps)
        d.maps = maps.data.map(map => JSON.parse(map))
        d.game.state.start('menu')
      })
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

      //player options
      let avatar = function(char) {
        return function() {
          Client.chooseChar({char, id: d.myGame.id})
        }
      }
      d.chooseRoboraj = d.game.add.button(0, 256, 'roboraj', avatar('roboraj'))
      d.chooseFatKid = d.game.add.button(32, 256, 'fatKid', avatar('fatKid'))
      d.chooseBlackMage = d.game.add.button(64, 256, 'blackMage', avatar('blackMage'))

      let x = 384
      let y = 192
      d.mapSel = d.game.add.image(x, y, 'sel')
      // d.mapSel.scale.set(2, 2)

      // console.log(JSON.parse(d.maps[0]).name)
      d.maps.forEach(map => {
        d.game.add.text(x, y, map.name, {fontSize: 12, fill: '#FFFFFF', wordWrap: true, boundsAlignH: 'center', boundsAlignV: 'middle'})
        x += 64
        if (x >= 1024) {
          x = 384
          y += 64
        }
      })

      let cursors = d.game.input.keyboard.createCursorKeys()
      cursors.right.onDown.add(() => {
        if (d.mapSel.position.x < 960) d.mapSel.position.x += 64
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.left.onDown.add(() => {
        if (d.mapSel.position.x > 384) d.mapSel.position.x -= 64
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.up.onDown.add(() => {
        if (d.mapSel.position.y > 192) d.mapSel.position.y -= 64
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.down.onDown.add(() => {
        if (d.mapSel.position.y < 576) d.mapSel.position.y += 64
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })

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
    preload: function () {},
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
