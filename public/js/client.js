import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'
import fireArrow from './update/fireArrow'
import treasureChest from './update/treasureChest'
import {removeArrowDisplay} from './update/arrowDisplay'

var Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function(){
	Client.socket.emit('newPlayer')
}

// assigning player 1 to first player that logs on
Client.socket.on('assignedPlayer1', function(data){
	console.log('assigned to player1')
	d.currentPlayer = "player1"
	d.myGame = data
})

// assigning player 2 to second player that logs on
Client.socket.on('assignedPlayer2', function(data){
	console.log('assigned to player2')
	d.currentPlayer = "player2"
	d.myGame = data
})

Client.socket.on('newGame', function(data) {
	if (d.game.state.current === 'menu') {
		let newGame = new Phaser.Button(d.game, 16, 256, 'join', function() {
			Client.socket.emit('joinGame', this.id)
			d.game.state.start('newGameOptions')
		})
		newGame.id = data
		d.lobbyGames.addChild(newGame)
	}
})

Client.socket.on('playerJoined', function(data) {
	d.myGame = data
	if (d.game.state.current === 'newGameOptions') {
		if (d.myGame.player1) d.lobbyP1.text = `Player 1: ${d.myGame.player1}`
		if (d.myGame.player2) d.lobbyP2.text = `Player 2: ${d.myGame.player2}`
		if (data.player1 && data.player2) d.gameReady.text = 'ready!'
	}
})

Client.socket.on('start', function() {
	console.log('let the games begin')
	function getMap() {
		let x = (d.mapSel.x - 384) / 64
		let y = (d.mapSel.y - 192) / 64
		let select = y * 10 + x
		return (select >= d.maps.length) ? Math.floor(Math.random() * d.maps.length) : select
	}
	d.map = d.maps[getMap()]
	d.game.state.start('runGame')
})

Client.socket.on('optionsUpdate', function(data) {
	d.myGame = data
	d.mapSel.position.set(data.map.x, data.map.y)
	d.previewChar1.kill()
	d.previewChar2.kill()
	d.previewChar1 = d.game.add.image(16, 80, data.chars[1])
	d.previewChar1.frame = 2
	d.previewChar1.scale.set(4, 4)
	d.previewChar2 = d.game.add.image(144, 80, data.chars[2])
	d.previewChar2.frame = 2
	d.previewChar2.scale.set(4, 4)
})

Client.letsGo = function(id) {
	Client.socket.emit('start', id)
}

Client.chooseChar = function(data) {
	Client.socket.emit('charSwap', data)
}

Client.mapSel = function(data) {
	Client.socket.emit('mapSel', data)
}

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
