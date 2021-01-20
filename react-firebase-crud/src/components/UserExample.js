import React from "react";

import { addUser, processAddUser } from "src/components/modals/user";
import { listUser, processListUser } from "src/components/modals/user";

export default function UserExample() {
  let [users, setUsers] = React.useState([]);

  function handleListUser(e) {
    processListUser()
      .then((a_d) => {
        setUsers(a_d);
      })
      .catch((err) => {
        alert("error during listing user", err);
      });
  }

  function ListUser() {
    let users_length = users.length;

    function ShowUser() {
      return (
        <>
          {users.map((user, idx) => {
            return (
              <div key={idx}>
                <div>{JSON.stringify(user, null, 2)}</div>
                <div>
                  <button>update user</button>
                </div>
              </div>
            );
          })}
        </>
      );
    }

    function ShowNoUser() {
      return <>no user </>;
    }

    return (
      <>
        <button onClick={handleListUser}>list user</button>
        {users_length > 0 ? <ShowUser /> : <ShowNoUser />}
      </>
    );
  }

  function handleAddUser(e) {
    e.preventDefault();
    let target_form = document.forms["add-user-form"];
    let username = target_form.username.value;
    let password = target_form.password.value;
    console.log("username", username);
    processAddUser(username, password)
      .then(() => {
        alert("add user done");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function AddUser() {
    const handleDummy = () => {};
    return (
      <>
        <form name="add-user-form">
          <div>
            username:
            <input
              type="text"
              name="username"
              id="username"
              value="testuser"
              onChange={handleDummy}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              id="password"
              value="testpassword"
              onChange={handleDummy}
            />
          </div>
          <div>
            <button onClick={handleAddUser}>adduser</button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div>UserExample</div>
      <div>list user</div>
      <div>
        <ListUser />
      </div>
      <div>add user</div>
      <div>
        <AddUser />
      </div>
    </>
  );
}
