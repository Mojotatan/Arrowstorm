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

	// generates a random 3 digit alphabetic key
	const generateId = () => {
		let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let a = alpha[Math.floor(Math.random() * 26)]
		let b = alpha[Math.floor(Math.random() * 26)]
		let c = alpha[Math.floor(Math.random() * 26)]
		let abc = a + b + c
		if (allGames[abc]) abc = generateId()
		else return abc
	}

	const getAllPlayers = (obj) => {
		let players = ['player1', 'player2', 'player3', 'player4']
		return players.filter(player => {
			return obj[player]
		})
	}

	const clearGames = (socket) => {
		Object.keys(allGames).forEach(game => {
			let players = getAllPlayers(allGames[game])
			console.log(players)
			players.forEach(player => {
				if (allGames[game][player] === socket.id) {
					allGames[game][player] = null
					allGames[game].alias[player.slice(-1)] = null
					socket.leave(`game ${allGames[game].id}`)
					io.in(`game ${allGames[game].id}`).emit('playerJoined', allGames[game])
				}
			})
			if (getAllPlayers(allGames[game]).length === 0) {
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
				round: 1,
				started: false,
				rng: {}
			}
			socket.join(`game ${key}`)
			console.log('joining channel', `game ${key}`)
			socket.emit('assignedToPlayer', {game: allGames[key], player: 'player1'})
			socket.broadcast.emit('newGame', allGames[key].id)
		})
		socket.on('joinGame', function(data) {
			if (allGames[data.id]) {
				let players = ['player1', 'player2', 'player3', 'player4']
				players = players.filter(player => {
					return (!allGames[data.id][player])
				})
				if (players[0]) {
					allGames[data.id][players[0]] = socket.id
					allGames[data.id].alias[players[0].slice(-1)] = data.alias || null
					socket.emit('assignedToPlayer', {game: allGames[data.id], player: players[0]})
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
				history[id] = [[]]
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
				let players = getAllPlayers(allGames[data.id])
				players.forEach(player => {
					if (history[data.id][player] < history[data.id].length - 120) dead.push(player)
				})
				io.in(`game ${data.id}`).emit('score', {myGame: allGames[data.id], history: history[data.id], dead})
			}
		})

		// configuring/syncing options in a game lobby
		socket.on('charSwap', function(data) {
			if (allGames[data.id]) {
				if (allGames[data.id].player1 === socket.id) {
					allGames[data.id].chars[1] = data.char
				} else if (allGames[data.id].player2 === socket.id) {
					allGames[data.id].chars[2] = data.char
				} else if (allGames[data.id].player3 === socket.id) {
					allGames[data.id].chars[3] = data.char
				} else if (allGames[data.id].player4 === socket.id) {
					allGames[data.id].chars[4] = data.char
				}
				io.in(`game ${data.id}`).emit('optionsUpdate', allGames[data.id])
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

				// push data to history
				// if the last history action is from the other player, it combines the two action states
				// to keep the replay fast
				let log = Object.assign({}, data, {action: 'move'})
				let eot = history[data.id].length - 1
				let dupes = history[data.id][eot].filter(entry => {return entry.player === log.player})
				if (dupes.length === 0) {
					history[data.id][eot].push(log)
				} else {
					history[data.id].push([log])
				}
			}
		})
		socket.on('playerHasShot', function(data){
			if (allGames[data.id]) {
				socket.broadcast.to(`game ${data.id}`).emit('opponentHasShot', data)

				// push data to history
				let log = Object.assign({}, data, {action: 'shot'})
				let eot = history[data.id].length - 1
				let dupes = history[data.id][eot].filter(entry => {return entry.player === log.player})
				if (dupes.length === 0) {
					history[data.id][eot].push(log)
				} else {
					history[data.id].push([log])
				}
			}
		})
		socket.on('playerHasDied', function(data){
			if (allGames[data.id]) {
				history[data.id][data.victim] = history[data.id][data.victim] || history[data.id].length

				// push data to history
				let log = Object.assign({}, data, {action: 'death'})
				let eot = history[data.id].length - 1
				let dupes = history[data.id][eot].filter(entry => {return entry.player === log.player})
				if (dupes.length === 0) {
					history[data.id][eot].push(log)
				} else {
					history[data.id].push([log])
				}
				socket.broadcast.to(`game ${data.id}`).emit('opponentHasDied', data.victim)
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
