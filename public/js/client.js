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

// assigning player 1 to first player that logs on
Client.socket.on('assignedPlayer1', function(data){
	console.log('assigned to player1')
	d.currentPlayer = "player1"
	d.myGame = data
	if (d.youAre) {
		d.message.text = 'You are: '
		d.youAre.text = 'PLAYER 1'
		d.youAre.fill = '#0000FF'
	}
})

// assigning player 2 to second player that logs on
Client.socket.on('assignedPlayer2', function(data){
	console.log('assigned to player2')
	d.currentPlayer = "player2"
	d.myGame = data
	if (d.youAre) {
		d.message.text = 'You are: '
		d.youAre.text = 'PLAYER 2'
		d.youAre.fill = '#FF0000'
	}
})

Client.socket.on('newGame', function(data) {
	function loadNewGames(data) {
		let newGame = new Phaser.Button(d.game, 144, 256 + d.openGames * 48, 'join', function() {
			Client.socket.emit('joinGame', {id: this.id, alias: d.nameInput.value})
			d.game.state.start('newGameOptions')
		})
		newGame.scale.set(1.5, 1.5)
		newGame.id = data
		let newText = new Phaser.Text(d.game, 32, 256 + d.openGames * 48 - 2, `${data}`, {fontSize: 48})
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
	if (data.player1) p1 = data.alias[1] || 'JOINED'
	let p2 = ''
	if (data.player2) p2 = data.alias[2] || 'JOINED'
	let id = data.id
	if (d.game.state.current === 'newGameOptions') {
		d.lobbyP1.text = `Player 1: ${p1}`
		d.lobbyP2.text = `Player 2: ${p2}`
		d.lobbyId.text = `Game ID: ${id}`
		d.preview1.text = data.alias[1] || 'Player 1'
		d.preview2.text = data.alias[2] || 'Player 2'
		d.gameReady.text = (data.player1 && data.player2) ? 'ready!' : ''
	}
})

Client.socket.on('start', function(rng) {
	console.log('let the games begin')
	function getMap() {
		let select = (d.mapSel.y - 412) / 32
		return (select >= d.pages[d.currentPage].length) ? Math.floor(rng * d.pages[d.currentPage].length) : select
	}
	d.map = d.maps[getMap()]
	d.game.state.start('runGame')
})

Client.socket.on('optionsUpdate', function(data) {
	d.myGame = data
	d.currentPage = data.map.page
	renderMaps(d.currentPage)
	d.mapSel.position.y = data.map.y
	getPreview(d.currentPage)
	d.previewChar1.kill()
	d.previewChar2.kill()
	d.previewChar1 = d.game.add.image(528, 296, data.chars[1])
	d.previewChar1.frame = 2
	d.previewChar1.scale.set(6, 6)
	d.preview1Char.text = data.chars[1]
	d.previewChar2 = d.game.add.image(720, 296, data.chars[2])
	d.previewChar2.frame = 2
	d.previewChar2.scale.set(6, 6)
	d.preview2Char.text = data.chars[2]
})

Client.socket.on('score', function(data) {
	// d.game.state.start('gameOver')
	d.history = data.history
	d.game.time.events.add(1000, function() {
		d.game.lockRender = true
	})
	d.game.time.events.add(2000, function() {
		d.game.state.start('killCam')
	})
	d.myGame = data.myGame
})

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	opponentPos(newOpponentPos)
})

Client.socket.on('opponentHasShot', function(data){
	let opponentName = data.player
	removeArrowDisplay(opponentName)
	let opponentShotDir = data.shotDirection
	fireArrow(d, true, opponentName, opponentShotDir)
})

Client.socket.on('opponentHasDied', function(opponent){
	d[opponent].kill()
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
	Client.socket.emit('playerHasMoved', {id, x, y, frame, scale, position, rotation})
}

export function arrowShot(id, playerName, shotDirection) {
	Client.socket.emit('playerHasShot', {id, player: playerName, shotDirection})
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
