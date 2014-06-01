/*
 *  Copyright 2013-2014 David Farrell
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

exports.name = 'ibot_cmd'

exports.Command = function(cmd, params)
{
	this.cmd = cmd
	this.params = params
	this.paramstring = this.params.join(' ')
}

exports.ibot_core$privmsg = function(server, privmsg)
{
	var cmd = undefined
	var index = undefined
	if(privmsg.words[0][0] === '!')
	{
		cmd = privmsg.words[0].substr(1)
		index = 1
	}

	if(cmd !== undefined)
	{
		var command = new exports.Command(cmd, privmsg.words.slice(index))
		try
		{
			exports.__mods.fire('cmd', server, privmsg, command)
			exports.__mods.fire('cmd_' + command.cmd, server, privmsg, command)
		}
		catch(e)
		{
			privmsg.reply(server, 'Failed to execute command `' + cmd + '` (' + e.type + ')')
			console.log(e.stack)
		}
	}
}
