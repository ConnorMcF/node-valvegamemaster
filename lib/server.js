const dgram = require('dgram')

const Game = require('./game')
const ChallengeResponse = require('./utils/challengeresponse')

let Server = function(opts = {}) {
	this.opts = {
		host: opts.host || 'hl2master.steampowered.com',
		port: opts.port || 27011,
		data: {}
	}

	this.data = {
		protocol: this.opts.data.protocol || 7,
		players: this.opts.data.players || 0,
		max: this.opts.data.max || 2,
		bots: this.opts.data.bots || 0,
		gamedir: this.opts.data.gamedir || 'cstrike',
		map: this.opts.data.map || 'de_dust',
		password: this.opts.data.password || false,
		os: this.opts.data.os || 'l',
		lan: this.opts.data.lan || false,
		region: this.opts.data.region || 0xFF,
		type: this.opts.data.type || 'd',
		secure: this.opts.data.secure || false,
		version: this.opts.data.version || '1.0.0.28',
		product: this.opts.data.product || 'cstrike'
	}

	let client = dgram.createSocket('udp4')

	let queue = []

	let done = false

	client.on('message', async (bytes, rinfo) => {
		console.log('RECV')
		let buffer = new Buffer(bytes)

		console.log(buffer.toString() + '\n\n')

		console.log(buffer.toString('hex', 6, 10))

		console.log(buffer.readUIntBE(6, 4))

		if(buffer.toString('hex', 0, 6) != 'ffffffff730a' || done) {
			return
		}

		done = true

		let challenge = new ChallengeResponse(this.data, buffer.readUIntBE(6, 4))

		console.log(await challenge.get())

		let reply = new Buffer(await challenge.get())

		client.send(buffer, 0, buffer.length, this.opts.port, this.opts.host, () => {
			console.log('replied')
		})

		

	})

	this.ping = async () => {
		return new Promise(async (resolve, reject) => {
			
			let buffer = new Buffer('q') // 'q'

			queue.push(['ping', resolve, reject])

			client.send(buffer, 0, buffer.length, this.opts.port, this.opts.host)

		})
	}

	this.shutdown = async () => {
		return new Promise(async (resolve, reject) => {
			
			let buffer = new Buffer('b' + 0x0a + '' + 0x00)

			queue.push(['shutdown', resolve, reject])

			client.send(buffer, 0, buffer.length, this.opts.port, this.opts.host)

		})
	}
}

require('util').inherits(Server, require('events').EventEmitter)
module.exports = Server