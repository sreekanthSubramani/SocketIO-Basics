

module.exports = (io)=>{
    io.on('connection', (socket)=>{

      socket.on('room', (room)=>{
        console.log(room, ' Joined Room')
        socket.join(room)
     })  


      socket.on('data',(obj)=>{
        const {room, message, socketId} = obj
        console.log(obj)
        
        io.to(room).emit('roomSpecific', {room, message,socketId})
      })

      

    })
}