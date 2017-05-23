import d from '../game'

export default function movement() {
  let currPlayer = d.currentPlayer

  // initializing cursors
  let cursors = d.game.input.keyboard.createCursorKeys()

  // moving left
  if (cursors.left.isDown && !d[currPlayer].forceJump) {
    d[currPlayer].body.velocity.x += d[currPlayer].body.touching.down ? -300 : -150
    if (d[currPlayer].jump === 'right' && d[currPlayer].body.velocity.x < 150) d[currPlayer].body.velocity.x = 150

    if (d[currPlayer].scale.x < 0) d[currPlayer].scale.x *= -1

    d[currPlayer].animations.play('walk')

  }
  // moving right
  else if (cursors.right.isDown && !d[currPlayer].forceJump) {
    d[currPlayer].body.velocity.x += d[currPlayer].body.touching.down ? 300 : 150
    if (d[currPlayer].jump === 'left' && d[currPlayer].body.velocity.x > -150) d[currPlayer].body.velocity.x = -150

    if (d[currPlayer].scale.x > 0) d[currPlayer].scale.x *= -1

    d[currPlayer].animations.play('walk')
  }
  else {
    d[currPlayer].animations.stop()
    d[currPlayer].frame = 2
  }

  // jumping
  if (cursors.up.isDown && d[currPlayer].body.touching.down && d.amIGrounded) {
    d[currPlayer].body.velocity.y = -600
  }
  else if (cursors.up.isDown && !d[currPlayer].jump && (d[currPlayer].body.touching.right || d[currPlayer].body.touching.left) && d.amIGrounded) {
    d[currPlayer].body.velocity.y = -600
    let dir = d[currPlayer].body.touching.right ? -1 : 1
    d[currPlayer].body.velocity.x = 300 * dir
    d[currPlayer].scale.x *= -1
    d[currPlayer].forceJump = true
    d[currPlayer].jump = d[currPlayer].body.touching.right ? 'left' : 'right'
  }

  // flying with wings
  if (cursors.up.isDown && d[currPlayer].treasure.payload === 'wings' && d[currPlayer].wings === true) {
    d[currPlayer].body.velocity.y = -300
  }
}