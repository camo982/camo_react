import { useRef, useState } from 'react'
import './App.css'
import {Movies} from './components/Movies'
import { searchMovies } from './services/movies'




function App() {
  const [movies,setMovies]= useState('')
  const previewsSearch = useRef ('')

  const handleSumitMovies = async (event)=>{
    event.preventDefault()
    const {NewQueryMovie} = Object.fromEntries(new window.FormData(event.target))
    if (previewsSearch.current !== NewQueryMovie){
    searchMovies({search:NewQueryMovie}).then(setMovies)
    previewsSearch.current = NewQueryMovie
  }
       //TODO: acá se pueden hacer todas las validaciones del formulario y setear errores del formualario
  }
  console.log('render movies')
  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSumitMovies}> 
          <input type='text' name='NewQueryMovie' placeholder='Matrix, Avengers ...'/>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
