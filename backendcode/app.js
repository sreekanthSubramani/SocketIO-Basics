const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const socket = require('socket.io')
const globalSocket = require('./socket-config')
const roomSocket = require('./Socket-Types/Rooms')

app.use(cors())
const server = http.createServer(app)



const io = socket(server, {
    cors :{
        origin : "*",
        METHODS : ['GET', 'POST']
    }
})
globalSocket(io)
roomSocket(io)

const PORT = 5050
server.listen(PORT, (e)=>{
    if(!e){
        console.log(`The Server is active in ${PORT}`)
    }
})
