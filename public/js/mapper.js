const fs = require('fs')

const mapToJson = function(obj, name) {
  let json = JSON.stringify(obj)
  fs.writeFile('public/maps/' + name, json, 'utf8', function() {console.log('okay')})
}

let obj = {}
obj.p1Start = {x: 244, y: 0}
obj.blocks = []
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
}

mapToJson(obj, 'default.json')