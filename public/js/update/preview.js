import d from '../game'

export function preview(map) {
  d.preview = d.game.add.group()
  console.log(map)

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
  d.mapSel.position.y = 400

  let y = 320 + 32 + 48 //400
  d.currentMaps.forEach(map => {
    map.kill()
  })
  d.currentMaps = []

  d.pages[page].forEach((map, index) => {
    let showMap = d.game.add.text(16, y, map.name, {fontSize: 16, fill: '#FFFFFF'})
    d.currentMaps.push(showMap)
    y += 32
  })

  if (d.pages[page - 1]) {
    d.prevPage = d.game.add.button(256, 352, 'go', function() {
      d.currentPage--
      renderMaps(d.currentPage)
    })
  }
  if (d.pages[page + 1]) {
    d.nextPage = d.game.add.button(256 + 64, 352, 'go', function() {
      d.currentPage++
      renderMaps(d.currentPage)
    })
  }
}

export function getPreview(page) {
  d.preview.callAll('kill')
  let select = (d.mapSel.y - 400) / 32
  if (select < d.pages[page].length) preview(d.pages[page][select])
}