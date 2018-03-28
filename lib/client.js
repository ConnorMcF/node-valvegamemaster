const dgram = require('dgram')

const Filter = require('./utils/filter')
const Game = require('./game')
const servers = require('./servers')

let Client = function(opts = {}) {
	this.opts = {
		host: opts.host || 'hl2master.steampowered.com',
		port: opts.port || 27011
	}

	if(servers[opts]) {
		opts = servers[opts]
	}

	let client = dgram.createSocket('udp4')

	let queue = []

	client.on('message', function(bytes, rinfo) {
		let buffer = new Buffer(bytes)

		if(buffer.toString('hex', 0, 6) != 'ffffffff660a') {
			return queue[0][2](buffer)
		}

		let servers = []

		for(let i = 6; i < buffer.length; i += 6) {
			let ip = buffer.readUInt8(i) + '.' +
					 buffer.readUInt8(i + 1) + '.' +
					 buffer.readUInt8(i + 2) + '.' +
					 buffer.readUInt8(i + 3)
			let port = buffer.readUInt16BE(i + 4)

			if(ip == '0.0.0.0') { continue }
			let server = new Game(ip, port)
			servers.push(server)
		}

		return queue[0][1](servers)
	})

	this.query = async (filter) => {
		return new Promise(async (resolve, reject) => {
			filter = new Filter(filter)
			let filterdata = await filter.get()

			console.log(filterdata)

			let buffer = new Buffer('1_0.0.0.0:0\0' + filterdata + '\0')
			buffer[1] = filter.region

			console.log(buffer.toString())

			queue.push(['query', resolve, reject])

			client.send(buffer, 0, buffer.length, this.opts.port, this.opts.host)
		})
	}
}
module.exports = Client