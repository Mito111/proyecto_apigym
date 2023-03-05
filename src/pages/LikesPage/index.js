import ExerciseList from "../../components/ExerciseList";
import RutinesListNormal from "../../components/RutinesListNormal";
import useExercises from "../../hooks/useExercises";
import useRutines from "../../hooks/useRutines";
import Spinner from "../../components/Spinner";
import { ArrowBack } from "@mui/icons-material";

import "./style.css";
import { useNavigate } from "react-router-dom";

const LikesPage = () => {
  const {
    exercises,
    errorMessage,
    loading,
    likeExercises,
    favExercises,
    deleteExercise,
  } = useExercises();

  const { rutines, likeRutines, favRutines, deleteRutine } = useRutines();

  const nameClass = "exerciseListOnLikesPage";
  const likesExercises = exercises.filter(
    (exercise) => exercise.likedByMe === 1
  );
  const exercisesOnLikePage = true;

  const likesRutines = rutines.filter((rutine) => rutine.likedByMe === 1);
  const nameClassLikesPage = "nameClassLikesPageUl";

  const navigate = useNavigate();
  return (
    <>
      <div className="exercisesTitle" style={{ height: "100px" }}>
        <div
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          <ArrowBack fontSize="large"></ArrowBack>
        </div>
        <h2 style={{ fontSize: "60px", paddingLeft: "1rem" }}>Me gustas</h2>
      </div>
      <div className="likesPageContainer">
        <section className="likedExercises">
          {loading && <Spinner />}

          {errorMessage && <p>Error: {errorMessage}</p>}
          {exercises.length > 0 && (
            <ExerciseList
              nameClass={nameClass}
              exercises={likesExercises}
              likeExercises={likeExercises}
              favExercises={favExercises}
              deleteExercise={deleteExercise}
              title={exercisesOnLikePage}
              rutines={rutines}
            />
          )}
        </section>
        <section className="nameClassLikesPage">
          <h2 className="rutineListOnLikesPageTitle">RUTINAS</h2>

          {rutines.length > 0 && (
            <RutinesListNormal
              nameClassRutines={nameClassLikesPage}
              rutines={likesRutines}
              likeRutines={likeRutines}
              favRutines={favRutines}
              deleteRutine={deleteRutine}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default LikesPage;
