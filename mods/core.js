/*
 *  Copyright 2013-2015 David Farrell
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

exports.name = 'ibot_core'

exports.Privmsg = function(message, server)
{
	this.tags = message.tags
	this.prefix = message.prefix
	this.target = message.params[0]
	this.message = message.params[1]
	this.words = this.message.split(' ')

	this.server = server
	this.reply = function(message)
	{
		// TODO: make this detect non-channel targets or something
		exports.mods.call(exports.name, 'privmsg', this.target, message, this.server)
	}
}

exports.ibot$recv = function(message)
{
	switch(message.opcode)
	{
		case '001': // RPL_WELCOME
		case '002': // RPL_YOURHOST
		case '003': // RPL_CREATED
		case '004': // RPL_MYINFO
		case '005': // RPL_ISUPPORT
		case '372': // RPL_MOTD
		case '375': // RPL_MOTDSTART
		case '376': // RPL_ENDOFMOTD
		case '396': // RPL_HOSTHIDDEN
			exports.mods.fire(message.opcode, message)
			break
		case 'PING':
			exports.mods.fire('ping', message)
			break
		case 'PRIVMSG':
			exports.mods.fire('privmsg', new exports.Privmsg(message, exports.instance.server))
			break
		case 'JOIN':
			exports.mods.fire('join', message)
			break
		case 'PART':
			exports.mods.fire('part', message)
			break
		case 'QUIT':
			exports.mods.fire('quit', message)
			break
	}
}

exports.send = function(message, server) {
	var wrapped = {message: message}
	var results = exports.mods.fire('will_send', wrapped)
	if(results._a.indexOf(false) === -1) {
		server = server || exports.instance.server
		server.send(wrapped.message)
	}
}

exports.privmsg = function(target, message, server)
{
	exports.mods.call(exports.name, 'send', 'PRIVMSG ' + target + ' :' + message, server)
}
