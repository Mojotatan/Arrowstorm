import d from '../game'
import axios from 'axios'

export default function onClickCreate() {
  let me = d.mapEditor
  let finalJSON = {}
  let mapName = d.input.value
  let creator = d.nameInput.value

  finalJSON.name = mapName
  finalJSON.creator = creator
  finalJSON.p1Start = me.p1.p1Start
  finalJSON.p1Start.x += 192
  finalJSON.p2Start = me.p2.p2Start
  finalJSON.p2Start.x += 192
  finalJSON.p3Start = me.p3.p3Start
  finalJSON.p3Start.x += 192
  finalJSON.p4Start = me.p4.p4Start
  finalJSON.p4Start.x += 192
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
  .then(function() {
    return axios.get('/maps')
  })
  .then(maps => {
    d.maps = maps.data.map(map => JSON.parse(map))
    d.game.state.start('menu')
  })

}
