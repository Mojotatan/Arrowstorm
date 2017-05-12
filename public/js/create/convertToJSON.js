export default function convertToJSON(me){
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
   } else if (x < 640 && me.tileType === 'p1') {
     if (me.p1.p1Start && me.p1.p1Start.x === x && me.p1.p1Start.y === y) {
       let removedItem = me.map.removeTile(me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
       console.log('the removedItem is', removedItem)
       delete me.p1.p1Start
       console.log('p1 obj is', me.p1)
     } else if (!me.p1.p1Start) {
       me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
       me.p1.p1Start = { x, y}
       console.log('p1 obj is', me.p1)
     }
   } else if (x < 640 && me.tileType === 'p2') {
      if (me.p2.p2Start && me.p2.p2Start.x === x && me.p2.p2Start.y === y) {
         let removedItem = me.map.removeTile(me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
         console.log('the removedItem is', removedItem)
         delete me.p2.p2Start
         console.log('p2 obj is', me.p2)
       } else if (!me.p2.p2Start) {
         me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
         me.p2.p2Start = { x, y}
         console.log('p2 obj is', me.p2)
       }
   } else if (x < 640 && me.tileType === 'tc-editor') {
      if (me.tc.treasureSpawn && me.tc.treasureSpawn.x === x && me.tc.treasureSpawn.y === y) {
       let removedItem = me.map.removeTile(me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
       console.log('the removedItem is', removedItem)
       delete me.tc.treasureSpawn
       console.log('tc obj is', me.tc)
     } else if (!me.tc.treasureSpawn) {
       me.map.putTile(me.currentTile, me.layer1.getTileX(me.marker.x), me.layer1.getTileY(me.marker.y), me.layer1)
       me.tc.treasureSpawn = { x, y}
       console.log('tc obj is', me.tc)
     }
   } else if (x < 640) {
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
