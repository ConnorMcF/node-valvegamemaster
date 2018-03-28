let ValveGameMaster = require('../')

let valveClient = new ValveGameMaster.Client()

console.log(valveClient)

valveClient.query({
	region: ValveGameMaster.WORLD,
	gameid: 730
})	.then((servers) => {
	console.log(servers)
})	.catch((err) => {
	console.error(err)
})