import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'


var Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function(){
	Client.socket.emit('newPlayer')
}

Client.socket.on('newPlayer', function(data){
	//addNewPlayer(d, data.id, data.x, data.y)
	console.log('the d in newplayer', d)
	//createPlayer(d, 'fatKid', 'player1', {id: data.id, x: data.x, y: data.y})
	// d.game.add.sprite(data.x, data.y, 'roboraj')
})

//listener for obj "store"
Client.socket.on('assignedPlayer1', function(data){
	//localState.player = data.player
	d.currentPlayer = "player1"
	console.log('the local player is', localState)
})

Client.socket.on('assignedPlayer2', function(data){
	//localState.player = data.player
	d.currentPlayer = "player2"
	console.log('the local player is', localState)
})
// Client.socket.on('allPlayers', function(data){
// 	console.log('all players in client', data)
// 	for (let i = 0; i < data.length; i++){
// 		//d.playerMap.data = d.game.add.sprite(data[i].x, data[i].y, 'roboraj')
// 		addNewPlayer(d, data[i].id, data[i].x, data[i].y)
// 		//createPlayer(d, 'fatKid', 'player2', {x: 328, y: 0})
// 	}
// })

Client.socket.on('remove', function(id){
	d.playerMap[id].destroy()
	delete d.playerMap[id]
	console.log('the playerMap in remove', d.playerMap)
})

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	//console.log('the opponents position is', opponentPos)
	opponentPos(newOpponentPos)
})

export function playerMoved(player, x, y) {
	//console.log('the playermoved arguments', player, x, y)
	Client.socket.emit('playerHasMoved', {x, y})
}


export default Client
