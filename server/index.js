const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {Map, db} = require('./db')
const path = require('path')
const socketio = require('socket.io')

const app = express();
db.sync()
.then(() => {
	const server = app.listen(3000, () => {console.log('Listening on port 3000...')})
	//console.log('the server', server)
	const io = socketio(server)

	app.use(morgan('tiny'))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))

	app.use(express.static('public'))

	app.get('/maps', (req, res, next) => {
		console.log('request received')
		Map.findAll()
		.then(maps => {
			res.json(maps.map(map => map.json))
		})
		.catch(err => {
			console.log('error!', err)
		})
	})
	app.post('/maps', (req, res, next) => {
		console.log('new map received')
		Map.create(req.body)
		.then(() => {
			res.send('success')
		})
		.catch(err => {
			console.log('error!', err)
		})
	})

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'))
	})

	let allGames = []
	let count = 0

	io.on('connection', function(socket){
		console.log('connected new user!', socket.id)

		// logic for creating and joining games via lobby
		socket.on('newGame', function(data) {
			console.log('new game bby')
			allGames.push({id: count, player1: socket.id, player2: null, chars: {1: 'blackMage', 2: 'fatKid'}, map: 'default.json'})
			socket.join(`game ${count}`)
			console.log('Gaimes', allGames)
			console.log('joining channel', `game ${count}`)
			socket.emit('assignedPlayer1', allGames[count])
			socket.broadcast.emit('newGame', allGames[count].id)
			count++
		})
		socket.on('joinGame', function(id) {
			if (!allGames[id].player1) {
				allGames[id].player1 = socket.id
				socket.emit('assignedPlayer1', allGames[id])
				socket.join(`game ${id}`)
			} else if (!allGames[id].player2) {
				allGames[id].player2 = socket.id
				socket.emit('assignedPlayer2', allGames[id])
				socket.join(`game ${id}`)
			}
			io.in(`game ${id}`).emit('playerJoined', allGames[id])
		})
		socket.on('start', function(id) {
			console.log('let the games begin')
			console.log('starting game', `game ${id}`)
			io.in(`game ${id}`).emit('start')
		})

		socket.on('charSwap', function(data) {
			if (allGames[data.id].player1 === socket.id) {
				allGames[data.id].chars[1] = data.char
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
			} else if (allGames[data.id].player2 === socket.id) {
				allGames[data.id].chars[2] = data.char
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
			}
		})

		socket.on('disconnect', function(){
			// io.emit('remove', socket.player.id)
			console.log('the disconnected user', socket.id)
		})

		socket.on('playerHasMoved', function(newPos){
			socket.broadcast.to(`game ${newPos.id}`).emit('opponentHasMoved', newPos)
		})

		socket.on('playerHasShot', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentHasShot', {})
		})

	})

})