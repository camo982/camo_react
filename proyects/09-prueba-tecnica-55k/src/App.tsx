
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {

  const initialUsers = useRef([])
  const [users,setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry,setFilterCountry] = useState('')

  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
      .then((res)=>{
        if (!res.ok){
          throw new Error('Error llamando usuarios');
        }
        return res.json();
      }).then((res)=>{
        setUsers(res.results)
        initialUsers.current=res.results
        
      })
      .catch(err =>{
        console.error(err)
      })
  },[])

const toggleColor= ()=>{
  setColorRows(!colorRows)
}

const toggleOrderByCountry = () =>{
  setSortByCountry(prevState => !prevState)
}

const resetUsersList = () => {
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

const sortedUsers = [...filteredUsers].sort((a,b) => a.location.country.localeCompare(b.location.country))

// const sortedUsers = useMemo(() => {
//   console.log('renderiza use memo')
//   return [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country));
// }, [filteredUsers]);

console.log('ejecución')


  return (
    <div>
      <header>
      <h1>Prueba técnica 55K</h1>
      <button onClick={()=>toggleColor()}>
        Colorear Filas
      </button>
      <button onClick={()=>toggleOrderByCountry()}>
        {!sortByCountry?'Ordenar por país':'No ordenar por país'}
      </button>
      <button onClick={()=>resetUsersList()}>
        Restaurar estado inicial
      </button>
      <input placeholder='Filtrar por País' onChange={handleCountryEntry}></input>
      </header>
      <UsersList users={sortByCountry?sortedUsers:filteredUsers} colorRows = {colorRows} handleDeleteUser={handleDeleteUser}/>
    </div>
  )
}

export default App
