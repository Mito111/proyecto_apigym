/* eslint-disable no-useless-escape */
import useUsers from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { useRef, useState } from "react";
import "./style.css";
import Modal2 from "../Modal2";

const EditUserForm = ({ setShowModal }) => {
  const navigate = useNavigate();

  const { user, setUser, errorMessage, setErrorMessage } = useUsers();
  const { token } = useTokenContext();
  const [showModalError, setShowModalError] = useState(false);

  return (
    <div className="editFormDiv">
      <h2>Editar perfil</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const email = user.email;
            const username = user.username;
            const role = user.role;
            const avatar = user.avatar;

            const emailRegex =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!emailRegex.test(email)) {
              throw new Error("Introduce un email válido");
            }

            const res = await fetch("http://localhost:4000/users", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
              body: JSON.stringify({ username, email, role, avatar }),
            });
            console.log(email);
            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }
            setShowModal(false);
          } catch (error) {
            console.error(error);
            setShowModalError(true);
            setErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          id="username"
          value={user.username}
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
            setShowModalError(false);
          }}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
            setShowModalError(false);
          }}
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          type="select"
          value={user.role}
          onChange={(event) => {
            setUser({ ...user, role: event.target.value });
            setShowModalError(false);
          }}
        >
          <option value="normal">User</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>

        <button style={{ cursor: "pointer" }}>Guardar cambios</button>
      </form>

      {showModalError && (
        <div className="modalContainer2">
          <p>Error: {errorMessage}</p>
        </div>
      )}
      {console.log(user)}
    </div>
  );
};

export default EditUserForm;
