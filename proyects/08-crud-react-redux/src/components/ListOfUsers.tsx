import { DeleteIcon,EditIcon } from './Icons';
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { useUserActions } from '../hooks/useUserActions';



export function ListOfUsers() {

  //const users = useAppSelector((state)=>state.users);
  const {users,removeUser} = useUserActions();

  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Usuarios
      <Badge>{users.length}</Badge>
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
                <TableCell> 
                    {user.id}
                </TableCell>
                <TableCell style={{display:'flex', alignItems:'center',marginRight:'8px'}}>
                <img style={{width:'60px',height: '60px', borderRadius: '50%'} } src= {`https://unavatar.io/github/${user.github}`}/>
                    {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button>
                    <EditIcon/>
                  </button>
                  <button onClick={()=>removeUser(user.id)}>
                    <DeleteIcon/>
                  </button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}