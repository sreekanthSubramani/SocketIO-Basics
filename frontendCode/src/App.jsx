import socket from './socket-client'
import './App.css'
import { useEffect, useState } from 'react'


function App() {

  const [globalsocketID, setGlobalSocketIds] = useState([])
  
  
  useEffect(()=>{
      socket.on('connect', ()=>{
        console.log(socket.id)
      })

      socket.on('allSockets', (d)=>{
          console.log(d, 'All Sockets')
          setGlobalSocketIds(d)
      })

      return()=>{
        socket.off('connect')
      }
  })

  console.log(globalsocketID, 'global sockets')


  return (
    <>
      <h1>Socket IO Test</h1>
      <p>All Socket ID's</p>
      <ul>
      {globalsocketID.map((ids, index)=>{
        return(
            <li key={index}>{ids}</li>
        )
      })}
      </ul>
    </>
  )
}

export default App
