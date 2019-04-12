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

exports.name = 'ibot_cap'

var refcount = 0

exports.ibot$connect = function() {
	exports.mods.call('ibot_core', 'send', 'CAP LS')
}

exports.ibot_core$cap = function(message) {
	var prefix = message.params[0]
	var opcode = message.params[1]
	var params = message.params.slice(2)
	switch(opcode) {
		case 'LS':
			exports.wait()
			var caps = params[0].split(' ')
			for(var i = 0; i < caps.length; ++i) {
				exports.mods.fire('ls', prefix, caps[i])
			}
			exports.done()
			break
		case 'ACK':
			var caps = params[0].split(' ')
			for(var i = 0; i < caps.length; ++i) {
				exports.mods.fire('ack', prefix, caps[i])
			}
			break
		case 'NAK':
			var caps = params[0].split(' ')
			for(var i = 0; i < caps.length; ++i) {
				exports.mods.fire('nak', prefix, caps[i])
			}
			break
	}
}

exports.wait = function() {
	++refcount
}

exports.done = function() {
	--refcount
	if(refcount <= 0) {
		exports.mods.call('ibot_core', 'send', 'CAP END')
	}
}
