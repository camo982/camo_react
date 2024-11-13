import './App.css'
import { Route, Routes, Link, useParams, Outlet, Navigate, useNavigate} from 'react-router-dom'
import { useAuth, AuthProvider } from './useAuth'

function App() {

  const Home = ()=>{
    return (
        <h2>HOME</h2>
    )
  }

  const Tacos = ()=>{
    const {tacoName} = useParams()
    return (
      <div>
        <h2>{`TACO ${tacoName}`}</h2>
        <Link to={'details'} >Ver detalles del taco {tacoName}</Link>
        <Outlet/>
      </div>
    )
  }

  const TacoDetails = ()=>{
    const {tacoName} = useParams()
    return (
      <h2>Taco Details {tacoName}</h2>
    )
  }

  const Products = ()=>{

    const tacos = ['pastor','suadero','asada']

    return (
      <>
        <h2>PRODUCTS</h2>
        <ul>
          {tacos.map(taco=>(
            <li key={taco}>
              <Link to={`/tacos/${taco}`}>{taco}</Link> 
            </li>
          ))
          }
        </ul>
      </>
    )
  }

  const Header = () =>{
    return(
      <header>
        <h1>React Router</h1>
        <nav>
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

  const Login = ()=>{
     const {login} = useAuth()
     const navigate = useNavigate()

     const handleClick = ()=>{
      console.log('login')
       login()
       navigate('/products')
     }

    return (
      <button onClick={()=>handleClick()}>Login</button>
    )
  }

  const Footer = ()=>{
    const {logout,isAuthenticated} = useAuth()
    const navigate = useNavigate()

    const handleClick = ()=>{
      console.log('logout')
       logout()
       navigate('/login')
     }

     return (
      <>
      <h2>FOOTER</h2>
      {isAuthenticated && <button onClick={()=>handleClick()}>Logout</button>}
      </>
    )
  }

  const ProtectedRoute = ( {children} ) => {
    const {isAuthenticated} = useAuth()
    if (!isAuthenticated){
      return <Navigate to ='/login'/>
    }
    return children   
  }

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path='/tacos/:tacoName' element = {<Tacos/>}>
          <Route path='details' element = {<TacoDetails/>} />
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
