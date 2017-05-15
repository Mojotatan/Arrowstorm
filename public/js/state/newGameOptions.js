import d from '../game'
import {preview, renderMaps, getPreview} from '../update/preview'
import {letsGo, mapSel, chooseChar, leaveGame} from '../client'


let newGameOptions = {
  create: function() {
    d.startBtn = d.game.add.button(384, 0, 'start', this.startGame, this)
    d.startBtn.scale.set(4, 4)

    let p1, p2, id
    if (d.myGame) {
      if (d.myGame.player1) p1 = d.myGame.alias[1] || 'JOINED'
      else p1 = ''
      if (d.myGame.player2) p2 = d.myGame.alias[2] || 'JOINED'
      else p2 = ''
      id = d.myGame.id
    } else {
      p1 = 'ERROR'
      p2 = 'ERROR'
      id = 'UNKNOWN'
    }
    d.lobbyId = d.game.add.text(648, 0, `Game ID: ${id}`, {font: '20pt Arial', fill: '#FFFFFF'})
    d.lobbyP1 = d.game.add.text(648, 32, `Player 1: ${p1}`, {font: '20pt Arial', fill: '#0000FF'})
    d.lobbyP2 = d.game.add.text(648, 64, `Player 2: ${p2}`, {font: '20pt Arial', fill: '#FF0000'})
    d.gameReady = d.game.add.text(896, 64, '', {font: '20pt Arial', fill: '#FFFFFF'})

    d.leaveBtn = d.game.add.button(896, 0, 'back', function(){
      leaveGame()
      d.game.state.start('menu')
    })
    d.leaveBtn.scale.set(2, 2)

    d.message = d.game.add.text(648, 96, 'You are: ', {font: '20pt Arial', fill: '#FFFFFF'})
    d.youAre = d.game.add.text(648 + 112, 96, '', {font: '20pt Arial', fill: '#FFFFFF'})
    if (d.currentPlayer) {
      d.youAre.text = d.currentPlayer === 'player1' ? 'PLAYER 1' : 'PLAYER 2'
      d.youAre.fill = d.currentPlayer === 'player1' ? '#0000FF' : '#FF0000'
    }


    // character select
    let charShade = d.game.add.graphics(352, 160)
    charShade.beginFill(0xcccccc)
    charShade.drawRect(0, 0, 688, 480)
    charShade.endFill()

    let instrShade = d.game.add.graphics(352, 160)
    instrShade.beginFill(0x9999ff)
    instrShade.drawRect(0, 0, 688, 64)
    instrShade.endFill()
    d.game.add.text(512, 176, 'Choose your character', {font: 'bold 20pt Arial'})

    // defaults to p1 as roboraj and p2 as fatkid
    let pp1
    if (d.myGame) pp1 = d.myGame.alias[1] || 'Player 1'
    else pp1 = 'Player 1'
    d.preview1 = d.game.add.text(528, 240, pp1, {font: '20pt Arial', fill: '#0000FF'})
    d.previewChar1 = d.game.add.image(528, 296, 'RoboRaj')
    d.previewChar1.scale.set(6, 6)
    d.preview1Char = d.game.add.text(528, 512, 'RoboRaj')

    let pp2
    if (d.myGame) pp2 = d.myGame.alias[2] || 'Player 2'
    else pp2 = 'Player 2'
    d.preview2 = d.game.add.text(720, 240, pp2, {font: '20pt Arial', fill: '#FF0000'})
    d.previewChar2 = d.game.add.image(720, 296, 'Billy')
    d.previewChar2.frame = 2
    d.previewChar2.scale.set(6, 6)
    d.preview2Char = d.game.add.text(720, 512, 'Billy')

    let avatar = function(char) {
      return function() {
        chooseChar({char, id: d.myGame.id})
      }
    }

    let rosterShade = d.game.add.graphics(352, 560)
    rosterShade.beginFill(0x9999ff)
    rosterShade.drawRect(0, 0, 688, 80)
    rosterShade.endFill()

    d.chooseRoboraj = d.game.add.button(88 - 15 + 512 - 44, 576, 'RoboRaj', avatar('RoboRaj'))
    d.chooseRoboraj.frame = 2
    d.chooseRoboraj.scale.set(1.5, 1.5)
    d.chooseFatKid = d.game.add.button(88 * 2 - 15 + 512 - 44, 576, 'Billy', avatar('Billy'))
    d.chooseFatKid.frame = 2
    d.chooseFatKid.scale.set(1.5, 1.5)
    d.chooseBlackMage = d.game.add.button(88 * 3 - 15 + 512 - 44, 576, 'Black Mage', avatar('Black Mage'))
    d.chooseBlackMage.scale.set(1.5, 1.5)
    d.chooseGale = d.game.add.button(88 * 4 - 15 + 512 - 44, 576, 'Gale', avatar('Gale'))
    d.chooseGale.frame = 2
    d.chooseGale.scale.set(1.5, 1.5)

    // map select
    let mapShade = d.game.add.graphics(0, 0)
    mapShade.beginFill(0xccddff)
    mapShade.drawRect(0, 0, 352, 640)
    mapShade.endFill()

    let mapSelShade = d.game.add.graphics(0, 320 + 32)
    mapSelShade.beginFill(0x373737)
    mapSelShade.drawRect(0, 0, 352, 320 - 32)
    mapSelShade.endFill()

    d.game.add.text(16, 320 + 32 + 16, 'Map Select', {font: '20pt Arial', fill: '#FFFFFF'})

    d.mapSel = d.game.add.graphics(16, 412)
    d.mapSel.beginFill(0x0099ff)
    d.mapSel.drawRect(0, 0, 320, 32)
    d.mapSel.endFill()

    d.pages = {}
    for (let i = 0; i < Math.ceil(d.maps.length / 7); i++) {
      d.pages[i] = d.maps.slice(i * 7, i * 7 + 7)
    }
    d.currentPage = 0
    d.currentMaps = []
    renderMaps(d.currentPage)

    d.preview = d.game.add.group()
    getPreview(d.currentPage)

    let cursors = d.game.input.keyboard.createCursorKeys()
    cursors.up.onDown.add(() => {
      if (d.mapSel.position.y > 412) {
        d.mapSel.position.y -= 32
        getPreview(d.currentPage)
        mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
      } else if (d.pages[d.currentPage - 1]) {
        d.currentPage--
        d.mapSel.position.y = 604
        mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
      }
    })
    cursors.down.onDown.add(() => {
      if (d.mapSel.position.y < 604) {
        d.mapSel.position.y += 32
        getPreview(d.currentPage)
        mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
      } else if (d.pages[d.currentPage + 1]) {
        d.currentPage++
        d.mapSel.position.y = 412
        mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
      }
    })
  },
  update: function() {

  },
  startGame: function () {
    // d.game.state.start('runGame')
    // if (d.gameReady.text === 'ready!') {
      letsGo(d.myGame.id)
    // }
  }
}

export default newGameOptions