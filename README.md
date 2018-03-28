# valvegamemaster

This library is incomplete.

## Usage

```
const ValveGameMaster = require('valvegamemaster')

const valveClient = new ValveGameMaster.Client()

valveClient.query({
	region: ValveGameMaster.WORLD,
	gameid: 730
})	.then((servers) => {
	console.log(servers)
})	.catch((err) => {
	console.error(err)
})
```

This will return an array of `Game` instances with the properties:

- `ip` - IP of the server
- `port` - Port of the server

This library can also pretend to be a server, although use case for this is a bit limited and the implimentation likely does not work well or at all.