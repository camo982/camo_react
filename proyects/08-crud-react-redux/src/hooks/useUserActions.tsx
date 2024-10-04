import { deleteUserById,createNewUser } from "../store/users/slice";
import { useAppDispatch, useAppSelector } from "./store";

export const useUserActions=()=>{

  const users = useAppSelector((state)=>state.users);

  const dispatch = useAppDispatch();
  
  const removeUser = (id:string) =>{
    dispatch(deleteUserById(id))
  };
  
  const addUser = ({name,email,github}) =>{
    
    dispatch(createNewUser({name,email,github}))
  }

  return {users,removeUser,addUser}
}
