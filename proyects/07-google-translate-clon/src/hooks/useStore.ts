import { useReducer } from "react"
import { Action, FromLanguage, Language, State } from "../types"
import { AUTO_LANGUAGE } from "../constants"


const initialState: State = {
    fromLanguage: AUTO_LANGUAGE,
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  
function reducer (state: State, action:Action){
   const {type} = action 
  
   if(type === 'INTERCHANGE_LENGUAJES'){

    if(state.fromLanguage === AUTO_LANGUAGE){
        return state
    }

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

export function useStore (){

    const [{fromLanguage, toLanguage, fromText,result,loading},
        dispatch] = useReducer(reducer,initialState)


    const interchangeLanguages = () =>{
        dispatch({type:'INTERCHANGE_LENGUAJES'})
    }
    const setFromLanguages = (payload:FromLanguage) =>{
        dispatch({type:'SET_FROM_LENGUAGE',payload})
    }
    const setToLanguages = (payload:Language) =>{
        dispatch({type:'SET_TO_LENGUAGE',payload})
    }
    const setFromText = (payload:string) =>{
        dispatch({type:'SET_FROM_TEXT',payload})
    }
    const setResult = (payload:string) =>{
        dispatch({type:'SET_RESULT',payload})
    }

    return {fromLanguage, toLanguage, fromText,result,loading,
        interchangeLanguages,setFromLanguages,setToLanguages,setFromText,setResult}
  }