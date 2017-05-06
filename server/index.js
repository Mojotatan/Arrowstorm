const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const socketio = require('socket.io')

const app = express();
const server = app.listen(3000, () => {console.log('Listening on port 3000...')})
//console.log('the server', server)
const io = socketio(server)

app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'))
})

let allPlayersObj = {
	player1: null,
	player2: null,
}

io.on('connection', function(socket){
	console.log('connected new user!', socket.id)
	socket.on('newPlayer', function(){
		let socketsArr = Object.keys(io.sockets.connected)
		// assiging players their number (i.e. player1, player2) as soon as they come online
		if (allPlayersObj.player1 === null) {
			allPlayersObj.player1 = socket.id
			io.sockets.connected[socket.id].emit('assignedPlayer1', {player: socket.id})
		}
		else if (allPlayersObj.player2 === null) {
			allPlayersObj.player2 = socket.id
			io.sockets.connected[socket.id].emit('assignedPlayer2', {player: socket.id})
		}
		console.log('the players obj on connection', allPlayersObj)
		//socket.emit('allPlayers', getAllPlayers())

		socket.emit('newPlayer', socket.player)

		socket.on('disconnect', function(){
			// io.emit('remove', socket.player.id)
			console.log('the disconnected user', socket.id)
			removeSocketPlayer(socket.id)
			console.log('the playersObj on disconnect', allPlayersObj)
		})

		socket.on('playerHasMoved', function(newPos){
			socket.broadcast.emit('opponentHasMoved', newPos)
		})

		socket.on('playerHasShot', function(){
			socket.broadcast.emit('opponentHasShot', {})
		})
	})
})

function removeSocketPlayer(socketID){
	for (var key in allPlayersObj){
		if (allPlayersObj[key] === socketID) {
			allPlayersObj[key] = null
		}
	}
}

// function getAllPlayers(){
// 	var players = []
// 	Object.keys(io.sockets.connected).forEach(function(socketID){
// 		var player = io.sockets.connected[socketID].player
// 		if(player) players.push(player)
// 	})
// 	console.log('the players are *******', players)
// 	return players
// }