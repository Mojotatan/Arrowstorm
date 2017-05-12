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
	let history = {}
	let count = 0

	const clearGames = (id) => {
		allGames = allGames.filter(game => {
			if (game.player1 === id) {
				game.player1 = null
				io.in(`game ${game.id}`).emit('playerJoined', game)
			} else if (game.player2 === id) {
				game.player2 = null
				io.in(`game ${game.id}`).emit('playerJoined', game)
			}
			return (game.player1 || game.player2)
		})
	}

	io.on('connection', function(socket){
		console.log('connected new user!', socket.id)

		// logic for creating and joining games via lobby
		socket.on('newGame', function(data) {
			allGames.push({
				id: count,
				player1: socket.id,
				player2: null,
				chars: {1: 'blackMage', 2: 'fatKid'},
				map: {x: 384, y: 192},
				score: {1: 0, 2: 0},
				round: 0,
				started: false
			})
			history[count] = []
			socket.join(`game ${count}`)
			console.log('joining channel', `game ${count}`)
			socket.emit('assignedPlayer1', allGames[count])
			// console.log('count', count)
			// console.log(allGames)
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
		socket.on('requestAllGames', function() {
			allGames.forEach(game => {
				if (!game.started) socket.emit('newGame', game.id)
			})
		})
		socket.on('leaveGame', function() {
			clearGames(socket.id)
		})
		socket.on('start', function(id) {
			console.log('starting game', allGames[id])
			allGames[id].started = true
			io.in(`game ${id}`).emit('start')
		})

		// a point is scored, a round ends
		socket.on('point', function(data) {
			if (allGames[data.id].round === data.round) {
				console.log('point received and accepted')
				allGames[data.id].round++
				allGames[data.id].score = data.score
				io.in(`game ${data.id}`).emit('score', {myGame: allGames[data.id], history: history[data.id]})
			}
		})

		// configuring/syncing options in a game lobby
		socket.on('charSwap', function(data) {
			if (allGames[data.id].player1 === socket.id) {
				allGames[data.id].chars[1] = data.char
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
			} else if (allGames[data.id].player2 === socket.id) {
				allGames[data.id].chars[2] = data.char
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
			}
		})
		socket.on('mapSel', function(data) {
			allGames[data.id].map = data.map
			io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
		})

		// syncing actions in game
		socket.on('playerHasMoved', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentHasMoved', data)
			let log = Object.assign({}, data, {action: 'move'})
			log.player = allGames[data.id].player1 === socket.id ? 'player1' : 'player2'

			// push data to history
			// if the last history action is from the other player, it combines the two action states
			// to keep the replay fast
			let eot = history[data.id][history[data.id].length - 1] || []
			if (eot.length === 1 && eot[0].player !== log.player) {
				eot.push(log)
			} else {
				history[data.id].push([log])
			}
		})
		socket.on('playerHasShot', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentHasShot', data)
			let log = Object.assign({}, data, {action: 'shot'})
			log.player = allGames[data.id].player1 === socket.id ? 'player1' : 'player2'

			// push data to history
			let eot = history[data.id][history[data.id].length - 1] || []
			if (eot.length === 1 && eot[0].player !== log.player) {
				eot.push(log)
			} else {
				history[data.id].push([log])
			}
		})
		socket.on('playerHasDied', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentHasDied', data.player)
		})
		socket.on('arrowPickedUp', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentPickedArrow', data.idx)
		})
		socket.on('playerHitTC', function(data){
			socket.broadcast.to(`game ${data.id}`).emit('opponentHitTC', data)
		})

		socket.on('disconnect', function(){
			console.log('the disconnected user', socket.id)
			clearGames(socket.id)
		})

	})
})
