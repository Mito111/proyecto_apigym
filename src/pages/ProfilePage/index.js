import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import Modal from "../../components/Modal";
import LoginPage from "../LoginPage";
import EditProfilePage from "../EditProfilePage";
import { Link } from "react-router-dom";
import BackArrow from "../../components/BackArrow";

const ProfilePage = () => {
  const { loggedUser, token } = useTokenContext();
  const { email, username, role, avatar, exercises, createdAt } = loggedUser;

  const [showModal, setShowModal] = useState();

  return (
    <section>
      <div className="oneExercise">
        <Link to="/home">
          <BackArrow></BackArrow>
        </Link>
        <h2>{username}</h2>
      </div>

      <p>{exercises} ejercicios</p>
      <img
        src={avatar ? `http://localhost:4000/${avatar}` : defaultAvatar}
        alt={username}
      ></img>
      <p>{role}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        Editar perfil
      </button>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <EditProfilePage setShowModal={setShowModal}></EditProfilePage>
        </Modal>
      )}
    </section>
  );
};

export default ProfilePage;
