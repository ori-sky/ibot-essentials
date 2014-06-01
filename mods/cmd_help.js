/*
 *  Copyright 2014 David Farrell
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

exports.name = 'ibot_cmd_help'

exports.ibot_cmd$cmd_help = function(server, privmsg, command)
{
	var topic = command.params.join('_') || 'help'
	var obj = exports.__.ibot_help.help(topic)
	var keys = Object.keys(obj)

	if(keys.length > 0) privmsg.reply(server, obj[keys[0]])
	else privmsg.reply(server, 'No help available for `' + topic + '`.')
}

exports.ibot_help$help_help = function()
{
	return 'help <topic>: Provides useful information about the specified topic.'
}
