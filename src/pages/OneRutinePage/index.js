import Rutine from "../../components/Rutine";
import useRutineById from "../../hooks/useRutineById";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";

import useExercises from "../../hooks/useExercises";
import ExerciseList from "../../components/ExerciseList";
import useRutines from "../../hooks/useRutines";
import { ArrowBack } from "@mui/icons-material";
import "./style.css";

const OneRutinePage = () => {
  const { id } = useParams();

  const { rutine, errorMessage, loading, likeRutine } = useRutineById(id);

  const { exercises, likeExercises, deleteExercise, favExercises } =
    useExercises();

  const { rutines } = useRutines();

  const {
    name,

    description,
    idUser,
    username,
    duration,
    exercisesOnRutine,
    likes,
    likedByMe,
    addedByMe,
    owner,
    createdAt,
    favsRutinesIds,
  } = rutine;
  const rutineNormal = true;
  const exercisesOnRutineArray = rutine.exercises ? rutine.exercises : [];
  const nameClass = "exerciseList ";
  const changeIdOfExercises = true;

  const navigate = useNavigate();

  // Falta que se actualice la informacion que se obtiene de rutine. Porque de ahi es donde se saca la lista de ejercicios, por lo tanto
  // si le das like a un ejercicio, se actualiza correctamente la informacion de exercises, pero no la que se muestra por pantalla que
  // viene de rutine.exercises

  // Si se actualiza despues de darle like al ejercicio, se muestra correctamente.

  // Darle favorito y guardarlo en una rutina, funciona correctamente

  return (
    <>
      <section>
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
            Rutinas
          </h2>
        </div>

        {loading && <Spinner />}

        {errorMessage && <p>Error: {errorMessage}</p>}
        {Object.values(rutine).length > 0 && (
          <div className="oneRutineArticle">
            <Rutine
              id={id}
              name={name}
              description={description}
              ownerId={idUser}
              ownerUsername={username}
              duration={duration}
              exercisesOnRutine={exercisesOnRutine}
              likes={likes}
              likedByMe={likedByMe}
              addedByMe={addedByMe}
              likeRutines={likeRutine}
              owner={owner}
              createdAt={createdAt}
              favsRutinesIds={favsRutinesIds}
              rutineSelect={rutineNormal}
            />
          </div>
        )}
      </section>
      <section style={{ width: "100vw" }}>
        <div
          className="exercisesTitle"
          style={{ height: "100px", marginBottom: "2rem" }}
        >
          <div
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            <ArrowBack fontSize="large"></ArrowBack>
          </div>

          <h2 style={{ fontSize: "60px", marginTop: "0", paddingLeft: "1rem" }}>
            Ejercicios en esta rutina
          </h2>
        </div>
        {loading && <Spinner />}

        {errorMessage && <p>Error: {errorMessage}</p>}
        {exercises.length > 0 && (
          <ExerciseList
            nameClass={nameClass}
            exercises={exercisesOnRutineArray}
            likeExercises={likeExercises}
            favExercises={favExercises}
            deleteExercise={deleteExercise}
            rutines={rutines}
            changeIdOfExercises={changeIdOfExercises}
          />
        )}
      </section>
    </>
  );
};

export default OneRutinePage;
