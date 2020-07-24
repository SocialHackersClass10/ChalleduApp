import React, { useState, useEffect, useContext } from "react";
import UserProvider from "../UserProvider";
import UserContext from "../userContext";

function AllUsersList() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [status, setStatus]=useState(['Pending', 'Approved', 'Rejected'])
  const user = useContext(UserContext);

  const getUsers=()=>{
      UserProvider.getUsers(user.tokens.access_token)
        .then((data) => {
          console.log(data);
          setUsers(data.users);
          setLoad(true);
        }).catch(err => {
          console.log(err);
          setLoad(true);
        })
  }

  useEffect(getUsers, []);

  const handleChange=async (e, id)=>{
  await UserProvider.updateUser(id, {document_state: e.target.value}, localStorage.getItem('access_token'))
    getUsers()
  }

  if (load) {
    return (

      <div className="container ">
        <div className="table-responsive">
        <table className=" table table-striped table-bordered table-hover">

          <thead className="thead-dark ">
            <tr className="text text-center">
              <th>Id</th>
              <th>Full Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              <tr key={index} className="text text-center">
                <td key={index}>{index + 1} </td>
                <td key={users.full_name}>{users.full_name}</td>
                <td key={users.username}>{users.username}</td>
                <td key={users.email}>{users.email}</td>
                <td key={users.role}>{users.role}</td>
                <td key={users.document_state}>
                  <select className="form-control" value={users.document_state} onChange={event=>handleChange(event, users._id)}>
                         {status.map(stat=><option>{stat}</option>).filter(state=>state!==users.document_state) }
                  </select>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
        )
  } else
    return (
      <div>Loading...</div>
    )

  
};


export default AllUsersList;