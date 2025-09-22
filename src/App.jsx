import React from 'react'
import Chat from './components/Chat'
import FileSearch from './components/FileSearch'

export default function App(){
  return (
    <div style={{display:'flex',height:'100vh'}}>
      <div style={{width:360,borderRight:'1px solid #eee',padding:12}}>
        <h3>AI-OS</h3>
        <FileSearch />
      </div>
      <div style={{flex:1,padding:12}}>
        <Chat />
      </div>
    </div>
  )
}
