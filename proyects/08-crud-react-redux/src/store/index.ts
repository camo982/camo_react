import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './users/slice'
import { toast } from "sonner";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) =>{
    next(action);
    localStorage.setItem("___redux_state___", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware = store => next => action => {
    const {type, payload}= action
    console.log('estado inicial:',store.getState());
    console.log({type, payload});
    next(action) 
    if (type === 'users/deleteUserById'){
        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,{
            method: 'DELETE'
    }).then (res =>{
        if (res.ok) toast.success('Elemento borrado correctamente')
    }).catch(()=>{
        console.log('error')
    })
    }
    console.log('estado final',store.getState());
    
}

export const store = configureStore({
    reducer:{
        users:usersReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
    },
})



export type RootState= ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch