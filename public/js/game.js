import axios from 'axios'
import updateFunc from './update/update'
import createFunc from './create/create'
import scrubdateFunc from './update/scrubdate'
import preview from './update/preview'
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
      d.game.load.spritesheet('gale', 'sprites/gale.png', 20, 32)
      d.game.load.image('arrow', 'sprites/Arrow.png')
      d.game.load.image('arrowSide', 'sprites/Arrow copy.png')
      d.game.load.image('bow', 'sprites/bow-crop.png')
      d.game.load.image('ground', 'sprites/platform.png')
      d.game.load.image('brick', 'sprites/brick.png')
      d.game.load.image('dirt', 'sprites/dirt.png')
      d.game.load.image('grass', 'sprites/grass.png')
      d.game.load.image('stone', 'sprites/stone.png')
      d.game.load.image('wood', 'sprites/wood.png')
      d.game.load.image('cobble', 'sprites/cobblestone.png')
      d.game.load.image('space', 'sprites/space-crop.png')
      d.game.load.spritesheet('shieldWall', 'sprites/shieldwall.png')
      d.game.load.image('spikes', 'sprites/spikes.png')
      d.game.load.image('start', 'sprites/start-btn.png')
      d.game.load.image('back', 'sprites/back-btn.png')
      d.game.load.image('join', 'sprites/join-btn.png')
      d.game.load.image('go', 'sprites/go-btn.png')
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

      d.game.add.text(256, 0, 'start\nnew\ngame', {fill: '#FFFFFF'})

      d.mapBtn = d.game.add.button(768, 0, 'start', this.startMap, this)
      d.mapBtn.scale.set(4, 4)

      d.game.add.text(688, 0, 'make\nnew\nmap', {fill: '#FFFFFF'})

      d.lobbyGames = d.game.add.group()
      d.game.add.text(16, 208, 'join a game', {fill: '#FFFFFF'})

      d.game.add.text(432, 240, 'How To Play', {fill: '#FFFFFF'})
      d.mapBtn = d.game.add.button(480, 288, 'go', this.startHowTo, this)
      d.mapBtn.scale.set(2, 2)
    },
    startGame: function () {
      Client.socket.emit('newGame', {})
      d.game.state.start('newGameOptions')
    },
    startMap: function() {

      console.log(d.game.state)
      // this.game.state.start('mapEditor')
    },
    startHowTo: function() {
      this.game.state.start('howTo')
    }
  }

  let newGameOptions = {
    create: function() {
      d.startBtn = d.game.add.button(384, 0, 'start', this.startGame, this)
      d.startBtn.scale.set(4, 4)

      let p1 = (d.myGame) ? d.myGame.player1 : 'BLAR'
      let p2 = (d.myGame) ? d.myGame.player2 : 'BLAR'
      d.gameReady = d.game.add.text(648, 64, '', {fill: '#FFFFFF'})
      d.lobbyP1 = d.game.add.text(0, 0, `Player 1: ${p1}`, {fill: '#FFFFFF'})
      d.lobbyP2 = d.game.add.text(0, 32, `Player 2: ${p2}`, {fill: '#FFFFFF'})

      d.leaveBtn = d.game.add.button(896, 0, 'back', this.leaveGame, this)
      d.leaveBtn.scale.set(2, 2)

      d.game.add.text(384, 144, 'Map Select: (change maps with arrow keys)', {fill: '#FFFFFF'})

      d.previewChar1 = d.game.add.image(16, 80, 'blackMage')
      d.previewChar1.scale.set(4, 4)
      d.previewChar2 = d.game.add.image(144, 80, 'fatKid')
      d.previewChar2.scale.set(4, 4)

      //player options
      let avatar = function(char) {
        return function() {
          Client.chooseChar({char, id: d.myGame.id})
        }
      }

      d.chooseRoboraj = d.game.add.button(16, 256, 'roboraj', avatar('roboraj'))
      d.chooseRoboraj.scale.set(1.5, 1.5)
      d.chooseFatKid = d.game.add.button(64, 256, 'fatKid', avatar('fatKid'))
      d.chooseFatKid.scale.set(1.5, 1.5)
      d.chooseBlackMage = d.game.add.button(112, 256, 'blackMage', avatar('blackMage'))
      d.chooseBlackMage.scale.set(1.5, 1.5)
      d.chooseGale = d.game.add.button(160, 256, 'gale', avatar('gale'))
      d.chooseGale.scale.set(1.5, 1.5)

      let x = 384
      let y = 192
      d.mapSel = d.game.add.image(x, y, 'sel')
      d.mapSel.scale.set(1.5, 1.5)

      // console.log(JSON.parse(d.maps[0]).name)
      d.maps.forEach(map => {
        d.game.add.text(x, y, map.name, {fontSize: 12, fill: '#FFFFFF', wordWrap: true, boundsAlignH: 'center', boundsAlignV: 'middle'})
        x += 64
        if (x >= 1024) {
          x = 384
          y += 64
        }
      })

      function getPreview() {
        d.preview.callAll('kill')
        let x = (d.mapSel.x - 384) / 64
        let y = (d.mapSel.y - 192) / 64
        let select = y * 10 + x
        if (select < d.maps.length) preview(d.maps[select])
      }

      d.preview = d.game.add.group()
      getPreview()

      let cursors = d.game.input.keyboard.createCursorKeys()
      cursors.right.onDown.add(() => {
        if (d.mapSel.position.x < 960) d.mapSel.position.x += 64
        getPreview()
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.left.onDown.add(() => {
        if (d.mapSel.position.x > 384) d.mapSel.position.x -= 64
        getPreview()
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.up.onDown.add(() => {
        if (d.mapSel.position.y > 192) d.mapSel.position.y -= 64
        getPreview()
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })
      cursors.down.onDown.add(() => {
        if (d.mapSel.position.y < 576) d.mapSel.position.y += 64
        getPreview()
        Client.mapSel({id: d.myGame.id, map: d.mapSel.position})
      })

      Client.askNewPlayer()
    },
    update: function() {

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
    create: function () {createFunc()},
    update: function () {updateFunc()}
  }

  let howTo = {
    create: function() {
      d.leaveBtn = d.game.add.button(896, 0, 'back', this.leaveGame, this)
      d.leaveBtn.scale.set(2, 2)

      d.game.add.text(16, 0, 'Your goal is to pierce the heart of your enemies with arrows', {fill: '#FFFFFF'})
      d.game.add.text(16, 64, 'CONTROLS', {fill: '#FFFFFF'})
      d.game.add.text(16, 96, 'Move left and right with the arrow keys', {fill: '#FFFFFF'})
      d.game.add.text(16, 128, 'Jump with the up key', {fill: '#FFFFFF'})
      d.game.add.text(16, 160, 'You can also slide down and jump off of walls', {fill: '#FFFFFF'})
      d.game.add.text(16, 192, 'Aim your bow with W A S D', {fill: '#FFFFFF'})
      d.game.add.text(16, 224, 'Fire arrows with space bar', {fill: '#FFFFFF'})
      d.game.add.text(16, 288, 'PRO TIPS', {fill: '#FFFFFF'})
      d.game.add.text(16, 320, 'Your arrow supply is limited', {fill: '#FFFFFF'})
      d.game.add.text(16, 352, 'Find awesome power ups in treasure chests', {fill: '#FFFFFF'})
    },
    leaveGame: function() {
      d.game.state.start('menu')
    }
  }

  let mapEditor = {
    create: function() {
      console.log('nah man')
    },
    update: function() {}
  }

  let gameOver = {
    create: function() {
      d.countdown = 180
      d.countdownText = d.game.add.text(448, 480, '', {fill: '#FFFFFF', fontSize: 36})
      d.tex = d.game.add.text(192, 128, '', {fill: '#FFFFFF'})
      let score = d.game.add.text(192, 256, `${d.myGame.score[1]} - ${d.myGame.score[2]}`, {fill: '#FFFFFF', fontSize: 36})
    },
    update: function() {
      if (d.myGame.score[1] < 5 && d.myGame.score[2] < 5) {
        d.countdown--
        d.countdownText.text = `${d.countdown}`
        if (d.countdown < 0) {
          Client.letsGo(d.myGame.id) // this will probably cause some issues
        }
      } else {
        d.tex.text = (d.myGame.score[1] > d.myGame.score[2]) ? 'Player One wins' : 'Player Two wins'
        d.game.add.button(192, 384, 'back', function() {d.game.state.start('menu')})
      }
    }
  }

  let killCam = {
    create: function() {
      d.game.lockRender = false
      d.history = d.history.slice(-120)
      createFunc()
      d.slowmo = d.game.add.text(384, 128, 'FATALITY', {fontSize: 48, fill: '#FFFFFF'})
      // d.treasure.kill()
    },
    update: function() {scrubdateFunc()}
  }

  d.game.state.add('loadAssets', loadAssets)
  d.game.state.add('menu', menu)
  d.game.state.add('newGameOptions', newGameOptions)
  d.game.state.add('runGame', runGame)
  d.game.state.add('mapEditor', mapEditor)
  d.game.state.add('howTo', howTo)
  d.game.state.add('killCam', killCam)
  d.game.state.add('gameOver', gameOver)
  d.game.state.start('loadAssets')

  return {}
}()
