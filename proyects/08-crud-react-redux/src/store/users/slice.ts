import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE=[
    {
      id : '1',
      name: 'Viola Amherd',
      email: 'viola@gmail.com',
      github:'midu',
    },
    {
      id: '2',
      name: 'Albert Rösti',
      email: 'Albert@gmail.com',
      github:'Albert1',
    },
    {
      id: '3',
      name: 'Beat Jans',
      email: 'Beat@gmail.com',
      github:'Beat',
    },
    {
      id: '4',
      name: 'Ignazio Cassis',
      email: 'Ignazio@gmail.com',
      github:'Ignazio',
    },
  ];

export interface User {
    name: string;
    email: string; 
    github: string
}

export interface UserWithId extends User {
    id: string;
}

let initialState: UserWithId[] = DEFAULT_STATE
const persistedLocalStorage = localStorage.getItem('___redux_state___')
if (persistedLocalStorage) initialState=JSON.parse(persistedLocalStorage).users

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        deleteUserById : (state, action)=>{
            const id = action.payload
            return(
                state.filter((user)=>user.id !== id)
            )
        },
        createNewUser : (state, action)=>{
          const id= crypto.randomUUID()
          state.push({...action.payload,id})
          //return [...state,{...action.payload,id}] -> esto es lo mismo pero sin el redux toolkit
        }
    }
})

export default usersSlice.reducer;

export const {deleteUserById, createNewUser} = usersSlice.actions