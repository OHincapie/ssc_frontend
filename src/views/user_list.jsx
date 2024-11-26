import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/auth";


export const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchAllUsers = async () => {
            const {data, error} = await fetchUsers()
            console.log(data);
            if (error != null) {
                setUsers([])    
            } else {
                setUsers(data.users)
            }
        }
        fetchAllUsers()
    })

    return (
      <div className="card p-1 text-light w-100" style={{ background: '#1f1f1f' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Lista de Usuarios</h2>
          <table className="table">
            <thead className="thead-light">
            <tr>
                <th>Identificacion</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fuerza pública</th>
                <th>Rango</th>
                <th>ID Fuerza</th>
                <th>Email</th>
            </tr>
            </thead>
            {users.map((u) => {
                return(
                    <tr key={u.identification}>
                        <td>{u.identification}</td>
                        <td>{u.name}</td>
                        <td>{u.last_name}</td>
                        <td>{u.public_force}</td>
                        <td>{u.range}</td>
                        <td>{u.force_id}</td>
                        <td>{u.email}</td>
                    </tr>
                )
            })}
        </table>
        </div>
      </div>
    );
  };
  
  export default UserList;