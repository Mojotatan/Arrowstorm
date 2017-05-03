import updateFunc from './update/update'
import createFunc from './create/create'
//import Phaser from '../phaser/phaser'
const gameFunc = function() {

  let d = {}
  d.game = new Phaser.Game(1024, 640, Phaser.AUTO, '', { preload, create, update });
  d.game.antialias = false

  function init() {
    let keys = [Phaser.KeyCode.SPACEBAR]
    phaserKeys = game.input.keyboard.addKeys(keys)
    game.input.keyboard.addKeyCapture(keys)
  }

  function preload() {
    d.game.load.image('raj', 'sprites/raj.png')
    d.game.load.image('roboraj1', 'sprites/roboraj-1.png')
    d.game.load.image('roboraj2', 'sprites/roboraj-2.png')
    d.game.load.image('arrow', 'sprites/roboraj-arrow.png')
    d.game.load.image('bow', 'sprites/bow.png')
    d.game.load.image('ground', 'sprites/platform.png')
  }

  function create() {

    createFunc(d)

  }



  function update() {

    updateFunc(d)

  }

  return {}
}()
