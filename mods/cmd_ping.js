exports.name = 'ibot_cmd_ping'

exports.ibot_cmd$cmd__ping = function(server, privmsg, command)
{
    exports.__mods.modules.ibot_core.privmsg(server, privmsg.target, 'pong')
}
