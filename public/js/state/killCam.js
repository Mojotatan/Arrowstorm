import d from '../game'
import createFunc from '../create/create'
import scrubdateFunc from '../update/scrubdate'

let killCam = {
  create: function() {
    d.game.lockRender = false
    createFunc()
    if (d.dead.includes('player1')) d.player1.kill()
    if (d.dead.includes('player2')) d.player2.kill()
    if (d.dead.includes('player3')) d.player3.kill()
    if (d.dead.includes('player4')) d.player4.kill()
    d.history = d.history.slice(-120)
    d.slowmo = d.game.add.text(384, 128, 'FATALITY', {fontSize: 48, fill: '#FFFFFF'})
    d.interval = 0
  },
  update: function() {scrubdateFunc()}
}

export default killCam