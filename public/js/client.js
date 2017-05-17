import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'
import fireArrow from './update/fireArrow'
import treasureChest from './update/treasureChest'
import {removeArrowDisplay} from './update/arrowDisplay'
import {renderMaps, getPreview} from './update/preview'

var Client = {}
Client.socket = io.connect()

Client.socket.on('assignedToPlayer', function(data){
	console.log('assigned to', data.player)
	d.currentPlayer = data.player
	d.myGame = data.game
})

Client.socket.on('newGame', function(data) {
	function loadNewGames(data) {
		let newGame = d.game.add.button(188, 256 + d.openGames * 48, 'join', function() {
			Client.socket.emit('joinGame', {id: this.id, alias: d.nameInput.value})
			d.game.state.start('newGameOptions')
		}, this)
		newGame.scale.set(1, 1)
		newGame.id = data
		// let joinBtnStyle = {font: 'bold 14pt Arial', fill: '#000000'}
		// let joinBtnText = d.game.add.text(4, 1, '', joinBtnStyle)
		// newGame.addChild(joinBtnText)
		let newText = new Phaser.Text(d.game, 105, 256 + d.openGames * 48, `${data}`, {fontSize: 30})
		d.lobbyGames.addChild(newGame)
		d.lobbyGames.addChild(newText)
		d.openGames++
	}

	if (d.game.state.current === 'menu') {
		loadNewGames(data)
	}
})

Client.socket.on('playerJoined', function(data) {
	d.myGame = data
	let p1 = ''
	let p2 = ''
	let p3 = ''
	let p4 = ''
	let id = data.id
	if (d.game.state.current === 'newGameOptions') {
		if (data.player1) {
			d.preview1.text = data.alias[1] || 'Player 1'
			d.previewChar1.visible = true
			d.preview1Char.text = data.chars[1]
		}
		else {
			d.preview1.text = p1
			d.previewChar1.visible = false
			d.preview1Char.text = p1
		}
		if (data.player2) {
			d.preview2.text = data.alias[2] || 'Player 2'
			d.previewChar2.visible = true
			d.preview2Char.text = data.chars[2]
		}
		else {
			d.preview2.text = p2
			d.previewChar2.visible = false
			d.preview2Char.text = p2
		}
		if (data.player3) {
			d.preview3.text = data.alias[3] || 'Player 3'
			d.previewChar3.visible = true
			d.preview3Char.text = data.chars[3]
		}
		else {
			d.preview3.text = p3
			d.previewChar3.visible = false
			d.preview3Char.text = p3
		}
		if (data.player4) {
			d.preview4.text = data.alias[4] || 'Player 4'
			d.previewChar4.visible = true
			d.preview4Char.text = data.chars[4]
		}
		else {
			d.preview4.text = p4
			d.previewChar4.visible = false
			d.preview4Char.text = p4
		}
	}
})

Client.socket.on('start', function(rng) {
	console.log('let the games begin')
	d.rng = rng
	function getMap() {
		let select = (d.mapSel.y - 412) / 32
		return (select >= d.pages[d.currentPage].length) ? Math.floor(d.rng.pop() * d.maps.length) : select + d.currentPage * 7
	}
	d.map = d.maps[getMap()]
	d.game.state.start('runGame')
})

