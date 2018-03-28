let ValveGameMaster = require('../')

let valveServer = new ValveGameMaster.Server()

valveServer.ping()

setTimeout(() => {
	valveServer.shutdown()
	console.log('shutdown')
}, 5000)