import d from '../game'

export const appendArrowDisplay = function(player, n) {
  let x = (player === 'player1' || player === 'player3') ? (n - 1) * 24 : 1020 - (n * 24)
  let y = (player === 'player1' || player === 'player2') ? 32 : 32 + 320
  let arrow = d[player].arrowDisplay.create(x, y, 'arrow')
  arrow.scale.set(4, 4)
}

export const removeArrowDisplay = function(player) {
  // let lastChild = d[player].arrowDisplay.children.length - 1
  // if (lastChild >= 0) d[player].arrowDisplay.children[lastChild].kill()
  d[player].arrowDisplay.children.pop()
}