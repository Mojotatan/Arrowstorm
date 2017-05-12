import d from '../game'

export const appendArrowDisplay = function(player, n) {
  let arrow = (player === 'player1') ? d[player].arrowDisplay.create((n - 1) * 24, 32, 'arrow')
  : d[player].arrowDisplay.create(1020 - ((n) * 24), 32, 'arrow')
  arrow.scale.set(4, 4)
}

export const removeArrowDisplay = function(player) {
  // let lastChild = d[player].arrowDisplay.children.length - 1
  // if (lastChild >= 0) d[player].arrowDisplay.children[lastChild].kill()
  d[player].arrowDisplay.children.pop()
}