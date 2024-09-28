import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENDPOINT_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

function App() {
  const [fact, setFact] = useState()
  const [catImageUrl, setCatImageUrl] = useState ()

  useEffect(()=>{
    fetch(CAT_ENDPOINT_FACT)
    .then(res => res.json())
    .then(factData => {
      const { fact } = factData
      setFact(fact)
      const firstWord = fact.split(" ")[0]

      fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(catData => {
        const { _id } = catData
        setCatImageUrl(`https://cataas.com/cat/${_id}/says/${firstWord}`)
      }
    )

    })
  },[])

  return (
    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact}</p>}
      {catImageUrl && <img src={catImageUrl} alt={`image from url with word ${fact}`}/>}
    </main>
  )
}

export default App
