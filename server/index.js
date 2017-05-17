const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {Map, db} = require('./db')
const path = require('path')
const socketio = require('socket.io')

let port = process.env.PORT || 3000

const app = express();
db.sync()
.then(() => {
	const server = app.listen(port, () => {console.log('Listening on port 3000...')})
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

	let allGames = {}
	let history = {}

	const generateId = () => {
		let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let a = alpha[Math.floor(Math.random() * 26)]
		let b = alpha[Math.floor(Math.random() * 26)]
		let c = alpha[Math.floor(Math.random() * 26)]
		let abc = a + b + c
		if (allGames[abc]) abc = generateId()
		else return abc
	}

	const clearGames = (socket) => {
		Object.keys(allGames).forEach(game => {
			if (allGames[game].player1 === socket.id) {
				allGames[game].player1 = null
				allGames[game].alias[1] = null
				socket.leave(`game ${allGames[game].id}`)
				io.in(`game ${allGames[game].id}`).emit('playerJoined', allGames[game])
			} else if (allGames[game].player2 === socket.id) {
				allGames[game].player2 = null
				allGames[game].alias[2] = null
				socket.leave(`game ${allGames[game].id}`)
				io.in(`game ${allGames[game].id}`).emit('playerJoined', allGames[game])
			} else if (allGames[game].player3 === socket.id) {
				allGames[game].player3 = null
				allGames[game].alias[3] = null
				socket.leave(`game ${allGames[game].id}`)
				io.in(`game ${allGames[game].id}`).emit('playerJoined', allGames[game])
			} else if (allGames[game].player4 === socket.id) {
				allGames[game].player4 = null
				allGames[game].alias[4] = null
				socket.leave(`game ${allGames[game].id}`)
				io.in(`game ${allGames[game].id}`).emit('playerJoined', allGames[game])
			}
			if (!allGames[game].player1 && !allGames[game].player2 && !allGames[game].player3 && !allGames[game].player4) {
				delete allGames[game] // causes some issues when a game is deleted but one player in menu still sees it
			}
		})
	}

	io.on('connection', function(socket){
		console.log('connected new user!', socket.id)

		// logic for creating and joining games via lobby
		socket.on('newGame', function(alias) {
			let key = generateId()
			allGames[key] = {
				id: key,
				player1: socket.id,
				player2: null,
				player3: null,
				player4: null,
				chars: {1: 'RoboRaj', 2: 'Billy', 3: 'Black Mage', 4: 'Gale'},
				alias: {1: alias, 2: null, 3: null, 4: null},
				map: {page: 0, y: 412},
				score: {1: 0, 2: 0, 3: 0, 4: 0},
				round: 0,
				started: false
			}
			socket.join(`game ${key}`)
			console.log('joining channel', `game ${key}`)
			socket.emit('assignedToPlayer', {game: allGames[key], player: 'player1'})
			socket.broadcast.emit('newGame', allGames[key].id)
		})
		socket.on('joinGame', function(data) {
			if (allGames[data.id]) {
				if (!allGames[data.id].player1) {
					allGames[data.id].player1 = socket.id
					allGames[data.id].alias[1] = data.alias || null
					socket.emit('assignedToPlayer', {game: allGames[data.id], player: 'player1'})
					socket.join(`game ${data.id}`)
				} else if (!allGames[data.id].player2) {
					allGames[data.id].player2 = socket.id
					allGames[data.id].alias[2] = data.alias || null
					socket.emit('assignedToPlayer', {game: allGames[data.id], player: 'player2'})
					socket.join(`game ${data.id}`)
				} else if (!allGames[data.id].player3) {
					allGames[data.id].player3 = socket.id
					allGames[data.id].alias[3] = data.alias || null
					socket.emit('assignedToPlayer', {game: allGames[data.id], player: 'player3'})
					socket.join(`game ${data.id}`)
				} else if (!allGames[data.id].player4) {
					allGames[data.id].player4 = socket.id
					allGames[data.id].alias[4] = data.alias || null
					socket.emit('assignedToPlayer', {game: allGames[data.id], player: 'player4'})
					socket.join(`game ${data.id}`)
				}

				io.in(`game ${data.id}`).emit('playerJoined', allGames[data.id])
			}
		})
		socket.on('requestAllGames', function() {
			Object.keys(allGames).forEach(game => {
				if (!allGames[game].started) socket.emit('newGame', allGames[game].id)
			})
		})
		socket.on('leaveGame', function() {
			clearGames(socket)
		})
		socket.on('start', function(id) {
			if (allGames[id]) {
				console.log('starting game', allGames[id])
				allGames[id].started = true
				history[id] = []
				let rng = []
				for (let i = 0; i < 5; i++) {
					rng.push(Math.random())
				}
				io.in(`game ${id}`).emit('start', rng)
			}
		})

		// a point is scored, a round ends
		socket.on('point', function(data) {
			if (allGames[data.id] && allGames[data.id].round === data.round) {
				console.log('point received and accepted')
				allGames[data.id].round++
				allGames[data.id].score = data.score
				let dead = []
				if (history[data.id]['player1'] < history[data.id].length - 120) dead.push('player1')
				if (history[data.id]['player2'] < history[data.id].length - 120) dead.push('player2')
				if (history[data.id]['player3'] < history[data.id].length - 120) dead.push('player3')
				if (history[data.id]['player4'] < history[data.id].length - 120) dead.push('player4')
				io.in(`game ${data.id}`).emit('score', {myGame: allGames[data.id], history: history[data.id], dead})
			}
		})

		// configuring/syncing options in a game lobby
		socket.on('charSwap', function(data) {
			if (allGames[data.id]) {
				if (allGames[data.id].player1 === socket.id) {
					allGames[data.id].chars[1] = data.char
					io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
				} else if (allGames[data.id].player2 === socket.id) {
					allGames[data.id].chars[2] = data.char
					io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
				} else if (allGames[data.id].player3 === socket.id) {
					allGames[data.id].chars[3] = data.char
					io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
				} else if (allGames[data.id].player4 === socket.id) {
					allGames[data.id].chars[4] = data.char
					io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
				}
			}
		})
		socket.on('mapSel', function(data) {
			if (allGames[data.id]) {
				allGames[data.id].map = data.map
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
			}
		})

		// syncing actions in game
		socket.on('playerHasMoved', function(data){
			if (allGames[data.id]) {
				socket.broadcast.to(`game ${data.id}`).emit('opponentHasMoved', data)
				let log = Object.assign({}, data, {action: 'move'})
				if (allGames[data.id].player1 === socket.id) log.player = 'player1'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player2'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player3'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player4'

				// push data to history
				// if the last history action is from the other player, it combines the two action states
				// to keep the replay fast
				let eot = history[data.id][history[data.id].length - 1] || []
				let dupes = eot.filter(entry => {return entry.player === log.player})
				if (eot.length === 1 && dupes.length === 0) {
					eot.push(log)
				} else {
					history[data.id].push([log])
				}
			}
		})
		socket.on('playerHasShot', function(data){
			if (allGames[data.id]) {
				socket.broadcast.to(`game ${data.id}`).emit('opponentHasShot', data)
				let log = Object.assign({}, data, {action: 'shot'})
				if (allGames[data.id].player1 === socket.id) log.player = 'player1'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player2'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player3'
				else if (allGames[data.id].player1 === socket.id) log.player = 'player4'

				// push data to history
				let eot = history[data.id][history[data.id].length - 1] || []
				let dupes = eot.filter(entry => {return entry.player === log.player})
				if (eot.length === 1 && dupes.length === 0) {
					eot.push(log)
				} else {
					history[data.id].push([log])
				}
			}
		})
		socket.on('playerHasDied', function(data){
			if (allGames[data.id]) {
				history[data.id][data.player] = history[data.id][data.player] || history[data.id].length
				socket.broadcast.to(`game ${data.id}`).emit('opponentHasDied', data.player)
			}
		})
		socket.on('arrowPickedUp', function(data){
			if (allGames[data.id]) socket.broadcast.to(`game ${data.id}`).emit('opponentPickedArrow', data.idx)
		})
		socket.on('playerHitTC', function(data){
			if (allGames[data.id]) socket.broadcast.to(`game ${data.id}`).emit('opponentHitTC', data)
		})

		socket.on('disconnect', function(){
			console.log('the disconnected user', socket.id)
			clearGames(socket)
		})

	})
})
