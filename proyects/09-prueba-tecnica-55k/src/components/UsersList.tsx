import { type User } from "../types"

interface Props {
    users: User[],
    colorRows: boolean,
    handleDeleteUser: (userUuid:string) => void
}

export function UsersList ({users,colorRows,handleDeleteUser}:Props) {

    const isOdd=(number:number)=>{
        return number % 2 !== 0
    }



    return(
        <table style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>{
                    const color = isOdd(index)?'#555':'#777'
                    return (
                        <tr key={user.login.uuid} style={{background: (colorRows)?color:'transparent'}}>
                            <td> <img src={user.picture.thumbnail}/></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={()=>handleDeleteUser(
                                    user.login.uuid
                                )}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    )
                }
                )
                }
            
            </tbody>

        </table>
    )
}