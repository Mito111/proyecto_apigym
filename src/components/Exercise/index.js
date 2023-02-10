import ExerciseMedia from "../ExerciseMedia";
import ExerciseMediaThumbnail from "../ExerciseMediaThumbnail";
import getTimeAgo from "../utils/getTimeAgo";
import "./style.css";

import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import Modal from "../Modal";

const Exercise = ({
  id,
  name,
  description,
  muscleGroup,
  ownerId,
  likes,
  likedByMe,
  likeExercises,
  deleteExercise,
  owner,
  createdAt,
  nameMedia,
  thumbnail,
}) => {
  const navigate = useNavigate();
  const [showVerifyDelete, setShowVerifyDelete] = useState(false);

  const { token } = useTokenContext();

  return (
    <article className={owner ? "ownExercise exercise" : "exercise"}>
      <header>
        <h3>{name}</h3>
      </header>
      <p>{description}</p>
      <p>Grupo Muscular: {muscleGroup}</p>
      {thumbnail ? (
        <ExerciseMediaThumbnail nameMedia={nameMedia} name={name} />
      ) : (
        <ExerciseMedia nameMedia={nameMedia} name={name} />
      )}
      <LikeButton
        id={id}
        likes={likes}
        likedByMe={likedByMe}
        likeExercises={likeExercises}
      ></LikeButton>

      {/*Cambiar en el futuro, el parrafo por un imagen rellena de un corazoncito o el icono que sea que indique que le dieron like al ejercicio*/}
      <footer>
        <p className="entryDateAuthor">
          Publicado por {owner ? "ti " : `usuario ${ownerId} `}
          {getTimeAgo(new Date(createdAt))}
        </p>

        {owner && (
          <button
            onClick={(e) => {
              e.preventDefault();

              setShowVerifyDelete(true);
            }}
          >
            ELIMINAR
          </button>
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
                console.log(body);
                if (!res.ok) {
                  throw new Error(body.message);
                }
                deleteExercise({ id });
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
