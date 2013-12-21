exports.name = 'ibot_cmd'

exports.Command = function(cmd, params)
{
    this.cmd = cmd
    this.params = params
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
        exports.__mods.fire('cmd', server, privmsg, new exports.Command(cmd, privmsg.words.slice(index)))
    }
}
