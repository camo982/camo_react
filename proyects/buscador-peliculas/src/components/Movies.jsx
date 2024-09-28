export function Movies({movies}){
    const hasMovies = movies?.length > 0
    if (hasMovies) {
        return(
      <div className='container-movies'>
        {
          movies.map (movie =>(
            <div key={movie.id} className='box-movie'>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt='Movie poster'/>
            </div>
          ))
        }
      </div>
        )
    } else {
        return(
        <p>No se encontraron películas para este título</p>
        )
    }
}