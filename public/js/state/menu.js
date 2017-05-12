import {getGames, newGame} from '../client'
import d from '../game'

let menu = {
  preload: function () {},
  create: function () {
    d.openGames = 0
    getGames()

    d.startBtn = d.game.add.button(0, 0, 'start', this.startGame, this)
    d.startBtn.scale.set(4, 4)

    d.game.add.text(256, 0, 'start\nnew\ngame', {fill: '#FFFFFF'})

    d.mapBtn = d.game.add.button(768, 0, 'start', this.startMap, this)
    d.mapBtn.scale.set(4, 4)

    d.game.add.text(688, 0, 'make\nnew\nmap', {fill: '#FFFFFF'})


    // games to join
    let joinShade = d.game.add.graphics(16, 192)
    joinShade.beginFill(0xe6e6ff)
    joinShade.drawRect(0, 0, 240, 432)
    joinShade.endFill()

    d.lobbyGames = d.game.add.group()
    d.game.add.text(32, 208, 'Open Games')

    // load in any games if they exist
    if (d.gamesOnEnter) {
      d.gamesOnEnter.forEach(game => game())
    }

    d.game.add.text(432, 240, 'How To Play', {fill: '#FFFFFF'})
    d.mapBtn = d.game.add.button(480, 288, 'go', this.startHowTo, this)
    d.mapBtn.scale.set(2, 2)

    d.game.stage.setBackgroundColor('#008080')
  },
  startGame: function () {
    newGame()
    d.game.state.start('newGameOptions')
  },
  startMap: function() {

    console.log(d.game.state)
    this.game.state.start('mapEditor')
  },
  startHowTo: function() {
    this.game.state.start('howTo')
  }
}

export default menu