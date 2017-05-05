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

server.lastPlayerID = 0

io.on('connection', function(socket){
	console.log('connected new user!', socket.id)
	socket.on('newPlayer', function(){
		//console.log('***entering on new player')
		socket.player = {
			id: server.lastPlayerID++,
			x: 228,
			y: 200,
		}
		socket.emit('allPlayers', getAllPlayers())
		socket.broadcast.emit('newPlayer', socket.player)

		socket.on('disconnect', function(){
			io.emit('remove', socket.player.id)
		})

		socket.on('playerHasMoved', function(newPos){
			console.log('The id is************', newPos)
			socket.broadcast.emit('opponentHasMoved', newPos)
		})
	})
})

function getAllPlayers(){
	var players = []
	Object.keys(io.sockets.connected).forEach(function(socketID){
		var player = io.sockets.connected[socketID].player
		if(player) players.push(player)
	})
	console.log('the players are *******', players)
	return players
}