const fs = require('fs')

const mapToJson = function(obj, name) {
  let json = JSON.stringify(obj)
  fs.writeFile('public/maps/' + name, json, 'utf8', function() {console.log('okay')})
}

let obj = {}
obj.p1Start = {x: 244, y: 0}
obj.p2Start = {x: 780, y: 0}
obj.blocks = []
obj.shields = []
obj.spikes = []
for (let i = 0; i < 20; i++) {
  if (i < 8 || i > 11) {
    obj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 608})
    obj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 0})
  } else {
    obj.blocks.push({tile: 'cobble', x: 192 + 32 * i, y: 288 + 16})
  }
  if (i < 11 || (i > 14 && i < 19)) {
    obj.blocks.push({tile: 'stone', x: 192, y: 32 * i})
    obj.blocks.push({tile: 'stone', x: 800, y: 32 * i})
  }
  if ((i > 0 && i < 4) || (i > 15 && i < 19)) {
    obj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 160})
  }
  if ((i > 3 && i < 8) || (i > 11 && i < 16)) {
    obj.blocks.push({tile: 'cobble', x: 192 + 32 * i, y: 448})
  }
  if (i === 1) {
    obj.spikes.push({x: 192 + 32 * i + 16, y: 288 + 16, rotation: 1.57})
  } else if (i === 18) {
    obj.spikes.push({x: 192 + 32 * i + 16, y: 288 + 16, rotation: -1.57})
  }
}
obj.background = {
  file: 'night', //for space use scale .3333
  scale: 10
}

mapToJson(obj, 'default.json')