const fs = require('fs')
const axios = require('axios')

const mapToJson = function(obj, name) {
  let json = JSON.stringify(obj)
  fs.writeFile('public/maps/' + name, json, 'utf8', function() {console.log('okay')})
}

let obj = {}
obj.name = 'Alufted'
obj.creator = 'mojo'
obj.p1Start = {x: 244, y: 0}
obj.p2Start = {x: 780, y: 0}
obj.treasureSpawn = {x: 320 + 192, y: 0}
obj.blocks = []
obj.shields = []
obj.spikes = []
obj.background = {
  file: 'space',
  scale: 1
}
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
    obj.spikes.push({tile: 'spikes-right', x: 192 + 32 * i + 16, y: 288 + 16, rotation: 1.57})
  } else if (i === 18) {
    obj.spikes.push({tile: 'spikes-left', x: 192 + 32 * i + 16, y: 288 + 16, rotation: -1.57})
  }
}

let nobj = {}
nobj.name = 'Spike Palace'
nobj.creator = 'mojo'
nobj.p1Start = {x: 244 + 32 * 2, y: 32 * 4}
nobj.p2Start = {x: 780 - 32 * 2, y: 32 * 4}
nobj.treasureSpawn = {x: 320 + 192, y: 0}
nobj.blocks = []
nobj.shields = []
nobj.spikes = []
nobj.background = {
  file: 'sunset',
  scale: 10
}
for (let i = 0; i < 20; i++) {
  if (i < 7 || i > 12) {
    nobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 608})
    nobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 0})
  }
  if (i) {
    nobj.blocks.push({tile: 'stone', x: 192, y: 32 * i})
    nobj.blocks.push({tile: 'stone', x: 800, y: 32 * i})
  }
  if (i > 5 && i < 12) {
    nobj.blocks.push({tile: 'wood', x: 192 + 32 * 3, y: 32 * i})
    nobj.blocks.push({tile: 'wood', x: 192 + 32 * 16, y: 32 * i})
  }
  if ((i > 3 && i < 8) || (i > 11 && i < 16)) {
    nobj.blocks.push({tile: 'wood', x: 192 + 32 * i, y: 32 * 6})
    nobj.blocks.push({tile: 'wood', x: 192 + 32 * i, y: 32 * 16})
  }
  if (i === 1 || i === 18) {
    nobj.blocks.push({tile: 'wood', x: 192 + 32 * i, y: 32 * 16})
  }
  if ((i > 0 && i < 7) || (i > 12 && i < 19)) {
    nobj.spikes.push({tile: 'spikes-down', x: 192 + 32 * i + 16, y: 32 * 1 + 16, rotation: 3.14})
    nobj.spikes.push({tile: 'spikes', x: 192 + 32 * i + 16, y: 32 * 18 + 16, rotation: 0})
  }
}

let pobj = {}
pobj.name = 'Tunnel Vision'
pobj.creator = 'mojo'
pobj.p1Start = {x: 700, y: 17 * 32}
pobj.p2Start = {x: 700, y: 11 * 32}
pobj.treasureSpawn = {x: 132 + 192, y: 132}
pobj.blocks = []
pobj.shields = []
pobj.spikes = []
pobj.background = {
  file: 'night',
  scale: 10
}
for (let i = 0; i < 20; i++) {
  if (!(i > 0 && i < 6)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 0})
  }
  if (!(i > 0 && i < 6)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 608})
  }
  if (!(i > 0 && i < 6) && !(i > 6 && i < 13) && !(i > 13 && i < 19)) {
    pobj.blocks.push({tile: 'stone', x: 192, y: 32 * i})
  }
  if (!(i > 0 && i < 6) && !(i > 6 && i < 13) && !(i > 13 && i < 19)) {
    pobj.blocks.push({tile: 'stone', x: 800, y: 32 * i})
  }
  if (!(i > 13 && i < 19)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 6})
  }
  if (!(i > 6 && i < 13)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 13})
  }
  if (!(i > 6 && i < 13)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * 6, y: 32 * i})
  }
  if (!(i > 13 && i < 19)) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * 13, y: 32 * i})
  }
  if (i > 6 && i < 13) {
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 1})
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 2})
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 3})
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 4})
    pobj.blocks.push({tile: 'stone', x: 192 + 32 * i, y: 32 * 5})
  }
}

let qobj = {}
qobj.name = 'Free Fall'
qobj.creator = 'mojo'
qobj.p1Start = {x: 244, y: 32 * 8}
qobj.p2Start = {x: 780, y: 32 * 8}
qobj.treasureSpawn = {x: 320 + 192, y: 0}
qobj.blocks = []
qobj.shields = []
qobj.spikes = []
qobj.background = {
  file: 'sunset',
  scale: 10
}
for (let i = 0; i < 20; i++) {
  qobj.blocks.push({tile: 'stone', x: 192, y: 32 * i})
  qobj.blocks.push({tile: 'stone', x: 800, y: 32 * i})
  if (i > 5 && i < 14) {
    qobj.blocks.push({tile: 'stone', x: 192 + 32 * 6, y: 32 * i})
    qobj.blocks.push({tile: 'stone', x: 192 + 32 * 13, y: 32 * i})
  }
}

mapToJson(obj, 'default.json')

const Map = require('../../server/db').Map

Map.sync()
.then(() => {
  return Map.create({
    name: 'default',
    creator: 'mojo',
    json: JSON.stringify(obj)
  })
})
.then(() => {
  return Map.create({
    name: 'spike city',
    creator: 'mojo',
    json: JSON.stringify(nobj)
  })
})
.then(() => {
  return Map.create({
    name: 'tunnel vision',
    creator: 'mojo',
    json: JSON.stringify(pobj)
  })
})
.then(() => {
  return Map.create({
    name: 'free fall',
    creator: 'mojo',
    json: JSON.stringify(qobj)
  })
})
.then(() => {
  console.log('sweet')
})