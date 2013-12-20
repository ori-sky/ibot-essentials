exports.name = 'ibot_pong'
exports.ibot$recv = function(server, message)
{
    if(message.opcode === 'PING')
    {
        server.send('PONG :' + message.params[0])
    }
}
