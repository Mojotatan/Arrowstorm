import {getGames, newGame} from '../client'
import d from '../game'

let menu = {
  preload: function () {
    d.game.load.image('start-btn-bg', '../sprites/start-btn-bg.png')
    d.game.load.image('make-map-btn', '../sprites/make-map-btn.png')
    d.game.load.image('question-mark-btn', '../sprites/question-mark-btn.png')
    d.game.load.image('miniMap', '../sprites/miniMap.png')
  },
  create: function () {
    d.openGames = 0
    getGames()

    d.game.add.plugin(PhaserInput.Plugin)

    let titleStyle = {fontSize: 112, fill: '#FFFFFF', boundsAlignH: "center", boundsAlignV: "middle"}
    let titleText = d.game.add.text(0, 0, 'ARROW STORM', titleStyle)

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    titleText.setTextBounds(0, 0, 1024, 150);

    // games to join
    // let joinShade = d.game.add.graphics(31, 170)
    // joinShade.beginFill(0xe6e6ff)
    // joinShade.drawRect(0, 0, 300, 300)
    // joinShade.endFill()

    let joinShade = d.game.add.image(31, 170, 'make-map-btn')

    d.lobbyGames = d.game.add.group()

    let joinStyle = {font: '20pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let joinText = d.game.add.text(0, 0, 'Open Games', joinStyle)
    joinText.setTextBounds(31, 170, 300, 112)

    // load in any games if they exist
    if (d.gamesOnEnter) {
      d.gamesOnEnter.forEach(game => game())
    }

    // Start new Game button
    d.startBtn = d.game.add.button(362, 170, 'start-btn-bg', this.startGame, this)
    let startTextStyle = {font: '20pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let startText1 = d.game.add.text(0, 0, 'Start New Game', startTextStyle)
    startText1.setTextBounds(0, 0, 300, 112)
    d.startBtn.addChild(startText1)

    // Create map button
    d.mapBtn = d.game.add.button(693, 170, 'make-map-btn', this.startMap, this)
    let mapTextStyle = {font: '20pt Arial', fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle"}
    let mapText = d.game.add.text(0, 0, 'Create Map', mapTextStyle)
    mapText.setTextBounds(0, 0, 300, 112)
    d.mapBtn.addChild(mapText)

    d.game.add.image(748, 255, 'miniMap')

    // instructions
    d.questionBtn = d.game.add.button(31, 490, 'question-mark-btn', this.startHowTo, this)

    // name input

    let nameTextStyle = {font: '14pt Arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "bottom"}
    let enterNameText = d.game.add.text(0, 0, 'Enter your name:', nameTextStyle)
    enterNameText.setTextBounds(693, 490, 300, 75)

    d.nameInput = d.game.add.inputField(765, 565, {
      // font: '18px Arial',
      fill: '#212121',
      // fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Enter a name',
    })

    d.game.stage.setBackgroundColor('#000842')
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
