import updateFunc from './update/update'
import createFunc from './create/create'
//import Phaser from '../phaser/phaser'
const gameFunc = function() {
  //
  let guy, platforms
  let game = new Phaser.Game(1024, 640, Phaser.AUTO, '', { preload, create, update });
  game.antialias = false


  function preload() {
    game.load.image('raj', 'sprites/raj.png')
    game.load.image('roboraj1', 'sprites/roboraj-1.png')
    game.load.image('roboraj2', 'sprites/roboraj-2.png')
    game.load.image('arrow', 'sprites/roboraj-arrow.png')
    game.load.image('bow', 'sprites/bow.png')
    game.load.image('ground', 'sprites/platform.png')
  }

  function create() {

    let obj = createFunc({
      game,
      guy,
      platforms,  
    })

    guy = obj.guy
    platforms = obj.platforms

  }



  function update() {

    updateFunc({
      game, 
      guy, 
      platforms,
    })
  }

  return {}
}()