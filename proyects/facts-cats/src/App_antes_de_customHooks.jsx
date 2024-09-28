import { useEffect, useState } from 'react'
import './App.css'
import { getFact } from './services/facts'
import { getCatImages } from './services/catImages'
//const CAT_ENDPOINT_IMAGE = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

function App() {
  const [fact, setFact] = useState()
  const [catImageUrl, setCatImageUrl] = useState ()

   useEffect(()=>{
    getFact().then(setFact)
      },[])
            
      useEffect(()=>{
        if (!fact) return
        getCatImages({fact}).then(setCatImageUrl)
    },[fact]) 
  
    const handleClick = async () =>{
      getFact().then(setFact)
    }

  return (
      <main>
      <h1>Aplicación de gatos</h1>
      <button onClick={handleClick}>get new Fact</button>
      {fact && <p>{fact}</p>}
      {catImageUrl && <img src={catImageUrl} alt={`image from url with word ${fact}`}/>}
    </main>
  )
}

export default App
