import d from '../game'

export default function createTileSelector() {

  let me = d.mapEditor

  me.tileSelector = d.game.add.group()

  me.tileSelectorBackground = d.game.make.graphics()
  me.tileSelectorBackground.beginFill(0, 0.5)
  me.tileSelectorBackground.drawRect(672, 0, 32, 640)
  me.tileSelectorBackground.endFill()

  me.tileSelector.add(me.tileSelectorBackground)

  createTile(672, 0, 'brick')
  createTile(672, 32, 'cobble')
  createTile(672, 64, 'stone')
  createTile(672, 96, 'dirt')
  createTile(672, 128, 'grass')
  createTile(672, 160, 'wood')
  createTile(672, 192, 'tree')
  createTile(672, 224, 'boulder')
  createTile(672, 256, 'spikes')
  createTile(672, 288, 'spikes-left')
  createTile(672, 320, 'spikes-down')
  createTile(672, 352, 'spikes-right')
  createTile(672, 384, 'tc-editor')
  createTile(672, 416, 'p1')
  createTile(672, 448, 'p2')

  me.marker = d.game.add.graphics()
  me.marker.lineStyle(2, 0xffffff, 1)
  me.marker.drawRect(0, 0, 32, 32)
}

function pickTile(sprite, pointer){
  let me = d.mapEditor

  me.currentTile = d.game.math.snapToFloor(pointer.y, 32) / 32
  me.tileType = me.tileSelector.children[me.layer1.getTileX(pointer.y, 32) + 1].key
}

function createTile(x, y, type) {
  let tile = d.mapEditor.tileSelector.create(x, y, type)
  tile.inputEnabled = true
  tile.events.onInputDown.add(pickTile, this)
}
