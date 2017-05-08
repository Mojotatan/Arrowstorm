import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'
import fireArrow from './update/fireArrow'

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
	d.game.state.start('runGame')
})

Client.letsGo = function(id) {
	// this is supposed to remove games that launch but it isn't working rn so whatevs
	// d.lobbyGames.children.forEach((child, index) => {
	// 	if (child.id === id) {
	// 		d.lobbyGames.removeChild(index)
	// 	}
	// })
	Client.socket.emit('start', id)
}

// Client.socket.on('remove', function(id){
// 	d.playerMap[id].destroy()
// 	delete d.playerMap[id]
// 	console.log('the playerMap in remove', d.playerMap)
// })

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	opponentPos(newOpponentPos)
})

Client.socket.on('opponentHasShot', function(opponentName){
	//console.log('the opponent has shot!!', opponentName)
	fireArrow(d, true, opponentName)
})

// Client.socket.on('opponentAimRight', function(aimRight){
// 	d.aimRight.isDown = true
// })

// Client.socket.on('opponentAimUp', function(aimUp){
// 	d.aimUp.isDown = true
// })

// Client.socket.on('opponentAimLeft', function(aimLeft){
// 	d.aimLeft.isDown = true
// })

// Client.socket.on('opponentAimDown', function(aimDown){
// 	d.aimDown.isDown = true
// })

export function playerMoved(id, player, x, y, frame, scale, position, rotation) {
	//console.log('the bow in', position)
	Client.socket.emit('playerHasMoved', {id, x, y, frame, scale, position, rotation})
}

export function arrowShot(id, playerName) {
	Client.socket.emit('playerHasShot', {id, player: playerName})
}

export function onAimRight(aimRight) {
	Client.socket.emit('playerAimIsRight', {aimRight})
}

export function onAimUp(aimUp) {
	Client.socket.emit('playerAimIsUp', {aimUp})
}

export function onAimLeft(aimLeft) {
	Client.socket.emit('playerAimIsLeft', {aimLeft})
}

export function onAimDown(aimDown) {
	Client.socket.emit('playerAimIsDown', {aimDown})
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
