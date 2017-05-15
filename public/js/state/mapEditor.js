import d from '../game'
import createTilemap from '../create/createTilemap'

let mapEditor = {
    preload: function () {
      d.game.load.image('tc-editor', 'sprites/treasure-chest-editor.png')
      d.game.load.image('p2', 'sprites/p2.png')
      d.game.load.image('p1', 'sprites/p1.png')
      d.game.load.image('background-button', 'sprites/background-button.png')
      d.game.load.image('space-button', 'sprites/space-button.png')
      d.game.load.image('night-button', 'sprites/night-button.png')
      d.game.load.image('sunset-button', 'sprites/sunset-button.png')
      d.game.load.image('night-for-editor', 'sprites/night-for-editor.png')
      //d.game.load.image('submitBtn', 'sprites/submitBtn.png')
      d.game.load.image('map-editor-btn', 'sprites/map-editor-btn.png')
    },

    create: function() {
      createTilemap()
    },
    update: function() {
    }
  }

export default mapEditor
