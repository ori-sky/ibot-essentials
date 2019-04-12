/*
 *  Copyright 2019 David Farrell
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var config = undefined

exports.name = 'ibot_sasl'

exports.config$load = function(cfg) {
	config = cfg
}

exports.ibot_cap$ls = function(prefix, cap) {
	if(cap === 'sasl') {
		exports.mods.call('ibot_cap', 'wait')
		exports.mods.call('ibot_core', 'send', 'CAP REQ :sasl')
	}
}

exports.ibot_cap$ack = function(prefix, cap) {
	if(cap === 'sasl') {
		exports.mods.call('ibot_core', 'send', 'AUTHENTICATE PLAIN')
	}
}

exports.ibot_cap$nak = function(prefix, cap) {
	if(cap === 'sasl') {
		exports.mods.call('ibot_cap', 'done')
	}
}

exports.ibot_core$authenticate = function(message) {
	if(message.params[0] === '+') {
		var auth = config.username + '\0' + config.username + '\0' + config.password
		var buf = new Buffer(auth)
		exports.mods.call('ibot_core', 'send', 'AUTHENTICATE ' + buf.toString('base64'))
	}
}

exports.ibot_core$900 = function() {
	exports.mods.call('ibot_cap', 'done')
}

exports.ibot_core$904 = function() {
	exports.mods.call('ibot_cap', 'done')
}
