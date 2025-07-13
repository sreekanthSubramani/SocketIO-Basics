import { useState, useEffect } from "react"
import socket from "../socket-client"

export default function Rooms(){

    const [room , setRoom] = useState('Cristiano')
    const [message, setMessage] = useState('')
    const [socketId, setSocketId] = useState('')
    const [messages, setMessages] = useState([])


    const roomSetter = (e)=>{
        setRoom(e.target.value)
    }

    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log(socket.id, 'Socket ID')
            setSocketId(socket.id)
        })

        return()=>{
            socket.off('connect')
        }
    },[])


    useEffect(()=>{
        socket.emit('room', room)
        setMessages([])

        return()=>{
            socket.off('room')
        }
    },[room])

    useEffect(()=>{
        socket.on('roomSpecific', ({room, message, socketId})=>{
            setMessages((prev)=>({...prev, [room] : [...(prev[room] || []), message]}))
        })
        
        return()=>{
            socket.off('roomSpecific')
        }
    
    },[])



    function sendMessage(){
        socket.emit('data', ({room, message, socketId}))
    }



    return(
            <>

            <h1>Room Specific Chatbot</h1>

            <select onChange={roomSetter} value={room}>
                <option name="Cristiano">Cristiano</option>
                <option name="Messi">Lionel Messi</option>
                <option name="Vini">Vinicius</option>
            </select>

            <h1>{room}</h1>
            <input 
            type="text" 
            placeholder="Enter Room Message" 
            onChange={(e)=> setMessage(e.target.value)}
            value={message}
            />
            <button onClick={sendMessage}>Send Message to Room</button>
            
            <ul>
            {messages[room] || [].map((msg, index)=>{
                return( 
                    <li key={index}>{msg}</li>
                )
            })}
            </ul>

        </>
    )
}