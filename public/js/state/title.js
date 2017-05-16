import d from '../game'

let title = {
  create: function() {
    d.game.physics.startSystem(Phaser.Physics.ARCADE)

    let backdrop = d.game.add.sprite(0, 0, 'title')
    backdrop.scale.set(16, 16)

    d.titleArrow = d.game.add.sprite(512 - 24, -640, 'arrow')
    d.titleArrow.scale.set(8, -8)
    d.game.physics.arcade.enable(d.titleArrow)
    d.titleArrow.body.gravity.y = 1800

    d.titleGround = d.game.add.group()
    d.titleGround.enableBody = true
    d.titleGround.physicsBodyType = Phaser.Physics.ARCADE

    for (let i = 0; i < 32; i++) {
      let block = d.titleGround.create(i * 32, 512, 'grass')
      block.body.immovable = true
      d.titleGround.create(i * 32, 544, 'dirt')
      d.titleGround.create(i * 32, 576, 'dirt')
      d.titleGround.create(i * 32, 608, 'dirt')
    }

    d.startGame = d.game.add.button(448, 256, 'start', function() {d.game.state.start('menu')})
    d.startGame.scale.set(2, 2)
    d.startGame.alpha = 0

    d.titleText1 = d.game.add.text(0, 16, 'ARROW', {fill: '#FFFFFF', fontSize: 112, boundsAlignH: 'right'})
    d.titleText1.setTextBounds(0, 0, 496, 112)
    d.titleText1.visible = false
    d.titleText2 = d.game.add.text(528, 16, 'STORM', {fill: '#FFFFFF', fontSize: 112, boundsAlignH: 'left'})
    d.titleText2.setTextBounds(0, 0, 496, 112)
    d.titleText2.visible = false

    d.credits = d.game.add.text(16, 544, 'Presented by DDot Studios', {font: '20pt Arial', fill: '#FFFFFF'})
    d.credits.alpha = 0
    d.creditJames = d.game.add.text(832, 568 - 16, 'James', {font: '12pt Arial', fill: '#FFFFFF', boundsAlignH: 'right'})
    d.creditJames.setTextBounds(0, 0, 176, 96)
    d.creditJames.alpha = 0
    d.creditNish = d.game.add.text(832, 584 - 8, 'Nish', {font: '12pt Arial', fill: '#FFFFFF', boundsAlignH: 'right'})
    d.creditNish.setTextBounds(0, 0, 176, 96)
    d.creditNish.alpha = 0
    d.creditAlex = d.game.add.text(832, 600, 'Alex', {font: '12pt Arial', fill: '#FFFFFF', boundsAlignH: 'right'})
    d.creditAlex.setTextBounds(0, 0, 176, 96)
    d.creditAlex.alpha = 0

    d.trigger = false
    d.alpha = false

    d.enter = d.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    d.enter.onDown.add(() => {d.game.state.start('menu')})

  },
  update: function() {
    let impact = d.game.physics.arcade.collide(d.titleGround, d.titleArrow)
    if (impact && !d.trigger) {
      d.trigger = true
      d.game.time.events.add(1000, function() {
        d.titleText1.visible = true
      })
      d.game.time.events.add(1750, function() {
        d.titleText2.visible = true
      })
      d.game.time.events.add(2500, function() {
        d.alpha = true
      })
    }
    if (d.alpha && d.startGame.alpha < 1) {
      d.startGame.alpha += .01
      d.credits.alpha += .01
      d.creditJames.alpha += .01
      d.creditNish.alpha += .01
      d.creditAlex.alpha += .01
    }
  }
}

export default title