/* eslint-disable no-useless-escape */
import useUsers from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { useRef, useState } from "react";
import "./style.css";
import Modal from "../Modal";
import EditUserAvatar from "../EditUserAvatar";

const EditUserForm = ({ setShowModal }) => {
  const navigate = useNavigate();

  const { user, setUser, errorMessage, setErrorMessage } = useUsers();
  const { token } = useTokenContext();
  const [showModalError, setShowModalError] = useState(false);
  const [showNewAvatar, setShowNewAvatar] = useState(false);

  const imagesInputRef = useRef();

  return (
    <div className="editFormDiv">
      <h2>Editar perfil</h2>

      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const email = user.email;

            const role = user.role;

            // const media = imagesInputRef.current.files;

            const formData = new FormData();

            formData.set("email", email);

            formData.set("role", role);
            // formData.append("avatar", media[0]);

            const emailRegex =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!emailRegex.test(email)) {
              throw new Error("Introduce un email válido");
            }

            const res = await fetch("http://localhost:4000/users", {
              method: "PATCH",
              headers: {
                authorization: token,
              },
              body: formData,
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }
            setUser(body.data.updatedUser);
            navigate(0);
            setShowModal(false);
          } catch (error) {
            console.error(error);
            setShowModalError(true);
            setErrorMessage(error.message);
          }
        }}
      >
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

        {/* <label htmlFor="images"> */}
        {/* <img
          src={`http://localhost:4000/${user.avatar}`}
          alt={user.username}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowNewAvatar(true);
          }}
        /> */}
        {/* </label>
        <input
          hidden
          id="images"
          type="file"
          accept="image/*"
          ref={imagesInputRef}
        /> */}
        {/* {showNewAvatar && (
          <Modal setShowModal={setShowNewAvatar}>
            <img
              src={`http://localhost:4000/${user.avatar}`}
              alt={`${user.username}`}
            ></img>
            <EditUserAvatar setShowModal={setShowNewAvatar}></EditUserAvatar>
          </Modal>
        )} */}
        <button style={{ cursor: "pointer" }}>Guardar cambios</button>
      </form>

      {showModalError && (
        <div className="modalContainer2">
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EditUserForm;
