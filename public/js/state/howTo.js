import d from '../game'

let leaveGame = function() {
  d.game.state.start('menu')
}

let howTo = {
  create: function() {
    d.leaveBtn = d.game.add.button(5, 580, 'back', leaveGame)
    d.leaveBtn.scale.set(2, 2)

    let t1 = d.game.add.text(16, 0, 'Your goal is to pierce the heart of your enemies with arrows', {font: '25pt Arial', fill: '#FFFFFF'})
    let t2 = d.game.add.text(16, 64, 'CONTROLS', {font: '20pt Arial', fill: '#FFFFFF'})
    let t3 = d.game.add.text(16, 96, 'Move left and right with the arrow keys', {font: '20pt Arial', fill: '#FFFFFF'})
    let t4 = d.game.add.text(16, 128, 'Jump with the up key', {font: '20pt Arial', fill: '#FFFFFF'})
    let t5 = d.game.add.text(16, 160, 'You can also slide down and jump off of walls', {font: '20pt Arial', fill: '#FFFFFF'})
    let t6 = d.game.add.text(16, 192, 'Aim your bow with W A S D', {font: '20pt Arial', fill: '#FFFFFF'})
    let t7 = d.game.add.text(16, 224, 'Fire arrows with space bar', {font: '20pt Arial', fill: '#FFFFFF'})
    let t8 = d.game.add.text(16, 288, 'PRO TIPS', {font: '20pt Arial', fill: '#FFFFFF'})
    let t9 = d.game.add.text(16, 320, 'Your arrow supply is limited', {font: '20pt Arial', fill: '#FFFFFF'})
    let t10 = d.game.add.text(16, 352, 'Find awesome power ups in treasure chests', {font: '20pt Arial', fill: '#FFFFFF'})

    t1.font = 'ArcadeClassic'
    t1.textbounds 
    t2.font = 'ArcadeClassic'
    t3.font = 'ArcadeClassic'
    t4.font = 'ArcadeClassic'
    t5.font = 'ArcadeClassic'
    t6.font = 'ArcadeClassic'
    t7.font = 'ArcadeClassic'
    t8.font = 'ArcadeClassic'
    t9.font = 'ArcadeClassic'
    t10.font = 'ArcadeClassic'

    d.game.stage.setBackgroundColor('#000842')
  }
}

export default howTo
