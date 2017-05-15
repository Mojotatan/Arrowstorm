import d from '../game'
import axios from 'axios'

import createTileSelector from './createTileSelector'
import convertToJSON from './convertToJSON'

export default function createTilemap() {

  d.game.add.plugin(PhaserInput.Plugin)

  d.mapEditor = {}
  let me = d.mapEditor

  me.blocks = []
  me.spikes = []
  me.p1 = {}
  me.p2 = {}
  me.tc = {}
  me.currentTile = 0

  d.game.stage.backgroundColor = '#FFFAFA';
  let backgroundImage = d.game.add.image(0, 0, 'background')
  let spaceImage = d.game.add.image(0, 0, 'space')
  let nightImage = d.game.add.image(0, 0, 'night')
  let sunsetImage = d.game.add.image(0, 0, 'sunset')

  d.backgroundImage = backgroundImage
  backgroundImage.visible = true
  spaceImage.visible = false
  nightImage.visible = false
  sunsetImage.visible = false
  me.backgroundForJSON = {file: 'background', scale: 1}

  d.backgroundButton = d.game.add.button(736, 96, 'background-button', backgroundOnClick, this)
  d.backgroundButton = d.game.add.button(864, 96, 'space-button', spaceOnClick, this)
  d.backgroundButton = d.game.add.button(736, 224, 'night-button', nightOnClick, this)
  d.backgroundButton = d.game.add.button(864, 224, 'sunset-button', sunsetOnClick, this)

  function backgroundOnClick() {
    d.backgroundImage = backgroundImage
    d.backgroundImage.scale.set(1, 1)
    backgroundImage.visible = true
    spaceImage.visible = false
    nightImage.visible = false
    sunsetImage.visible = false
    me.backgroundForJSON = {file: 'background', scale: 1}
  }

  function spaceOnClick() {
    d.backgroundImage = spaceImage
    d.backgroundImage.scale.set(1, 1)
    backgroundImage.visible = false
    spaceImage.visible = true
    nightImage.visible = false
    sunsetImage.visible = false
    me.backgroundForJSON = {file: 'space', scale: 1}
  }

  function nightOnClick() {
    d.backgroundImage = nightImage
    d.backgroundImage.scale.set(10, 10)
    backgroundImage.visible = false
    spaceImage.visible = false
    nightImage.visible = true
    sunsetImage.visible = false
    me.backgroundForJSON = {file: 'night', scale: 10}
  }

  function sunsetOnClick() {
    d.backgroundImage = sunsetImage
    d.backgroundImage.scale.set(10, 10)
    backgroundImage.visible = false
    spaceImage.visible = false
    nightImage.visible = false
    sunsetImage.visible = true
    me.backgroundForJSON = {file: 'sunset', scale: 10}
  }

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
  me.map.addTilesetImage('treasure-chest-editor', 'tc-editor', 32, 32, 0, 0, 12)
  me.map.addTilesetImage('p1', 'p1', 32, 32, 0, 0, 13)
  me.map.addTilesetImage('p2', 'p2', 32, 32, 0, 0, 14)

  me.layer1 = me.map.create('level1', 20, 20, 32, 32)

  me.layer1.resizeWorld()

  createTileSelector()

  d.input = d.game.add.inputField(770, 10, {
    font: '18px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 150,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    placeHolder: 'Enter map name',
  })

  //adding text
  var style = { font: "18px Arial", wordWrap: false, align: "center" };
  d.text = d.game.add.text(770, 60, "Select A Background", style)

  // create map button
  let createStyle = { font: "15px Arial", fill: '#000000', boundsAlignH: "center", boundsAlignV: "middle" };
  let createMapBtn = d.game.add.button(736, 480, 'map-editor-btn', onClickCreate, this)
  let createMapText = d.game.add.text(0, 0, "Create Map", createStyle)
  createMapBtn.addChild(createMapText)
  createMapText.setTextBounds(0, 0, 96, 48)

  // back to main menu button
  let backToMenuBtn = d.game.add.button(864, 480, 'map-editor-btn', () => d.game.state.start('menu'), this)
  let backToMenuText = d.game.add.text(0, 0, "Main Menu", createStyle)
  backToMenuBtn.addChild(backToMenuText)
  backToMenuText.setTextBounds(0, 0, 96, 48)

  d.game.input.addMoveCallback(updateMarker, this)

}

function onClickCreate() {
  let me = d.mapEditor
  let finalJSON = {}
  let mapName = d.input.value
  let creator = "NishAlex"

  finalJSON.name = mapName
  finalJSON.creator = creator
  finalJSON.p1Start = me.p1.p1Start
  finalJSON.p1Start.x += 192
  finalJSON.p2Start = me.p2.p2Start
  finalJSON.p2Start.x += 192
  finalJSON.treasureSpawn = me.tc.treasureSpawn
  finalJSON.treasureSpawn.x += 192
  finalJSON.blocks = me.blocks
  finalJSON.blocks.forEach(obj => {
    obj.x += 192
  })
  finalJSON.spikes = me.spikes
  finalJSON.spikes.forEach(obj => {
    obj.x += 192
  })
  finalJSON.shields = []
  finalJSON.background = me.backgroundForJSON

  let finalString = JSON.stringify(finalJSON)

  axios.post('/maps', {name: mapName, creator, json: finalString})
  .then(function(){
  })

}

function updateMarker(){
  let me = d.mapEditor

  me.marker.x = me.layer1.getTileX(d.game.input.activePointer.worldX) * 32;
  me.marker.y = me.layer1.getTileY(d.game.input.activePointer.worldY) * 32;

  if (d.game.input.mousePointer.isDown) {
      convertToJSON(me)
  }
}
