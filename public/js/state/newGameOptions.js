import d from '../game'
import {preview, renderMaps, getPreview} from '../update/preview'
import {letsGo, mapSel, chooseChar, leaveGame} from '../client'


let newGameOptions = {
  create: function() {

    // character select
    let instrShade = d.game.add.graphics(352, 0)
    instrShade.beginFill(0x9999ff)
    instrShade.drawRect(0, 0, 688, 96)
    instrShade.endFill()

    let charShade = d.game.add.graphics(352, 96)
    charShade.beginFill(0xcccccc)
    charShade.drawRect(0, 0, 688, 416)
    charShade.endFill()

    let rosterShade = d.game.add.graphics(352, 512)
    rosterShade.beginFill(0x9999ff)
    rosterShade.drawRect(0, 0, 688, 128)
    rosterShade.endFill()

    d.leaveBtn = d.game.add.button(352 + 16, 0 + 16, 'back', function(){
      leaveGame()
      d.game.state.start('menu')
      d.myGame = undefined
    })
    d.leaveBtn.scale.set(2, 2)

    let instructions = d.game.add.text(544, 0, 'Choose your\ncharacter', {font: 'bold 20pt Arial', boundsAlignH: 'center', boundsAlignV: 'middle', align: 'center'})
    instructions.setTextBounds(0, 0, 288, 96)

    d.startBtn = d.game.add.button(832 + 48, 0 + 16, 'start', function() {
      letsGo(d.myGame.id)
    })
    d.startBtn.scale.set(2, 2)

    // defaults to p1 as roboraj and p2 as billy
    let x1 = 352 + 224 - 80
    let y1 = 96 + 208 - 128
    let pp1 = ''
    if (d.myGame && d.myGame.player1) pp1 = d.myGame.alias[1] || 'Player 1'
    d.preview1 = d.game.add.text(x1, 96, pp1, {font: '20pt Arial', fill: '#0000FF', boundsAlignH: 'center', boundsAlignV: 'middle'})
    d.preview1.setTextBounds(0, 0, 160, 80)
    d.previewChar1 = d.game.add.image(x1, y1, 'RoboRaj')
    d.previewChar1.frame = 2
    d.previewChar1.scale.set(8, 8)
    d.previewChar1.visible = d.myGame && d.myGame.player1
    pp1 = (d.myGame && d.myGame.player1) ? 'RoboRaj' : ''
    d.preview1Char = d.game.add.text(x1, y1 + 256, pp1, {font: '20pt Arial', boundsAlignH: 'center', boundsAlignV: 'middle'})
    d.preview1Char.setTextBounds(0, 0, 160, 80)

    let x2 = 352 + 224 * 2 - 80
    let y2 = 96 + 208 - 128
    let pp2 = ''
    if (d.myGame && d.myGame.player2) pp2 = d.myGame.alias[2] || 'Player 2'
    d.preview2 = d.game.add.text(x2, 96, pp2, {font: '20pt Arial', fill: '#FF0000', boundsAlignH: 'center', boundsAlignV: 'middle'})
    d.preview2.setTextBounds(0, 0, 160, 80)
    d.previewChar2 = d.game.add.image(x2, y2, 'Billy')
    d.previewChar2.frame = 2
    d.previewChar2.scale.set(8, 8)
    d.previewChar2.visible = d.myGame && d.myGame.player2
    pp2 = (d.myGame && d.myGame.player2) ? 'Billy' : ''
    d.preview2Char = d.game.add.text(x2, y2 + 256, pp2, {font: '20pt Arial', boundsAlignH: 'center', boundsAlignV: 'middle'})
    d.preview2Char.setTextBounds(0, 0, 160, 80)

    let avatar = function(char) {
      return function() {
        chooseChar({char, id: d.myGame.id})
      }
    }

    // roster
    d.chooseRoboraj = d.game.add.button(352 + 136 * 1 - 38 + 4, 512 + 16, 'RoboRaj', avatar('RoboRaj'))
    d.chooseRoboraj.frame = 2
    d.chooseRoboraj.scale.set(3, 3)

    d.chooseBilly = d.game.add.button(352 + 136 * 2 - 38 + 4, 512 + 16, 'Billy', avatar('Billy'))
    d.chooseBilly.frame = 2
    d.chooseBilly.scale.set(3, 3)

    d.chooseBlackMage = d.game.add.button(352 + 136 * 3 - 38 + 4, 512 + 16, 'Black Mage', avatar('Black Mage'))
    d.chooseBlackMage.scale.set(3, 3)

    d.chooseGale = d.game.add.button(352 + 136 * 4 - 38 + 4, 512 + 16, 'Gale', avatar('Gale'))
    d.chooseGale.frame = 2
    d.chooseGale.scale.set(3, 3)


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

  }
}

export default newGameOptions