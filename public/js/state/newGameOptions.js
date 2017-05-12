import d from '../game'
import preview from '../update/preview'
import {letsGo, mapSel, chooseChar, leaveGame} from '../client'


let newGameOptions = {
  create: function() {
    d.startBtn = d.game.add.button(384, 0, 'start', this.startGame, this)
    d.startBtn.scale.set(4, 4)

    let p1, p2, id
    if (d.myGame) {
      p1 = d.myGame.player1 ? 'JOINED' : ''
      p2 = d.myGame.player2 ? 'JOINED' : ''
      id = d.myGame.id
    } else {
      p1 = 'ERROR'
      p2 = 'ERROR'
      id = 'UNKNOWN'
    }
    d.lobbyId = d.game.add.text(648, 0, `Game ID: ${id}`, {fill: '#FFFFFF'})
    d.lobbyP1 = d.game.add.text(648, 32, `Player 1: ${p1}`, {fill: '#0000FF'})
    d.lobbyP2 = d.game.add.text(648, 64, `Player 2: ${p2}`, {fill: '#FF0000'})
    d.gameReady = d.game.add.text(648, 96, '', {fill: '#FFFFFF'})

    d.leaveBtn = d.game.add.button(896, 0, 'back', function(){
      leaveGame()
      d.game.state.start('menu')
    })
    d.leaveBtn.scale.set(2, 2)

    d.message = d.game.add.text(384, 128 + 16, 'You are: ', {fill: '#FFFFFF'})
    d.youAre = d.game.add.text(384 + 112, 128 + 16, '', {fill: '#FFFFFF'})
    if (d.currentPlayer) {
      d.youAre.text = d.currentPlayer === 'player1' ? 'PLAYER 1' : 'PLAYER 2'
      d.youAre.fill = d.currentPlayer === 'player1' ? '#0000FF' : '#FF0000'
    }

    // character select
    d.game.add.text(16, 0, 'Choose your character', {fill: '#FFFFFF'})


    // defaults to p1 as blackmage and p2 as fatkid
    let previewShade1 = d.game.add.graphics(58, 46)
    previewShade1.lineStyle(4, 0x0000ff)
    previewShade1.drawRect(0, 0, 84, 132)
    d.previewChar1 = d.game.add.image(60, 48, 'blackMage')
    d.previewChar1.scale.set(4, 4)

    let previewShade2 = d.game.add.graphics(222, 46)
    previewShade2.lineStyle(4, 0xff0000)
    previewShade2.drawRect(0, 0, 84, 132)
    d.previewChar2 = d.game.add.image(224, 48, 'fatKid')
    d.previewChar2.frame = 2
    d.previewChar2.scale.set(4, 4)

    let avatar = function(char) {
      return function() {
        chooseChar({char, id: d.myGame.id})
      }
    }

    let rosterShade = d.game.add.graphics(16, 192)
    rosterShade.beginFill(0x9999ff)
    rosterShade.drawRect(0, 0, 352, 80)
    rosterShade.endFill()

    d.chooseRoboraj = d.game.add.button(88 - 15 + 16 - 44, 208, 'roboraj', avatar('roboraj'))
    d.chooseRoboraj.frame = 2
    d.chooseRoboraj.scale.set(1.5, 1.5)
    d.chooseFatKid = d.game.add.button(88 * 2 - 15 + 16 - 44, 208, 'fatKid', avatar('fatKid'))
    d.chooseFatKid.frame = 2
    d.chooseFatKid.scale.set(1.5, 1.5)
    d.chooseBlackMage = d.game.add.button(88 * 3 - 15 + 16 - 44, 208, 'blackMage', avatar('blackMage'))
    d.chooseBlackMage.scale.set(1.5, 1.5)
    d.chooseGale = d.game.add.button(88 * 4 - 15 + 16 - 44, 208, 'gale', avatar('gale'))
    d.chooseGale.frame = 2
    d.chooseGale.scale.set(1.5, 1.5)

    // map select
    let mapShade = d.game.add.graphics(368, 192)
    mapShade.beginFill(0x999966)
    mapShade.drawRect(0, 0, 640, 432)
    mapShade.endFill()

    d.game.add.text(384, 208, 'Map Select (change maps with arrow keys)', {fill: '#FFFFFF'})

    let x = 384
    let y = 256
    d.mapSel = d.game.add.image(x, y, 'sel')
    d.mapSel.scale.set(1.5, 1.5)

    d.maps.forEach(map => {
      d.game.add.text(x, y, map.name, {fontSize: 12, fill: '#FFFFFF', wordWrap: true, boundsAlignH: 'center', boundsAlignV: 'middle'})
      x += 64
      if (x >= 1024) {
        x = 384
        y += 64
      }
    })

    let previewShade = d.game.add.graphics(16, 272)
    previewShade.beginFill(0x999966)
    previewShade.drawRect(0, 0, 352, 352)
    previewShade.endFill()

    function getPreview() {
      d.preview.callAll('kill')
      let x = (d.mapSel.x - 384) / 64
      let y = (d.mapSel.y - 256) / 64
      let select = y * 10 + x
      if (select < d.maps.length) preview(d.maps[select])
    }

    d.preview = d.game.add.group()
    getPreview()

    let cursors = d.game.input.keyboard.createCursorKeys()
    cursors.right.onDown.add(() => {
      if (d.mapSel.position.x < 960) d.mapSel.position.x += 64
      getPreview()
      mapSel({id: d.myGame.id, map: d.mapSel.position})
    })
    cursors.left.onDown.add(() => {
      if (d.mapSel.position.x > 384) d.mapSel.position.x -= 64
      getPreview()
      mapSel({id: d.myGame.id, map: d.mapSel.position})
    })
    cursors.up.onDown.add(() => {
      if (d.mapSel.position.y > 256) d.mapSel.position.y -= 64
      getPreview()
      mapSel({id: d.myGame.id, map: d.mapSel.position})
    })
    cursors.down.onDown.add(() => {
      if (d.mapSel.position.y < 576) d.mapSel.position.y += 64
      getPreview()
      mapSel({id: d.myGame.id, map: d.mapSel.position})
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