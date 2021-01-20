import React from "react";
import bcrypt from "bcryptjs";

import { processLogin } from "src/modals/user";

export default function LoginTest() {
  let [component, setCompare] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let login_form = document.forms["login-form"];
    let username = login_form.username.value;
    let password = login_form.password.value;

    processLogin(username, password);
  };

  return (
    <>
      <form name="login-form">
        <div>
          username: <input name="username" defaultValue="testuser" />
        </div>
        <div>
          password:
          <input name="password" type="password" defaultValue="testpassword" />
        </div>

        <div>{JSON.stringify(component, null, 2)}</div>
        {/* <div>{JSON.stringify(debug, null, 2)}</div> */}

        <button onClick={handleLogin}>login</button>
      </form>
    </>
  );
}
