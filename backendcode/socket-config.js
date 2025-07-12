//global socket

let globalSockets = []

module.exports= (io)=>{

    io.on('connection', (socket)=>{

    globalSockets.push(socket.id)

    io.emit('allSockets', globalSockets)

    socket.on('disconnect', (reason)=>{
        console.log(reason)
        globalSockets = globalSockets.filter(id=> id !== socket.id)
        io.emit('allSockets', globalSockets)
    })
    })

    

}   