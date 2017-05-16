import loadAssets from './state/loadAssets'
import title from './state/title'
import menu from './state/menu'
import newGameOptions from './state/newGameOptions'
import runGame from './state/runGame'
import howTo from './state/howTo'
import mapEditor from './state/mapEditor'
import killCam from './state/killCam'
import gameOver from './state/gameOver'

let d = {}
export default d

const gameFunc = function() {


  // game play area is a box so walls of 192 width on each side
  d.game = new Phaser.Game(1024, 640, Phaser.AUTO, 'app', null, false, false);

  d.game.state.add('loadAssets', loadAssets)
  d.game.state.add('title', title)
  d.game.state.add('menu', menu)
  d.game.state.add('newGameOptions', newGameOptions)
  d.game.state.add('runGame', runGame)
  d.game.state.add('mapEditor', mapEditor)
  d.game.state.add('howTo', howTo)
  d.game.state.add('killCam', killCam)
  d.game.state.add('gameOver', gameOver)
  d.game.state.start('loadAssets')

  return {}
}()
