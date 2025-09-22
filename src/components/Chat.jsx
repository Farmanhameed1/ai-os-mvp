import React, {useState} from 'react'
import axios from 'axios'

export default function Chat(){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const send = async ()=>{
    if(!text.trim()) return
    const userMsg = {role:'user',content:text}
    setMessages(prev=>[...prev,userMsg])
    setText('')
    try{
      const res = await axios.post('http://127.0.0.1:8080/generate',{prompt:text})
      const ai = {role:'assistant',content:res.data.text}
      setMessages(prev=>[...prev,ai])
    }catch(e){
      const ai = {role:'assistant',content:'Error: could not reach model server.'}
      setMessages(prev=>[...prev,ai])
    }
  }
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{flex:1,overflow:'auto',padding:8}}>
        {messages.map((m,i)=>(<div key={i} style={{margin:6}}><b>{m.role}:</b> {m.content}</div>))}
      </div>
      <div style={{display:'flex'}}>
        <input value={text} onChange={e=>setText(e.target.value)} style={{flex:1,padding:8}} />
        <button onClick={send} style={{padding:8}}>Send</button>
      </div>
    </div>
  )
}
