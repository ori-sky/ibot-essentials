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

var config = undefined

exports.name = 'ibot_autojoin'
exports.config$load = function(cfg)
{
	config = cfg
}

exports.ibot_core$001 = function(message)
{
	if(config !== undefined && Array.isArray(config.channels))
	{
		for(var i=0; i<config.channels.length; ++i)
		{
			exports.instance.server.send('JOIN ' + config.channels[i])
		}
	}
}
