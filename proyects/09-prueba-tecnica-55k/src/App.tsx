
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User, SortBy } from './types'

function App() {

  const initialUsers = useRef([])
  const [users,setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  //const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry,setFilterCountry] = useState('')
  const [sortBy, setSortBy] = useState<SortBy> (SortBy.NONE)
  const [isLoading, setIsloading] = useState(false)
  const [error,setError] = useState(false)
  const [page,setPage]= useState(1)

  useEffect(()=>{
    setIsloading(true)
    setError(false)
    fetch(`https://randomuser.me/api/?results=10&seed=Camo&page=${page}`)
      .then((res)=>{
        if (!res.ok){
          setError(true)
          throw new Error('Error llamando usuarios');
        }
        return res.json();
      }).then((res)=>{
        setUsers(prevUser=>prevUser.concat(res.results))
        if (initialUsers.current.length !> 0 ){
          initialUsers.current=res.results
        }
        
      })
      .catch(err =>{
        setError(true)
        console.error(err)
      })
      .finally(()=>{
        setIsloading(false)
      })
  },[page])

const toggleColor= ()=>{
  setColorRows(!colorRows)
}

const toggleOrderByCountry = () =>{
  //setSortByCountry(prevState => !prevState)
  setSortBy( prevState => (prevState !== SortBy.COUNTRY)? SortBy.COUNTRY : SortBy.NONE)
}

const resetUsersList = () => {
  setPage(1)
  setUsers(initialUsers.current)
}

const handleDeleteUser = (userUuid:string)=>{
  const filteredUsers = users.filter(user=>user.login.uuid !== userUuid)
  setUsers(filteredUsers)
}


const handleCountryEntry = (event: React.ChangeEvent<HTMLInputElement>)=>{
  setFilterCountry(event.target.value)
}


const filteredUsers = (filterCountry !== null && filterCountry !=='')? 
                      users.filter(user=>user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
                      : users

//const sortedUsers = [...filteredUsers].sort((a,b) => a.location.country.localeCompare(b.location.country))

const hangleChangeSort = (sort:SortBy) =>{
  setSortBy(sort)
}
const sortedUsers = (filteredUsers:User[])=>{
  switch (sortBy){
    case SortBy.NONE: 
      return filteredUsers
    case SortBy.COUNTRY:
      console.log('sourtedByCountry')
      return [...filteredUsers].sort((a,b) => a.location.country.localeCompare(b.location.country))
    case SortBy.FIRST:
      return [...filteredUsers].sort((a,b) => a.name.first.localeCompare(b.name.first))
    case SortBy.LAST:
      return [...filteredUsers].sort((a,b) => a.name.last.localeCompare(b.name.last))
    default:
      return filteredUsers
  }
}


// const sortedUsers = useMemo(() => {
//   console.log('renderiza use memo')
//   return [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country));
// }, [filteredUsers]);



  return (
    <div>
      <header style={{marginBottom:'48px'}}>
        <h1>Prueba técnica 55K</h1>
        <button onClick={()=>toggleColor()}>
          Colorear Filas
        </button>
        <button onClick={()=>toggleOrderByCountry()}>
          {(sortBy !== SortBy.COUNTRY)?'Ordenar por país':'No ordenar por país'}
        </button>
        <button onClick={()=>resetUsersList()}>
          Restaurar estado inicial
        </button>
        <input placeholder='Filtrar por País' onChange={handleCountryEntry}></input>
      </header>
      <main>
        {users.length >0 &&
          <UsersList users={sortedUsers(filteredUsers)} colorRows = {colorRows} handleDeleteUser={handleDeleteUser} changeSort= {hangleChangeSort}/>
        }
        {isLoading && <p>Cargando...</p>}
        {!isLoading && error && <p>Ha habido un error</p>}
        {!isLoading && !error && users.length === 0 && <p>No hay usuarios</p>}
        <button onClick={()=>setPage(prevPage => prevPage+1)}>
          Cargar más elementos
        </button>
      </main>
    </div>
  )
}

export default App
