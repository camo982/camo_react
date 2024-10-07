import { SortBy, type User } from "../types"

interface Props {
    users: User[],
    colorRows: boolean,
    handleDeleteUser: (userUuid:string) => void,
    changeSort: (sortBy:SortBy) => void
}

export function UsersList ({users,colorRows,handleDeleteUser,changeSort}:Props) {

    const isOdd=(number:number)=>{
        return number % 2 !== 0
    }

    return(
        <table style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={()=>changeSort(SortBy.FIRST)}>Nombre</th>
                    <th onClick={()=>changeSort(SortBy.LAST)}>Apellido</th>
                    <th onClick={()=>changeSort(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>{
                    const color = isOdd(index)?'#555':'#777'
                    return (
                        <tr key={user.login.uuid} style={{background: (colorRows)?color:'transparent'}}>
                            <td> <img src={user.picture.thumbnail}/></td>
                            <td >{user.name.first}</td>
                            <td >{user.name.last}</td>
                            <td >{user.location.country}</td>
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