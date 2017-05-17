import d from '../game'
import {letsGo} from '../client'

let gameOver = {
  create: function() {
    d.countdown = 120
    d.countdownText = d.game.add.text(448, 480, '', {font: '46pt ArcadeClassic', fill: '#FFFFFF'})
    d.tex = d.game.add.text(192, 128, '', {font: '30pt ArcadeClassic', fill: '#FFFFFF'})
    let score = d.game.add.text(320, 256, '', {font: '46pt ArcadeClassic', fill: '#FFFFFF'})
    let scores = []
    if (d.player1) scores.push(d.myGame.score[1])
    if (d.player2) scores.push(d.myGame.score[2])
    if (d.player3) scores.push(d.myGame.score[3])
    if (d.player4) scores.push(d.myGame.score[4])
    score.text = scores.join('-')
  },
  update: function() {
    if (Math.max(d.myGame.score[1], d.myGame.score[2], d.myGame.score[3], d.myGame.score[4]) < 5) {
      d.countdown--
      d.countdownText.text = `${d.countdown}`
      if (d.countdown < 0) {
        letsGo(d.myGame.id)
      }
      d.tex.text = 'Get Ready for Round '+ d.myGame.round
    } else {
      let winner = {score: d.myGame.score[1], player: d.myGame.alias[1] || 'Player One'}
      if (d.myGame.score[2] > winner.score) {
        winner.score = d.myGame.score[2]
        winner.player = d.myGame.alias[2] || 'Player Two'
      }
      if (d.myGame.score[3] > winner.score) {
        winner.score = d.myGame.score[3]
        winner.player = d.myGame.alias[3] || 'Player Three'
      }
      if (d.myGame.score[4] > winner.score) {
        winner.score = d.myGame.score[4]
        winner.player = d.myGame.alias[4] || 'Player Four'
      }
      d.tex.text = `${winner.player} wins`

      d.game.add.button(192, 384, 'back', function() {d.game.state.start('menu')})
    }
  }
}

export default gameOver