import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d from './game'
import { opponentPos } from './update/update'

var Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function(){
	Client.socket.emit('newPlayer')
}

Client.socket.on('newPlayer', function(data){
	addNewPlayer(d, data.id, data.x, data.y)
	// d.game.add.sprite(data.x, data.y, 'roboraj')
})

Client.socket.on('allPlayers', function(data){
	for (let i = 0; i < data.length; i++){
		//d.playerMap.data = d.game.add.sprite(data[i].x, data[i].y, 'roboraj')
		addNewPlayer(d, data[i].id, data[i].x, data[i].y)
	}
})

Client.socket.on('remove', function(id){
	d.playerMap[id].destroy()
	delete d.playerMap[id]
})

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	//console.log('the opponents position is', opponentPos)
	opponentPos(newOpponentPos)
})

export function playerMoved(x, y) {
	Client.socket.emit('playerHasMoved', {x, y})
}


export default Client
