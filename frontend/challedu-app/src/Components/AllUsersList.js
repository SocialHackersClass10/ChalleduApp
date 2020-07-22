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

      <div class="wrapper">
        <div class="FlexTable FlexTable--6cols FlexTable--collapse">
          <div class="FlexTable-row FlexTable-row--head">
            <div class="FlexTable-cell id-cell column-heading">ID</div>
            <div class="FlexTable-cell fname-cell column-heading">Full Name</div>
            <div class="FlexTable-cell username-cell column-heading">Username</div>
            <div class="FlexTable-cell email-cell column-heading">Email</div>
            <div class="FlexTable-cell role-cell column-heading">Role</div>
            <div class="FlexTable-cell status-cell column-heading">Status</div>
          </div>
          {users.map((users, index) => (
            <div class="FlexTable-row">
              <div class="FlexTable-cell id-cell">
                <div class="FlexTable-cell--heading">ID</div>
                <div class="FlexTable-cell--content title-content" key={index}>{index + 1}</div>
              </div>
              <div class="FlexTable-cell fname-cell">
                <div class="FlexTable-cell--heading hide-in-mobile">Full Name</div>
                <div class="FlexTable-cell--content title-content" key={users.full_name}>{users.full_name}</div>
              </div>
              <div class="FlexTable-cell username-cell">
                <div class="FlexTable-cell--heading">Username</div>
                <div class="FlexTable-cell--content title-content" key={users.username}>{users.username}</div>
              </div>
              <div class="FlexTable-cell email-cell">
                <div class="FlexTable-cell--heading">Email</div>
                <div class="FlexTable-cell--content title-content" key={users.email}>{users.email}</div>
              </div>
              <div class="FlexTable-cell role-cell">
                <div class="FlexTable-cell--heading">Role</div>
                <div class="FlexTable-cell--content title-content" key={users.role}>{users.role}</div>
              </div>
              <div class="FlexTable-cell status-cell">
                <div class="FlexTable-cell--heading">Status</div>
                {
                  users.document_state === "Approved" ? (
                    <div class="FlexTable-cell--content title-content" key={users.document_state}>{users.document_state}</div>
                  ) : (
                      <div class="FlexTable-cell--content title-content">Pending</div>
                    )
                }
              </div>

            </div>
          ))}

        </div>
      </div>

    )
  } else
    return (
      <div>Loading...</div>
    )

};


export default AllUsersList;