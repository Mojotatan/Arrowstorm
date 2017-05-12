import createTilemap from './create/createTilemap'

import loadAssets from './state/loadAssets'
import menu from './state/menu'
import newGameOptions from './state/newGameOptions'
import runGame from './state/runGame'
import howTo from './state/howTo'
// import mapEditor form './state/mapEditor'
import killCam from './state/killCam'
import gameOver from './state/gameOver'

let d = {}
export default d

const gameFunc = function() {


  // game play area is a box so walls of 192 width on each side
  d.game = new Phaser.Game(1024, 640, Phaser.AUTO, 'app', null, false, false);

  let mapEditor = {
    preload: function () {
      d.game.load.image('tc-editor', 'sprites/treasure-chest-editor.png')
      d.game.load.image('p2', 'sprites/p2.png')
      d.game.load.image('p1', 'sprites/p1.png')
      d.game.load.image('background-for-editor', 'sprites/background-for-editor.png')
      d.game.load.image('background-button', 'sprites/background-button.png')
      d.game.load.image('space-button', 'sprites/space-button.png')
      d.game.load.image('night-button', 'sprites/night-button.png')
      d.game.load.image('sunset-button', 'sprites/sunset-button.png')
      d.game.load.image('night-for-editor', 'sprites/night-for-editor.png')
      d.game.load.image('submitBtn', 'sprites/submitBtn.png')
    },

    create: function() {
      createTilemap()
    },
    update: function() {
      console.log('text input value is', d.input.value)

    }
  }

  d.game.state.add('loadAssets', loadAssets)
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
