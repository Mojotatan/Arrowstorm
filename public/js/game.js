const game = function() {
  //
  let game = new Phaser.Game(1366, 768, Phaser.AUTO, '', { preload, create, update });
  game.antialias = false

  let guy

  function preload() {
    game.load.image('raj', 'sprites/raj.png')
    game.load.image('roboraj1', 'sprites/roboraj-1.png')
    game.load.image('roboraj2', 'sprites/roboraj-2.png')
    game.load.image('arrow', 'sprites/roboraj-arrow.png')
    game.load.image('bow', 'sprites/bow.png')
  }

  function create() {
    guy = game.add.sprite(0, 0, 'raj')
    guy.scale.set(4, 4)

    roboraj = game.add.sprite(128, 0, 'roboraj1')
    roboraj.scale.set(4, 4)

    arrow = game.add.sprite(256, 0, 'arrow')
    arrow.scale.set(4, 4)

    bow = game.add.sprite(384, 0, 'bow')
    bow.scale.set(4, 4)

    game.stage.backgroundColor = "#999999"

  }

  function update() {
  }

  return {}
}()