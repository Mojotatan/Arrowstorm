import d from '../game'

import createTileSelector from './createTileSelector'

export default function createTilemap() {
  d.mapEditor = {}
  let me = d.mapEditor

  me.blocks = []
  me.spikes = []
  me.currentTile = 0

  d.game.stage.backgroundColor = '#FFFAFA';
  // d.game.add.tileSprite(0, 0, 1024, 640, 'space')

  me.map  = d.game.add.tilemap()

  me.map.addTilesetImage('brick', 'brick', 32, 32, 0, 0, 0)
  me.map.addTilesetImage('cobble', 'cobble', 32, 32, 0, 0, 1)
  me.map.addTilesetImage('stone', 'stone', 32, 32, 0, 0, 2)
  me.map.addTilesetImage('dirt', 'dirt', 32, 32, 0, 0, 3)
  me.map.addTilesetImage('grass', 'grass', 32, 32, 0, 0, 4)
  me.map.addTilesetImage('wood', 'wood', 32, 32, 0, 0, 5)
  me.map.addTilesetImage('tree', 'tree', 32, 32, 0, 0, 6)
  me.map.addTilesetImage('boulder', 'boulder', 32, 32, 0, 0, 7)
  me.map.addTilesetImage('spikes', 'spikes', 32, 32, 0, 0, 8)
  me.map.addTilesetImage('spikes-left', 'spikes-left', 32, 32, 0, 0, 9)
  me.map.addTilesetImage('spikes-right', 'spikes-right', 32, 32, 0, 0, 10)
  me.map.addTilesetImage('spikes-down', 'spikes-down', 32, 32, 0, 0, 11)

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
      // console.log('type of tile', me.tileType)
      // console.log('getTileX', me.layer1.getTileX(me.marker.x) * 32)
      // console.log('getTileY', me.layer1.getTileY(me.marker.y) * 32)
      convertToJSON(me)
  }
}


function convertToJSON(me){
   console.log('type of tile', me.tileType)
   console.log('getTileX', me.layer1.getTileX(me.marker.x) * 32)
   let x = me.layer1.getTileX(me.marker.x) * 32
   console.log('getTileY', me.layer1.getTileY(me.marker.y) * 32)
   let y = me.layer1.getTileY(me.marker.y) * 32
   let id = x + '' + y
   let obj = {tile: me.tileType, x, y, id}

   if (x < 640 && me.tileType.startsWith('spikes')) {
     let existsInSpikes = me.spikes.some(elem => elem.id === obj.id)
     if (existsInSpikes) {
      me.spikes = existsInArray(me.spikes, obj, me)
     }
     else {
      notExist(me.spikes, obj, me)
     }
     console.log('the spikes are', me.spikes)
   }
   else if (x < 640) {
      let exists = me.blocks.some(elem => elem.id === obj.id)
      if (exists) {
        // me.map.removeTile(me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
        // me.blocks = me.blocks.filter(elem => elem.id !== obj.id)
        me.blocks = existsInArray(me.blocks, obj, me)
      }
      else {
        // me.blocks.push({tile: me.tileType, x, y, id})
        // me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
        notExist(me.blocks, obj, me)
      }
      console.log('the blocks are', me.blocks)
   }
}

function existsInArray(arr, obj, me) {
  console.log('entering existsInArray', arr, obj)
  let removedItem = me.map.removeTile(me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
  console.log('the removedItem is', removedItem)
  return arr.filter(elem => elem.id !== obj.id)
}

function notExist(arr, obj, me) {
  arr.push({tile: me.tileType, x: obj.x, y: obj.y, id: obj.id})
  me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
}
