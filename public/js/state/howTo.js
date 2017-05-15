import d from '../game'

let leaveGame = function() {
  d.game.state.start('menu')
}

let howTo = {
  create: function() {
    d.leaveBtn = d.game.add.button(896, 0, 'back', leaveGame)
    d.leaveBtn.scale.set(2, 2)

    d.game.add.text(16, 0, 'Your goal is to pierce the heart of your enemies with arrows', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 64, 'CONTROLS', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 96, 'Move left and right with the arrow keys', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 128, 'Jump with the up key', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 160, 'You can also slide down and jump off of walls', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 192, 'Aim your bow with W A S D', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 224, 'Fire arrows with space bar', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 288, 'PRO TIPS', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 320, 'Your arrow supply is limited', {font: '20pt Arial', fill: '#FFFFFF'})
    d.game.add.text(16, 352, 'Find awesome power ups in treasure chests', {font: '20pt Arial', fill: '#FFFFFF'})

    d.game.stage.setBackgroundColor('#000842')
  }
}

export default howTo
