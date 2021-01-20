import React from "react";

import { addUser, processAddUser } from "src/components/modals/user";

function handleAddUser(e) {
  e.preventDefault();
  let target_form = document.forms["add-user-form"];
  let username = target_form.username.value;
  let password = target_form.password.value;
  processAddUser(username, password)
    .then(() => {
      alert("add user done");
    })
    .catch((err) => {
      alert(err);
    });
}

function AddUser() {
  return (
    <>
      <form name="add-user-form">
        <div>
          username:
          <input type="text" name="username" id="username" value="testuser" />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            id="password"
            value="testpassword"
          />
        </div>
        <div>
          <button onClick={handleAddUser}>adduser</button>
        </div>
      </form>
    </>
  );
}

export default function UserExample() {
  return (
    <>
      <div>UserExample</div>
      <div>
        <AddUser />
      </div>
    </>
  );
}
