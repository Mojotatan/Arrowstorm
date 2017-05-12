import d from '../game'

let leaveGame = function() {
  d.game.state.start('menu')
}

let howTo = {
  create: function() {
    d.leaveBtn = d.game.add.button(896, 0, 'back', leaveGame)
    d.leaveBtn.scale.set(2, 2)

    d.game.add.text(16, 0, 'Your goal is to pierce the heart of your enemies with arrows', {fill: '#FFFFFF'})
    d.game.add.text(16, 64, 'CONTROLS', {fill: '#FFFFFF'})
    d.game.add.text(16, 96, 'Move left and right with the arrow keys', {fill: '#FFFFFF'})
    d.game.add.text(16, 128, 'Jump with the up key', {fill: '#FFFFFF'})
    d.game.add.text(16, 160, 'You can also slide down and jump off of walls', {fill: '#FFFFFF'})
    d.game.add.text(16, 192, 'Aim your bow with W A S D', {fill: '#FFFFFF'})
    d.game.add.text(16, 224, 'Fire arrows with space bar', {fill: '#FFFFFF'})
    d.game.add.text(16, 288, 'PRO TIPS', {fill: '#FFFFFF'})
    d.game.add.text(16, 320, 'Your arrow supply is limited', {fill: '#FFFFFF'})
    d.game.add.text(16, 352, 'Find awesome power ups in treasure chests', {fill: '#FFFFFF'})
  }
}

export default howTo