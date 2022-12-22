const webSocket = require('ws');
const server = new webSocket.Server({
    port : 8080,
})


server.on('connection', (socket) => {
    socket.on('message', (message) => {
        server.clients.forEach(async(client) => {
            
                const playerData = message.toString('utf-8');
                if(client !== socket && client.readyState != client.CLOSED) {
                    client.send(playerData);
                }
        })
    })
})