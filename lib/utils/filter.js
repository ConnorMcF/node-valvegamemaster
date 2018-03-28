let Filter = function(filter) {
	this.filter = {
		region: filter.region || 0xFF,
		dedicated: filter.dedicated || null,
		secure: filter.secure || null,
		game: filter.game || null, /* game -> gamedir */
		map: filter.map || null,
		linux: filter.linux || null,
		password: filter.password || null,
		empty: filter.empty || null,
		full: filter.full || null,
		proxy: filter.proxy || null,
		gameid: filter.gameid || null, /* gameid -> appid */
		notgameid: filter.notgameid || null, /* notgameid -> napp */
		noplayers: filter.noplayers || null,
		whitelist: filter.whitelist || null, /* whitelist -> white */
		gametype: filter.gametype || null,
		gamedata: filter.gamedata || null,
		gamedataor: filter.gamedataor || null,
		name_match: filter.name_match || null,
		version_match: filter.version_match || null,
		collapse_addr_hash: filter.collapse_addr_hash || null,
		host: filter.host || null, /* host -> gameaddr */
		raw: filter.raw || null
	}

	this.get = async () => {
		let filter = ''

		if(this.filter.dedicated != null) {
			if(this.filter.dedicated == true) {
				filter += '\\dedicated\\1'
			} else {
				filter += '\\dedicated\\0'
			}
		}

		if(this.filter.secure != null) {
			if(this.filter.secure == true) {
				filter += '\\secure\\1'
			} else {
				filter += '\\secure\\0'
			}
		}

		if(this.filter.game != null) {
			filter += '\\gamedir\\' + this.filter.game
		}

		if(this.filter.map != null) {
			filter += '\\map\\' + this.filter.map
		}

		if(this.filter.linux != null) {
			if(this.filter.linux == true) {
				filter += '\\linux\\1'
			} else {
				filter += '\\linux\\0'
			}
		}

		if(this.filter.password != null) {
			if(this.filter.password == true) {
				filter += '\\password\\1'
			} else {
				filter += '\\password\\0'
			}
		}

		if(this.filter.empty != null) {
			if(this.filter.empty == true) {
				filter += '\\empty\\1'
			} else {
				filter += '\\empty\\0'
			}
		}

		if(this.filter.full != null) {
			if(this.filter.full == true) {
				filter += '\\full\\1'
			} else {
				filter += '\\full\\0'
			}
		}

		if(this.filter.proxy != null) {
			if(this.filter.proxy == true) {
				filter += '\\proxy\\1'
			} else {
				filter += '\\proxy\\0'
			}
		}

		if(this.filter.gameid != null) {
			filter += '\\appid\\' + this.filter.gameid
		}

		if(this.filter.notgameid != null) {
			filter += '\\napp\\' + this.filter.notgameid
		}

		if(this.filter.noplayers != null) {
			if(this.filter.noplayers == true) {
				filter += '\\noplayers\\1'
			} else {
				filter += '\\noplayers\\0'
			}
		}

		if(this.filter.whitelist != null) {
			if(this.filter.whitelist == true) {
				filter += '\\whitelist\\1'
			} else {
				filter += '\\whitelist\\0'
			}
		}

		if(this.filter.gametype != null) {
			filter += '\\gametype\\' + this.filter.gametype
		}

		if(this.filter.gamedata != null) {
			filter += '\\gamedata\\' + this.filter.gamedata
		}

		if(this.filter.gamedata != null) {
			filter += '\\gamedataor\\' + this.filter.gamedataor
		}

		if(this.filter.name_match != null) {
			filter += '\\name_match\\' + this.filter.name_match
		}

		if(this.filter.version_match != null) {
			filter += '\\version_match\\' + this.filter.version_match
		}

		if(this.filter.collapse_addr_hash != null) {
			if(this.filter.collapse_addr_hash == true) {
				filter += '\\collapse_addr_hash\\1'
			} else {
				filter += '\\collapse_addr_hash\\0'
			}
		}

		if(this.filter.host != null) {
			filter += '\\gameaddr\\' + this.filter.host
		}

		if(this.filter.raw) {
			return this.filter.raw
		}

		return filter
	}
}

module.exports = Filter