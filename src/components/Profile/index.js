import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Profile = ({
  email,
  username,
  role,
  avatar,
  numOfExercises,
  defaultAvatar,
  hovered,
  setHovered,
  setAvatarModal,
  dayCreated,
  setShowModal,
  nameClass,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="profileInfoHeader">
        <div className="exercisesTitle" style={{ height: "100px" }}>
          <div
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            <ArrowBack fontSize="large"></ArrowBack>
          </div>

          <h2 style={{ fontSize: "60px", marginTop: "0", paddingLeft: "1rem" }}>
            {username}
          </h2>
        </div>
      </div>
      <section className="profileInfoData">
        <p className="numOfExercises">
          {numOfExercises === 1
            ? `${numOfExercises} ejercicio`
            : `${numOfExercises} ejercicios`}
        </p>
        <img
          src={avatar ? `http://localhost:4000/${avatar}` : defaultAvatar}
          alt={username}
          className={hovered ? "avatar-hovered" : "avatar"}
          onClick={() => {
            setAvatarModal(true);
          }}
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseOut={() => {
            setHovered(false);
          }}
        ></img>
        <p>Rol: {role}</p>
        <p>Se unió el {dayCreated}</p>
        <button
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(true);
          }}
        >
          Editar perfil
        </button>
      </section>
    </>
  );
};

export default Profile;
