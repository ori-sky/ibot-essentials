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
	this.rawcmd = cmd
	this.cmd = cmd.toLowerCase()
	this.rawparams = params
	this.rawparamstring = this.rawparams.join(' ')
	this.params = params.filter(function(v) { return v !== '' })
	this.paramstring = this.params.join(' ')
}

exports.prefix = '!'

exports.config$load = function(cfg)
{
	if(cfg.prefix !== undefined) { exports.prefix = cfg.prefix }
}

exports.ibot_core$privmsg = function(privmsg)
{
	var cmd = undefined
	var index = undefined
	if(privmsg.words[0][0] === exports.prefix)
	{
		cmd = privmsg.words[0].substr(1)
		index = 1
	}

	if(cmd !== undefined)
	{
		var command = new exports.Command(cmd, privmsg.words.slice(index))
		try
		{
			exports.mods.fire('cmd', privmsg, command)
			exports.mods.fire('cmd_' + command.cmd, privmsg, command)
		}
		catch(e)
		{
			privmsg.reply('Failed to execute command `' + cmd + '` (' + e.type + ')')
			console.log(e.stack)
		}
	}
}
