module.exports = function(packet) {
	Buffer.concat([
		Buffer.from([ 0x31 ]),
		Buffer.from([ region ]),
		Buffer.from(seedIp, 'ascii'),
		Buffer.from([ 0x00 ]),
		Buffer.from(formatFilters(filters), 'ascii'),
	])
}