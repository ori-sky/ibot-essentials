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

exports.name = 'ibot_tracking'

exports.User = function(nick, user, host) {
	this.api = 1
	this.nick = nick
	this.user = user
	this.host = host
	this.channels = {}
}

exports.Channel = function(name) {
	this.api = 1
	this.name = name
	//this.users = {}
}

exports.ibot_core$join = function(msg) {
	if(exports.my.users === undefined) { exports.my.users = {} }
	if(exports.my.channels === undefined) { exports.my.channels = {} }

	var lowerNick = msg.prefix.nick.toLowerCase()
	var lowerChannel = msg.params[0].toLowerCase()
	if(exports.my.users[lowerNick] === undefined) {
		exports.my.users[lowerNick] = new exports.User(msg.prefix.nick, msg.prefix.user, msg.prefix.host)
	}
	exports.my.users[lowerNick].channels[lowerChannel] = new exports.Channel(msg.params[0])
}

exports.ibot_core$part = function(msg) {
	if(exports.my.users === undefined) { exports.my.users = {} }
	if(exports.my.channels === undefined) { exports.my.channels = {} }

	var lowerNick = msg.prefix.nick.toLowerCase()
	if(exports.my.users[lowerNick] !== undefined) {
		var lowerChannel = msg.params[0].toLowerCase()
		delete exports.my.users[lowerNick].channels[lowerChannel]
		if(Object.keys(exports.my.users[lowerNick].channels).length === 0) {
			delete exports.my.users[lowerNick]
		}
	}
}

exports.ibot_core$quit = function(msg) {
	if(exports.my.users === undefined) { exports.my.users = {} }
	if(exports.my.channels === undefined) { exports.my.channels = {} }

	var lowerNick = msg.prefix.nick.toLowerCase()
	if(exports.my.users[lowerNick] !== undefined) {
		delete exports.my.users[lowerNick]
	}
}

exports.getUser = function(nick) {
	var lowerNick = nick.toLowerCase()
	return exports.my.users[lowerNick] !== undefined
	     ? exports.my.users[lowerNick]
	     : null
}
