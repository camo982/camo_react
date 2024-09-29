export interface State {
    fromLanguage: String,
    toLanguage: String,
    fromText: String,
    result: String,
    loading: boolean
}

export type Action = 
    | {type: 'INTERCHANGE_LENGUAJES', payload:string }
    | {type: 'SET_FROM_LENGUAGE', payload:string}
    | {type: 'SET_TO_LENGUAGE', payload:string}
    | {type: 'SET_FROM_TEXT', payload:string}
    | {type: 'SET_RESULT', payload:string}


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