import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'
import fireArrow from './update/fireArrow'
import treasureChest from './update/treasureChest'

var Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function(){
	Client.socket.emit('newPlayer')
}

// Client.socket.on('newPlayer', function(data){
// 	console.log('the d in newplayer', d)
// })

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
		let newGame = new Phaser.Button(d.game, 0, 256, 'start', function() {
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

Client.point = function(id, score, point) {
	Client.socket.emit('point', {id, score, point})
}

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	opponentPos(newOpponentPos)
})

Client.socket.on('opponentHasShot', function(data){
	//console.log('the opponent has shot!!', opponentName)
	let opponentName = data.player
	let opponentShotDir = data.shotDirection
	fireArrow(d, true, opponentName, opponentShotDir)
})

Client.socket.on('opponentHasDied', function(opponent){
	d[opponent].kill()
})

Client.socket.on('opponentPickedArrow', function(arrowIdx){
	console.log('the d in pickedarrow', d.arrowsArray)
	d.arrowsArray[arrowIdx].kill()
})

Client.socket.on('opponentHitTC', function(data){
	let treasure = data.treasure
	let opponent = data.player
	d[opponent].treasure = {}
	d[opponent].treasure.payload = treasure
	console.log(' current player in client after assigning treasure', d[d.currentPlayer])
	console.log(' opponent player in client after assigning treasure', d[opponent])

	if (opponent === 'player1') {treasureChest(true, false)}
	else if (opponent === 'player2') {treasureChest(false, true)}
})

export function playerMoved(id, player, x, y, frame, scale, position, rotation) {
	//console.log('the bow in', position)
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


// Client.socket.on('allPlayers', function(data){
// 	console.log('all players in client', data)
// 	for (let i = 0; i < data.length; i++){
// 		//d.playerMap.data = d.game.add.sprite(data[i].x, data[i].y, 'roboraj')
// 		addNewPlayer(d, data[i].id, data[i].x, data[i].y)
// 		//createPlayer(d, 'fatKid', 'player2', {x: 328, y: 0})
// 	}
// })
