import d from '../game'

import createTileSelector from './createTileSelector'

export default function createTilemap() {
  d.mapEditor = {}
  let me = d.mapEditor

  me.currentTile = 0

  d.game.stage.backgroundColor = '#2d2d2d';
  // d.game.add.tileSprite(0, 0, 1024, 640, 'space')

  me.map  = d.game.add.tilemap()

  me.map.addTilesetImage('brick', 'brick', 32, 32, 0, 0, 0)
  me.map.addTilesetImage('cobble', 'cobble', 32, 32, 0, 0, 1)
  me.map.addTilesetImage('spikes', 'spikes', 32, 32, 0, 0, 2)
  me.map.addTilesetImage('dirt', 'dirt', 32, 32, 0, 0, 3)
  me.map.addTilesetImage('grass', 'grass', 32, 32, 0, 0, 4)
  me.map.addTilesetImage('wood', 'wood', 32, 32, 0, 0, 5)
  me.map.addTilesetImage('tree', 'tree', 32, 32, 0, 0, 6)
  me.map.addTilesetImage('boulder', 'boulder', 32, 32, 0, 0, 7)

  me.layer1 = me.map.create('level1', 20, 20, 32, 32)

  me.layer1.resizeWorld()

  createTileSelector()

  d.game.input.addMoveCallback(updateMarker, this)

}


function updateMarker(){
  let me = d.mapEditor

  me.marker.x = me.layer1.getTileX(d.game.input.activePointer.worldX) * 32;
  me.marker.y = me.layer1.getTileY(d.game.input.activePointer.worldY) * 32;


  if (d.game.input.mousePointer.isDown)
  {
      me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1);
      console.log('type of tile', me.tileType)
      console.log('getTileX', me.layer1.getTileX(me.marker.x) * 32)
      console.log('getTileY', me.layer1.getTileY(me.marker.y) * 32)
  }
}
