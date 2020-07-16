import React, { useState, useEffect, useContext } from "react";
import UserProvider from "../UserProvider";
import UserContext from "../userContext";

function AllUsersList() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    UserProvider.getUsers(user.tokens.access_token)
      .then((data) => {
        console.log(data);
        setUsers(data.users);
        setLoad(true);
      }).catch(err => {
        console.log(err);
        setLoad(true);
      })

  }, []);

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
        
      </div>
        )
  } else
    return (
      <div>Loading...</div>
    )


  
};


export default AllUsersList;