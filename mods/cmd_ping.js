exports.name = 'ibot_cmd_ping'

exports.ibot_cmd$cmd__ping = function(server, privmsg, command)
{
    exports.__.ibot_core.privmsg(server, privmsg.target, 'pong')
}
