import axios from 'axios'
import d from '../game'

let loadAssets = {
  preload: function() {
    d.game.load.image('raj', 'sprites/raj.png')
    d.game.load.spritesheet('roboraj', 'sprites/roboraj.png', 20, 32)
    d.game.load.spritesheet('fatKid', 'sprites/fat-kid.png', 20, 32)
    d.game.load.spritesheet('blackMage', 'sprites/black-mage.png', 20, 32)
    d.game.load.spritesheet('gale', 'sprites/gale.png', 20, 32)
    d.game.load.spritesheet('blood', 'sprites/blood.png', 32, 32)
    d.game.load.image('arrow', 'sprites/Arrow.png')
    d.game.load.image('arrowSide', 'sprites/Arrow copy.png')
    d.game.load.image('bow', 'sprites/bow-crop.png')
    d.game.load.image('ground', 'sprites/platform.png')
    d.game.load.image('brick', 'sprites/brick.png')
    d.game.load.image('dirt', 'sprites/dirt.png')
    d.game.load.image('grass', 'sprites/grass.png')
    d.game.load.image('stone', 'sprites/stone.png')
    d.game.load.image('wood', 'sprites/wood.png')
    d.game.load.image('cobble', 'sprites/cobblestone.png')
    d.game.load.image('space', 'sprites/space-crop.png')
    d.game.load.spritesheet('shieldWall', 'sprites/shieldwall.png')
    d.game.load.image('spikes', 'sprites/spikes.png')
    d.game.load.image('spikes-left', 'sprites/spikes-left.png')
    d.game.load.image('spikes-down', 'sprites/spikes-down.png')
    d.game.load.image('spikes-right', 'sprites/spikes-right.png')
    d.game.load.image('start', 'sprites/start-btn.png')
    d.game.load.image('back', 'sprites/back-btn.png')
    d.game.load.image('join', 'sprites/join-btn.png')
    d.game.load.image('go', 'sprites/go-btn.png')
    d.game.load.image('treasure', 'sprites/treasure-chest.png')
    d.game.load.image('night', 'sprites/night.png')
    d.game.load.image('sunset', 'sprites/sunset.png')
    d.game.load.image('sel', 'sprites/sel.png')
    d.game.load.image('wing', 'sprites/wing.png')
    d.game.load.image('tree', 'sprites/tree.png')
    d.game.load.image('boulder', 'sprites/boulder.png')
    d.game.load.image('submit', 'sprites/submitBtn.png')
    d.game.load.image('background', 'sprites/background.png')
  },
  create: function() {
    axios.get('/maps')
    .then(maps => {
      d.maps = maps.data.map(map => JSON.parse(map))
      d.game.state.start('title')
    })
  }
}

export default loadAssets
