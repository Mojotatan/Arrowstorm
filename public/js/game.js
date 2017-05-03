import updateFunc from './update/update'
import createFunc from './create/create'
//import Phaser from '../phaser/phaser'
const gameFunc = function() {
  //
  let guy, platforms, arrows
  let game = new Phaser.Game(1024, 640, Phaser.AUTO, '', { preload, create, update });
  game.antialias = false

  function init() {
    let keys = [Phaser.KeyCode.SPACEBAR]
    phaserKeys = game.input.keyboard.addKeys(keys)
    game.input.keyboard.addKeyCapture(keys)
  }

  function preload() {
    game.load.image('raj', 'sprites/raj.png')
    game.load.image('roboraj1', 'sprites/roboraj-1.png')
    game.load.image('roboraj2', 'sprites/roboraj-2.png')
    game.load.image('arrow', 'sprites/roboraj-arrow.png')
    game.load.image('bow', 'sprites/bow.png')
    game.load.image('ground', 'sprites/platform.png')
  }

  function create() {
    console.log('guy in createFunc', guy)
    let obj = createFunc({
      game,
      guy,
      platforms,
      arrows,
    })


    // guy = obj.guy
    // platforms = obj.platforms
    // arrows = obj.arrows
  }



  function update() {

    updateFunc({
      game,
      guy,
      platforms,
      arrows,
    })
  }

  return {}
}()
