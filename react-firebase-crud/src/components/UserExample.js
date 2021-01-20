import React from "react";

import { processAddUser } from "src/components/modals/user";
import { processListUser } from "src/components/modals/user";
import { processUpdateUser } from "src/components/modals/user";
import { processDeleteUser } from "src/components/modals/user";

export default function UserExample() {
  let [users, setUsers] = React.useState([]);

  function handleDeleteUser(e) {
    e.preventDefault();
    let user_id = e.target.parentNode.elements.user_id.value;
    processDeleteUser(user_id)
      .then(() => {
        alert("delete user done");
        handleListUser();
      })
      .catch((err) => {
        alert("error during delete user");
        handleListUser();
      });
  }

  function handleListUser(e) {
    processListUser()
      .then((a_d) => {
        setUsers(a_d);
      })
      .catch((err) => {
        alert("error during listing user", err);
      });
  }

  function handleUpdateUser(e) {
    e.preventDefault();
    let user_id = e.target.parentNode.elements.user_id.value;
    let updated_user_profile = {
      setting1: e.target.parentNode.elements.setting1.value,
    };
    processUpdateUser(user_id, updated_user_profile)
      .then(() => {
        alert("update user done");
        handleListUser();
      })
      .catch((err) => {
        alert("error during update user", err);
        handleListUser();
      });
  }

  function UpdateUserForm({ current_value }) {
    let current_value_data = current_value.data;
    console.log("current_value_data", current_value_data);
    const [setting1_value, setSetting1Value] = React.useState(
      current_value_data.profile.setting1
    );

    const handleOnChange = (e) => {
      setSetting1Value(e.target.value);
    };

    return (
      <form name="update-user">
        <input name="user_id" hidden value={current_value.id} />
        <input
          name="setting1"
          value={setting1_value}
          onChange={handleOnChange}
        ></input>
        <button onClick={handleUpdateUser}>update user</button>
        <button onClick={handleDeleteUser}>delete user</button>
      </form>
    );
  }

  function ListUser() {
    let users_length = users.length;

    function ShowUser() {
      return (
        <>
          {users.map((user, idx) => {
            return (
              <div key={user.id}>
                <div>{JSON.stringify(user.data, null, 2)}</div>
                <div>
                  <UpdateUserForm current_value={user} />
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
        handleListUser();
      })
      .catch((err) => {
        alert(err);
        handleListUser();
      });
  }

  function AddUser() {
    const handleChange = (e) => {
      let target_field = document.forms["add-user-form"][e.target.name].value;
      let target_value = e.target.value;
      target_field = target_value;
    };
    return (
      <>
        <form name="add-user-form">
          <div>
            username:
            <input
              type="text"
              name="username"
              id="username"
              defaultValue="testuser"
              onChange={handleChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              id="password"
              defaultValue="testpassword"
              onChange={handleChange}
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
