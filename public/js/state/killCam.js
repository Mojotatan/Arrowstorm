import d from '../game'
import createFunc from '../create/create'
import scrubdateFunc from '../update/scrubdate'

let killCam = {
  create: function() {
    d.game.lockRender = false
    d.history = d.history.slice(-120)
    createFunc()
    d.slowmo = d.game.add.text(384, 128, 'FATALITY', {fontSize: 48, fill: '#FFFFFF'})
    d.interval = 0
  },
  update: function() {scrubdateFunc()}
}

export default killCam