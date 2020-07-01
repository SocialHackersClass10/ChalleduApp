import React, { useState, useEffect } from "react";
import UserProvider from "../UserProvider";

function AllUsersList() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    UserProvider.getUsers()

      .then((data) => {
        setUsers(data.users);
        setLoad(true);
        console.log(data.users);
      }).catch(err => {
        console.log(err);
        setLoad(true);
      })

  }, []);

  if (load) {
    return (

      <div className="container col-8">
        <table className="table table-striped table-bordered table-hover">

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
                {
                  users.approval_pending ? (
                    <td key={users.approval_pending}>{users.approval_pending}pending</td>
                  ) : <td>aprovved</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
        )
  } else
    return (
      <div>Loading...</div>
    )


  
};


export default AllUsersList;