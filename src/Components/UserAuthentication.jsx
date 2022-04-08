import React, { useEffect, useState } from "react";

export default function UserAuthentication() {
  function SignOn() {
    return (
      <tr>
        <td>Single Sign-on to the following:</td>
        <td>
          <input
            type="checkbox"
            name="mail"
            onClick={handleClick}
            defaultValue="Mail"
          />
          <label htmlFor="mail">Mail</label>
          <br />
          <input
            type="checkbox"
            name="payroll"
            onClick={handleClick}
            defaultValue="Payroll"
          />
          <label htmlFor="payroll">Payroll</label>
          <br />
          <input
            type="checkbox"
            name="selfService"
            onClick={handleClick}
            defaultValue="selfService"
          />
          <label htmlFor="selfService">selfService</label>
        </td>
      </tr>
    );
  }
  function Role() {
    return (
      <tr>
        <td>Please Specify your role:</td>
        <td onChange={handleRole}>
          <input type="radio" value="Admin" id="admin" name="role" />
          <label htmlFor="admin">Admin</label>
          <br />
          <input type="radio" value="Engineer" id="engineer" name="role" />
          <label htmlFor="engineer">Engineer</label>
          <br />
          <input type="radio" value="Manager" id="manager" name="role" />
          <label htmlFor="manager">Manager</label>
          <br />
          <input type="radio" value="Guest" id="guest" name="role" />
          <label htmlFor="guest">Guest</label>
        </td>
      </tr>
    );
  }

  function WebServer() {
    return (
      <tr>
        <td>
          <label htmlFor="server">Web Server:</label>
        </td>
        <td>
          <select name="server" id="server" onChange={handleSelect}>
            <option>{server ? server : "---Choose a Server---"}</option>
            <option value="Google Cloud">Google Cloud</option>
            <option value="Amazon Web Services">Amazon Web Services</option>
            <option value="Microsoft Azure">Microsoft Azure</option>
          </select>
        </td>
      </tr>
    );
  }

  const [details, setDetails] = useState(localStorage.getItem("details"));
  const [user, setUser] = useState({
    username: "",
    password: "",
    city: "",
  });

  const [error, setError] = useState({
    userError: false,
    passError: false,
  });
  const [checked, setChecked] = useState({
    mail: false,
    payroll: false,
    selfService: false,
  });

  const [role, setRole] = useState("");

  const [server, setServer] = useState("");

  const [signOn, setSignOn] = useState([]);

  function handleRole(e) {
    e.preventDefault();
    setRole(e.target.value);
  }
  function handleSelect(e) {
    setServer(e.target.value);
  }

  function handleClick(e) {
    const name = e.target.name;
    setChecked((x) => {
      if (name === "mail")
        return {
          mail: !x.mail,
          payroll: x.payroll,
          selfService: x.selfService,
        };
      else if (name === "payroll") {
        return {
          mail: x.mail,
          payroll: !x.true,
          selfService: x.selfService,
        };
      } else
        return {
          mail: x.mail,
          payroll: x.payroll,
          selfService: !x.selfService,
        };
    });

    let x = [];
    for (let i in checked) {
      if (checked[i] === true) {
        x.push(i);
      }
    }

    setSignOn(x);
  }

  function handleUser(e) {
    const { name, value } = e.target;

    setUser((preValue) => {
      if (name === "username") {
        return {
          username: value,
          password: preValue.password,
          city: preValue.city,
        };
      } else if (name === "userpass") {
        return {
          username: preValue.username,
          password: value,
          city: preValue.city,
        };
      } else {
        return {
          nusername: preValue.username,
          password: preValue.password,
          city: value,
        };
      }
    });
  }

  function handleValidate(e) {
    e.preventDefault();
    if (user.username === "") {
      setError((preValue) => {
        return {
          userError: true,
          passError: preValue.passError,
        };
      });
    } else {
      setError((preValue) => {
        return {
          userError: false,
          passError: preValue.passError,
        };
      });
    }

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8}/.test(user.password)) {
      setError((preValue) => {
        return {
          userError: preValue.userError,
          passError: true,
        };
      });
    } else {
      setError((preValue) => {
        return {
          userError: preValue.userError,
          passError: false,
        };
      });
    }
  }
  // console.log(checked)

  function handleSave(e) {
    e.preventDefault();
    const userDetail = {
      id: new Date().getTime().toString(),
      Username: user.username,
      Password: user.password,
      City: user.city,
      webServer: server,
      Role: role,
      SignOn: signOn,
    };
    setDetails(userDetail);
  }

  function handleReset() {
    setError({
      userError: false,
      passError: false,
    });
  }
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
  }, [details]);

  return (
    <div>
      <form>
        <table>
          <tr>
            <td>
              <label htmlFor="username">Username:</label>
            </td>
            <td>
              <input type="text" name="username" onChange={handleUser} />
            </td>
            <td>{error.userError ? "Username can't be empty" : ""}</td>
          </tr>
          <tr>
            <td>
              <label htmlFor="userpassword">Password:</label>
            </td>
            <td>
              <input type="password" onChange={handleUser} name="userpass" />
            </td>
            <td>
              {error.passError
                ? "Password must be required and must have 8 characters and at least 1 digit and atleast 1 upper or lower case."
                : ""}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="city">City of Employement:</label>
            </td>
            <td>
              <input type="text" id="city" onChange={handleUser} name="city" />
            </td>
          </tr>
          <WebServer />
          <Role />
          <SignOn />
        </table>
        <div>
          <button onClick={handleValidate}>Validate</button>
          <button onClick={handleSave}>Save</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
