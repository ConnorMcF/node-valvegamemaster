let ChallengeResponse = function(data, challenge) {
	this.data = {
		protocol: data.protocol || 7,
		players: data.players || 0,
		max: data.max || 2,
		bots: data.bots || 0,
		gamedir: data.gamedir || 'cstrike',
		map: data.map || 'de_dust',
		password: data.password || false,
		os: data.os || 'l',
		lan: data.lan || false,
		region: data.region || 0xFF,
		type: data.type || 'd',
		secure: data.secure || false,
		version: data.version || '1.0.0.28',
		product: data.product || 'cstrike'
	}

	this.get = async () => {
		let data = '0\0' + 
				   '\\protocol\\' + this.data.protocol +
				   '\\challenge\\' + challenge +
				   '\\players\\' + this.data.players +
				   '\\max\\' + this.data.max +
				   '\\bots\\' + this.data.bots +
				   '\\gamedir\\' + this.data.gamedir +
				   '\\map\\' + this.data.map +
				   '\\password\\' + (this.data.password ? '1' : '0') +
				   '\\os\\' + this.data.os +
				   '\\lan\\' + this.data.lan +
				   '\\region\\' + this.data.region +
				   '\\type\\' + this.data.type +
				   '\\secure\\' + (this.data.secure ? '1' : '0') +
				   '\\version\\' + this.data.version +
				   '\\product\\' + this.data.product +
				   0x0a

		return data
	}
}

module.exports = ChallengeResponse