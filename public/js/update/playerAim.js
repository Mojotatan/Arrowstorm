import d from '../game'

export default function playerAim(currPlayer) {
    d.aimLeft = d.game.input.keyboard.addKey(Phaser.Keyboard.A)
    d.aimLeft.onDown.add(() => {
        d[currPlayer].shotDirection.left = true
    })
    d.aimLeft.onUp.add(() => {
        d[currPlayer].shotDirection.left = false
    })

    d.aimUp = d.game.input.keyboard.addKey(Phaser.Keyboard.W)
    d.aimUp.onDown.add(() => {
        d[currPlayer].shotDirection.up = true
    })
    d.aimUp.onUp.add(() => {
        d[currPlayer].shotDirection.up = false
    })

    d.aimRight = d.game.input.keyboard.addKey(Phaser.Keyboard.D)
    d.aimRight.onDown.add(() => {
        d[currPlayer].shotDirection.right = true
    })
    d.aimRight.onUp.add(() => {
        d[currPlayer].shotDirection.right = false
    })

    d.aimDown = d.game.input.keyboard.addKey(Phaser.Keyboard.S)
    d.aimDown.onDown.add(() => {
        d[currPlayer].shotDirection.down = true
    })
    d.aimDown.onUp.add(() => {
        d[currPlayer].shotDirection.down = false
    })
}