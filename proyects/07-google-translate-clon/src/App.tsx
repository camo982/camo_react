import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useReducer } from 'react';
import { Action, State } from './types';

const initialState: State = {
  fromLanguage: 'Auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: State, action:Action){
 const {type} = action 

 if(type === 'INTERCHANGE_LENGUAJES'){
  return{
    ...state,
    fromLanguage: state.toLanguage,
    toLanguage: state.fromLanguage
  }
 }

 if (type === 'SET_FROM_LENGUAGE'){
  return{
    ...state,
    fromLanguage: action.payload
  }
 }

 if (type === 'SET_TO_LENGUAGE'){
  return{
    ...state,
    toLanguage: action.payload
  }
 }

 if (type === 'SET_FROM_TEXT'){
  return{
    ...state,
    fromText: action.payload,
    loading: true
  }
 }

 if (type === 'SET_RESULT'){
  return{
    ...state,
    result: action.payload,
    loading: false
  }
 }

 return state 
}

function App() {

  const [{fromLanguage, toLanguage, fromText,result,loading},
          dispatch] = useReducer(reducer,initialState)

  console.log({fromLanguage})

  return (
    <div className='app'>
      <h1>Camo Translate</h1>
      <button onClick={()=>{
        dispatch({type:'SET_FROM_LENGUAGE',payload:'es'})
      }}>Cambiar a español</button><span>{fromLanguage}</span>
    </div>
  )
}

export default App
