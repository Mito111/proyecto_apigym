import useUsers from "../../hooks/useUsers";

import { useTokenContext } from "../../contexts/TokenContext";
import { useRef, useState } from "react";
import "./style.css";
import Modal from "../Modal";
import editButton from "../../assets/images/editButton.png";

const EditUserAvatar = ({ setShowModal }) => {
  const { user, setUser, errorMessage, setErrorMessage } = useUsers();
  const { token, loggedUser } = useTokenContext();
  const [showModalError, setShowModalError] = useState(false);
  const [showNewAvatar, setShowNewAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState(null);

  const imagesInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
    setNewAvatarUrl(URL.createObjectURL(file));
    setShowNewAvatar(true);
  };

  const handleConfirm = async (event) => {
    try {
      const formData = new FormData();
      formData.append("avatar", newAvatar);

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

      // Actualiza la imagen de perfil en el estado de usuario
      setUser({
        ...loggedUser,
        avatar: body.avatar,
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      setShowModalError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="editFormDiv">
      <form>
        <label htmlFor="images">
          <img
            src={editButton}
            alt="edita tu foto de perfil"
            style={{ height: "40px", marginTop: "15px", cursor: "pointer" }}
          ></img>
        </label>
        <input
          hidden
          id="images"
          type="file"
          accept="image/*"
          ref={imagesInputRef}
          onChange={handleFileChange}
        />

        {showNewAvatar && (
          <Modal setShowModal={setShowNewAvatar}>
            <img
              src={newAvatarUrl}
              alt="preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <button
              style={{ cursor: "pointer", marginTop: "2rem" }}
              onClick={handleConfirm}
            >
              Confirmar
            </button>
            <button>Cancelar</button>
          </Modal>
        )}
      </form>
      {showModalError && (
        <div className="modalContainer2">
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EditUserAvatar;
