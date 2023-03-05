import { useState, useParams } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import Modal from "../../components/Modal";
import EditProfilePage from "../EditProfilePage";
import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import EditUserAvatar from "../../components/EditUserAvatar";
import "./style.css";
import Profile from "../../components/Profile";
import useUserById from "../../hooks/useUserById";

const ProfilePage = () => {
  const { id } = useParams();

  const { user } = useUserById(id);

  const {
    email,
    username,
    role,
    avatar,
    exercises: numOfExercises,
    createdAt,
  } = user;

  const { exercises, likeExercises, deleteExercise } = useExercises();

  const [showModal, setShowModal] = useState();
  const [avatarModal, setAvatarModal] = useState();
  const [hovered, setHovered] = useState(false);

  const exercisesOwner = exercises.filter((exercise) => exercise.owner === 1);
  const date = new Date(createdAt);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const dayCreated = date.toLocaleDateString("es-ES", options);

  return (
    <section>
      <div>
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
      </div>
      <div>
        <h3>Tus ejercicios</h3>
        <ExerciseList
          exercises={exercisesOwner}
          likeExercises={likeExercises}
          deleteExercise={deleteExercise}
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

export default ProfilePage;
