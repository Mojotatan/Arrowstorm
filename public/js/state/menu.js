import {getGames, newGame} from '../client'
import d from '../game'

let menu = {
  preload: function () {},
  create: function () {
    d.openGames = 0
    getGames()

    d.game.add.plugin(PhaserInput.Plugin)

    let titleStyle = {fontSize: 120, fill: '#FFFFFF', boundsAlignH: "center", boundsAlignV: "middle"}
    let titleText = d.game.add.text(0, 0, 'ARROW STORM', titleStyle)

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    titleText.setTextBounds(0, 0, 1024, 150);

    titleText.font = 'ArcadeClassic'

    // games to join
    // let joinShade = d.game.add.graphics(31, 170)
    // joinShade.beginFill(0xe6e6ff)
    // joinShade.drawRect(0, 0, 300, 300)
    // joinShade.endFill()

    let joinShade = d.game.add.image(31, 170, 'make-map-btn')

    d.lobbyGames = d.game.add.group()

    let joinStyle = {font: '30pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let joinText = d.game.add.text(0, -8, 'Open Games', joinStyle)
    joinText.font = 'ArcadeClassic'
    joinText.setTextBounds(31, 170, 300, 112)

    // load in any games if they exist
    if (d.gamesOnEnter) {
      d.gamesOnEnter.forEach(game => game())
    }

    // Start new Game button
    d.startBtn = d.game.add.button(362, 170, 'start-btn-bg', this.startGame, this)
    let startTextStyle = {font: '30pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let startText1 = d.game.add.text(0, -8, 'Start New Game', startTextStyle)
    startText1.font = 'ArcadeClassic'
    startText1.setTextBounds(0, 0, 300, 112)
    d.startBtn.addChild(startText1)

    // Create map button
    d.mapBtn = d.game.add.button(693, 170, 'make-map-btn', this.startMap, this)
    let mapTextStyle = {font: '30pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let mapText = d.game.add.text(0, -8, 'Create Map', mapTextStyle)
    mapText.font = 'ArcadeClassic'
    mapText.setTextBounds(0, 0, 300, 112)
    d.mapBtn.addChild(mapText)

    d.game.add.image(748, 252, 'miniMap')

    // instructions
    d.questionBtn = d.game.add.button(31, 500, 'question-mark-btn', this.startHowTo, this)

    // name input

    let nameTextStyle = {font: '20pt Arial', fill: '#ffffff', boundsAlignH: "left", boundsAlignV: "bottom"}
    let enterNameText = d.game.add.text(0, 0, 'Enter your name :', nameTextStyle)
    enterNameText.font = 'ArcadeClassic'
    enterNameText.setTextBounds(695, 490, 300, 75)

    d.nameInput = d.game.add.inputField(693, 565, {
      // font: '18px Arial',
      fill: '#212121',
      // fontWeight: 'bold',
      width: 285,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Enter a name',
    })

    d.game.stage.setBackgroundColor('#A84A25')
  },
  startGame: function () {
    newGame()
    d.game.state.start('newGameOptions')
  },
  startMap: function() {
    this.game.state.start('mapEditor')
  },
  startHowTo: function() {
    this.game.state.start('howTo')
  }
}

export default menu
