/* eslint-disable no-useless-escape */
import useUsers from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import "./style.css";

const EditUserForm = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,

    errorMessage,
    setErrorMessage,
  } = useUsers();

  return (
    <div className="registerFormDiv">
      <form
        className="registerForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const emailRegex =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const username = user.username;
            const email = user.email;
            const password = user.password;
            const role = user.role;

            if (!emailRegex.test(email)) {
              throw new Error("Introduce un email válido");
            }

            const res = await fetch("http://localhost:4000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password, role }),
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            navigate("/login");
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          id="username"
          placeholder="User_99"
          value={user.username}
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="email@email.com"
          value={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="******"
          value={user.password}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        <label htmlFor="role">
          Role:
          <select
            id="role"
            type="select"
            value={user.role}
            onChange={(event) => {
              setUser({ ...user, role: event.target.value });
            }}
          >
            <option value="normal">User</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button>Registrarse</button>
      </form>

      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default EditUserForm;