Client.socket.on('optionsUpdate', function(data) {
	d.myGame = data
	d.currentPage = data.map.page
	d.pages = d.pages || {}
	renderMaps(d.currentPage)
	d.mapSel.position.y = data.map.y
	getPreview(d.currentPage)
	let xy1 = d.previewChar1.position || {x: 352 + 168 * 0, y: 96 + 208 - 128}
	let xy2 = d.previewChar2.position || {x: 352 + 168 * 1, y: 96 + 208 - 128}
	let xy3 = d.previewChar3.position || {x: 352 + 168 * 2, y: 96 + 208 - 128}
	let xy4 = d.previewChar4.position || {x: 352 + 168 * 3, y: 96 + 208 - 128}
	d.previewChar1.kill()
	d.previewChar2.kill()
	d.previewChar3.kill()
	d.previewChar4.kill()
	if (data.player1) {
		d.previewChar1 = d.game.add.image(xy1.x, xy1.y, data.chars[1])
		d.previewChar1.frame = 2
		d.previewChar1.scale.set(8, 8)
		d.preview1Char.text = data.chars[1]
	}
	if (data.player2) {
		d.previewChar2 = d.game.add.image(xy2.x, xy2.y, data.chars[2])
		d.previewChar2.frame = 2
		d.previewChar2.scale.set(8, 8)
		d.preview2Char.text = data.chars[2]
	}
	if (data.player3) {
		d.previewChar3 = d.game.add.image(xy3.x, xy3.y, data.chars[3])
		d.previewChar3.frame = 2
		d.previewChar3.scale.set(8, 8)
		d.preview3Char.text = data.chars[3]
	}
	if (data.player4) {
		d.previewChar4 = d.game.add.image(xy4.x, xy4.y, data.chars[4])
		d.previewChar4.frame = 2
		d.previewChar4.scale.set(8, 8)
		d.preview4Char.text = data.chars[4]
	}
})

Client.socket.on('score', function(data) {
	// d.game.state.start('gameOver')
	d.dead = data.dead
	d.history = data.history
	d.game.time.events.add(1000, function() {
		d.game.lockRender = true
	})
	d.game.time.events.add(2000, function() {
		d.game.state.start('killCam')
	})
	d.myGame = data.myGame
})

Client.socket.on('opponentHasMoved', function(data){
	opponentPos(data)
})

Client.socket.on('opponentHasShot', function(data){
	let opponentName = data.player
	removeArrowDisplay(opponentName)
	let opponentShotDir = data.shotDirection
	fireArrow(d, true, opponentName, opponentShotDir)
})

Client.socket.on('opponentHasDied', function(opponent){
	d[opponent].kill()
	let blood = d.game.add.sprite(d[opponent].x, d[opponent].y, 'blood')
	blood.animations.add('death', [0, 1, 2, 3, 4, 5], 20, false)
	blood.scale.set(2, 2)
	blood.anchor.x = .5
	blood.animations.play('death')
	blood.animations.currentAnim.killOnComplete = true
})

Client.socket.on('opponentPickedArrow', function(arrowIdx){
	d.arrowsArray[arrowIdx].kill()
})

Client.socket.on('opponentHitTC', function(data){
	let treasure = data.treasure
	let opponent = data.player
	d[opponent].treasure = {}
	d[opponent].treasure.payload = treasure

	if (opponent === 'player1') {treasureChest(true, false)}
	else if (opponent === 'player2') {treasureChest(false, true)}
	else if (opponent === 'player3') {treasureChest(false, false, true)}
	else if (opponent === 'player4') {treasureChest(false, false, false, true)}
})

//utility functions that invoke client
export function letsGo(id) {
	Client.socket.emit('start', id)
}

export function chooseChar(data) {
	Client.socket.emit('charSwap', data)
}

export function mapSel(data) {
	Client.socket.emit('mapSel', data)
}

export function getGames() {
	Client.socket.emit('requestAllGames')
}

export function newGame() {
	Client.socket.emit('newGame', d.nameInput.value)
}

export function leaveGame() {
	Client.socket.emit('leaveGame')
}

export function point(id, round, score) {
	Client.socket.emit('point', {id, round, score})
}

export function playerMoved(id, player, x, y, frame, scale, position, rotation) {
	Client.socket.emit('playerHasMoved', {id, player, x, y, frame, scale, position, rotation})
}

export function arrowShot(id, player, shotDirection) {
	Client.socket.emit('playerHasShot', {id, player, shotDirection})
}

export function playerDead(id, player) {
	Client.socket.emit('playerHasDied', {id, player})
}

export function arrowIsDead(id, idx) {
	Client.socket.emit('arrowPickedUp', {id, idx})
}

export function hitTC(id, treasure, player) {
	Client.socket.emit('playerHitTC', {id, treasure, player})
}

export default Client
