import ExerciseMedia from "../ExerciseMedia";
import ExerciseMediaThumbnail from "../ExerciseMediaThumbnail";
import getTimeAgo from "../utils/getTimeAgo";
import "./style.css";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import Modal from "../Modal";
import deleteButton from "../../assets/images/deleteButton.png";
import FavButton from "../FavButton";

const Exercise = ({
  id,
  name,
  description,
  muscleGroup,
  ownerUsername,
  likes,
  likedByMe,
  favedByMe,
  likeExercises,
  favExercises,
  deleteExercise,
  owner,
  createdAt,
  nameMedia,
  thumbnail,
  rutines,
}) => {
  const navigate = useNavigate();
  const [showVerifyDelete, setShowVerifyDelete] = useState(false);

  const { token } = useTokenContext();

  const type = "exercise";

  return (
    <article className={owner ? "ownExercise exercise" : "exercise"}>
      <header>
        <h3>{name}</h3>
      </header>
      {description ? <p className="description">{description}</p> : ""}
      <p>Grupo Muscular: {muscleGroup}</p>
      {thumbnail ? (
        <ExerciseMediaThumbnail nameMedia={nameMedia} name={name} />
      ) : (
        <ExerciseMedia nameMedia={nameMedia} name={name} />
      )}
      <LikeButton
        type={type}
        id={id}
        likes={likes}
        likedByMe={likedByMe}
        likeType={likeExercises}
      ></LikeButton>
      <FavButton
        id={id}
        favedByMe={favedByMe}
        favExercises={favExercises}
        idExercise={id}
        rutines={rutines}
      ></FavButton>

      <footer>
        <div>
          <p className="entryDateAuthor">
            Publicado por {owner ? "ti " : `${ownerUsername} `}
            {getTimeAgo(new Date(createdAt))}
          </p>
        </div>

        {owner ? (
          <div className="delete">
            <img
              onClick={(e) => {
                e.preventDefault();

                setShowVerifyDelete(true);
              }}
              style={{ cursor: "pointer" }}
              className="deleteButton"
              src={deleteButton}
              alt="eliminar"
            ></img>
          </div>
        ) : (
          ""
        )}

        {showVerifyDelete && (
          <Modal setShowModal={setShowVerifyDelete}>
            <h3>Estás seguro que deseas eliminar este ejercicio?</h3>
            <p>
              Esta acción no se puede revertir. Los demás usuarios ya no podrán
              acceder a el, será eliminado de todas las rutinas que lo contengan
              y se eliminará de los resultados de busqueda de APIGYM
            </p>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                marginTop: "1rem",
                width: "50%",
                cursor: "pointer",
              }}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const res = await fetch(
                  `http://localhost:4000/exercises/${id}`,
                  {
                    method: "DELETE",
                    headers: { authorization: token },
                  }
                );
                const body = await res.json();

                if (!res.ok) {
                  throw new Error(body.message);
                }
                deleteExercise({ id });
                navigate("/home");
              }}
            >
              ELIMINAR
            </button>
            <button
              style={{
                backgroundColor: "grey",
                color: "black",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                width: "50%",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                setShowVerifyDelete(false);
              }}
            >
              CANCELAR
            </button>
          </Modal>
        )}
      </footer>
    </article>
  );
};

export default Exercise;
