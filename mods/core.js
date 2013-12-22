/*
 *  Copyright 2013 David Farrell
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

exports.Privmsg = function(message)
{
    this.tags = message.tags
    this.prefix = message.prefix
    this.target = message.params[0]
    this.message = message.params[1]
    this.words = this.message.split(' ')
}

exports.ibot$recv = function(server, message)
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
            exports.__mods.fire(message.opcode, server, message)
            break
        case 'PRIVMSG':
            exports.__mods.fire('privmsg', server, new exports.Privmsg(message))
            break
    }
}

exports.privmsg = function(server, target, message)
{
    server.send('PRIVMSG ' + target + ' :' + message)
}
