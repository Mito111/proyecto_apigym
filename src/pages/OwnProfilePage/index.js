import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import Modal from "../../components/Modal";
import EditProfilePage from "../EditProfilePage";
import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import EditUserAvatar from "../../components/EditUserAvatar";
import "./style.css";
import Profile from "../../components/Profile";
import useRutines from "../../hooks/useRutines";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const OwnProfilePage = () => {
  const { loggedUser } = useTokenContext();
  const {
    email,
    username,
    role,
    avatar,
    exercises: numOfExercises,
    createdAt,
  } = loggedUser;

  const { exercises, likeExercises, deleteExercise } = useExercises();
  const { rutines } = useRutines();

  const [showModal, setShowModal] = useState();
  const [avatarModal, setAvatarModal] = useState();
  const [hovered, setHovered] = useState(false);

  const exercisesOwner = exercises.filter((exercise) => exercise.owner === 1);
  const date = new Date(createdAt);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dayCreated = date.toLocaleDateString("es-ES", options);

  const nameClass = "profilePageExerciseList";
  const navigate = useNavigate();

  return (
    <section className="ownProfileSection">
      <aside className="profileAside">
        <Profile
          username={username}
          email={email}
          role={role}
          numOfExercises={numOfExercises}
          avatar={avatar}
          defaultAvatar={defaultAvatar}
          hovered={hovered}
          setHovered={setHovered}
          setAvatarModal={setAvatarModal}
          dayCreated={dayCreated}
          setShowModal={setShowModal}
        ></Profile>
      </aside>
      <div className="yourOwnExercises">
        <div className="exercisesTitle" style={{ height: "100px" }}>
          <h2 style={{ fontSize: "60px", marginTop: "0", paddingLeft: "2rem" }}>
            TUS EJERCICIOS
          </h2>
        </div>
        <ExerciseList
          nameClass={nameClass}
          exercises={exercisesOwner}
          likeExercises={likeExercises}
          deleteExercise={deleteExercise}
          rutines={rutines}
        ></ExerciseList>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <EditProfilePage setShowModal={setShowModal}></EditProfilePage>
        </Modal>
      )}

      {avatarModal && (
        <Modal setShowModal={setAvatarModal}>
          <img
            src={avatar ? `http://localhost:4000/${avatar}` : defaultAvatar}
            alt={username}
          ></img>

          <EditUserAvatar setShowModal={setAvatarModal}></EditUserAvatar>
          {/* Cambiar porque al clickar en el boton de editar se abra un modal en el que se vea la foto nueva, para confirmar los cambios */}
        </Modal>
      )}
    </section>
  );
};

export default OwnProfilePage;
