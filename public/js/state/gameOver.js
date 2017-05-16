import d from '../game'
import {letsGo} from '../client'

let gameOver = {
  create: function() {
    d.countdown = 120
    d.countdownText = d.game.add.text(448, 480, '', {font: '36pt Arial', fill: '#FFFFFF'})
    d.tex = d.game.add.text(192, 128, '', {font: '20pt Arial', fill: '#FFFFFF'})
    let score = d.game.add.text(320, 256, `${d.myGame.score[1]} - ${d.myGame.score[2]}`, {font: '36pt Arial', fill: '#FFFFFF'})
  },
  update: function() {
    if (d.myGame.score[1] < 5 && d.myGame.score[2] < 5) {
      d.countdown--
      d.countdownText.text = `${d.countdown}`
      if (d.countdown < 0) {
        letsGo(d.myGame.id)
      }
      d.tex.text = 'get ready'
    } else {
      d.tex.text = (d.myGame.score[1] > d.myGame.score[2]) ? 'Player One wins' : 'Player Two wins'
      d.game.add.button(192, 384, 'back', function() {d.game.state.start('menu')})
    }
  }
}

export default gameOver