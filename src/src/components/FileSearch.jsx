import React, {useState} from 'react'
import axios from 'axios'

export default function FileSearch(){
  const [query,setQuery] = useState('')
  const [results,setResults] = useState([])
  const search = async ()=>{
    try{
      const res = await axios.get(`http://127.0.0.1:8080/search?query=${encodeURIComponent(query)}`)
      setResults(res.data.results)
    }catch(e){
      setResults([{path:'Error: model server not reachable'}])
    }
  }
  return (
    <div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search files (home dir)" />
      <button onClick={search}>Search</button>
      <div style={{marginTop:8}}>
        {results.map((r,i)=>(<div key={i} style={{padding:6,borderBottom:'1px solid #f0f0f0'}}>{r.path} <div style={{fontSize:12,color:'#666'}}>{r.preview||''}</div></div>))}
      </div>
    </div>
  )
}
