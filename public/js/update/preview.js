import d from '../game'
import {mapSel} from '../client'

export function preview(map) {
  d.preview = d.game.add.group()

  let previewBackground = d.preview.create(16, 16, map.background.file)
  previewBackground.scale.set(map.background.scale / 2, map.background.scale / 2)


  map.blocks.forEach(block => {
    let x = block.x - 192
    x /= 2
    x += 16
    let y = block.y / 2
    y += 16
    let newBlock = d.preview.create(x, y, block.tile)
    newBlock.scale.set(.5, .5)
  })

}

export function renderMaps(page) {
  if (d.prevPage) d.prevPage.kill()
  if (d.nextPage) d.nextPage.kill()
  d.mapSel.position.y = 412

  let y = 416
  d.currentMaps.forEach(map => {
    map.kill()
  })
  d.currentMaps = []

  d.pages[page].forEach((map, index) => {
    let showMap = d.game.add.text(16 + 8, y, map.name, {font: '16pt Arial', fill: '#FFFFFF'})
    d.currentMaps.push(showMap)
    y += 32
  })

  if (d.pages[page - 1]) {
    d.prevPage = d.game.add.button(272, 352 + 16, 'up', function() {
      d.currentPage--
      d.mapSel.position.y = 412
      mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
    })
  }
  if (d.pages[page + 1]) {
    d.nextPage = d.game.add.button(272 + 32, 352 + 16, 'down', function() {
      d.currentPage++
      d.mapSel.position.y = 412
      mapSel({id: d.myGame.id, map: {y: d.mapSel.position.y, page: d.currentPage}})
    })
  }
}

export function getPreview(page) {
  d.preview.callAll('kill')
  let select = (d.mapSel.position.y - 412) / 32
  if (select < d.pages[page].length) preview(d.pages[page][select])
}