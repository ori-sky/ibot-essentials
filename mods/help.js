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

exports.name = 'ibot_help'

exports.help = function(topic)
{
	var obj = exports.__mods.fire(exports.name + '$help_' + topic)
	var keys = Object.keys(obj)

	for(var i=0; i<keys.length; ++i)
	{
		if(obj[keys[i]] === undefined) delete obj[keys[i]]
	}

	return obj
}
