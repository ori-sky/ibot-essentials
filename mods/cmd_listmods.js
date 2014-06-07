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

exports.name = 'ibot_cmd_listmods'

exports.ibot_cmd$cmd_listmods = function(server, privmsg, command)
{
    // TODO: fire a generic authentication event and check return values
    if(exports.__.ibot_master.test(privmsg.prefix.mask))
    {
        var module_names = Object.keys(exports.__mods.modules)
        privmsg.reply('Modules (' + module_names.length + '): ' + module_names.join(', '))
    }
}

exports.ibot_help$help_listmods = function()
{
	return 'listmods: Lists all loaded mods.'
}
