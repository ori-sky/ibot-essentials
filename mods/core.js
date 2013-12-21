exports.name = 'ibot_core'

exports.Privmsg = function(message)
{
    this.tags = message.tags
    this.prefix = message.prefix
    this.target = message.params[0]
    this.message = message.params[1]
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
