import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import useRutines from "../../hooks/useRutines";
import Spinner from "../../components/Spinner";
import "./style.css";
import RutinesListNormal from "../../components/RutinesListNormal";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

const ExercisesPage = () => {
  const {
    exercises,
    errorMessage,
    loading,
    likeExercises,
    favExercises,
    deleteExercise,
  } = useExercises();

  const [exercisesActive, setExercisesActive] = useLocalStorage(
    "exercisesActive",
    ""
  );
  const [rutinesActive, setRutinesActive] = useLocalStorage(
    "rutinesActive",
    ""
  );
  const [likesActive, setLikesActive] = useLocalStorage("likesActive", "");
  const { rutines, likeRutines, favRutines, deleteRutine } = useRutines();

  const likesRutines = rutines.filter((rutine) => rutine.likedByMe === 1);
  const likesExercises = exercises.filter(
    (exercise) => exercise.likedByMe === 1
  );
  const exercisesOnLikePage = false;

  const nameClass = `exerciseList ${exercisesActive} `;
  const nameClass2 = `exerciseListOnLikesPage  ${likesActive}`;
  const nameClassRutines = `rutineListNormal ${rutinesActive}`;
  const nameClassRutines2 = ` nameClassLikesPageUl  ${likesActive}`;

  const exerciseList = document.querySelector(".exerciseList");
  const rutineList = document.querySelector(".rutineListNormal");
  const likeRutinesList = document.querySelector(".likesRutinesMain");
  const likeExercisesList = document.querySelector(".likesExercisesMain");

  const handleClickBannerExercise = () => {
    exerciseList.classList.toggle("active");
    setExercisesActive("active");
    if (exercisesActive === "active") {
      setExercisesActive("");
    }
  };
  const handleClickBannerRutine = () => {
    rutineList.classList.toggle("active");
    setRutinesActive("active");
    if (rutinesActive === "active") {
      setRutinesActive("");
    }
  };
  const handleClickBannerLike = () => {
    likeRutinesList.classList.toggle("active");
    likeExercisesList.classList.toggle("active");
    setLikesActive("active");
    if (likesActive === "active") {
      setLikesActive("");
    }
  };

  return (
    <>
      <h2 className="exercisesTitleMain" onClick={handleClickBannerExercise}>
        ejercicios
      </h2>
      <section style={{ width: "100vw" }} className="exercises">
        {loading && <Spinner />}

        {errorMessage && <p>Error: {errorMessage}</p>}
        {exercises.length > 0 && (
          <ExerciseList
            nameClass={nameClass}
            exercises={exercises}
            likeExercises={likeExercises}
            favExercises={favExercises}
            deleteExercise={deleteExercise}
            rutines={rutines}
          />
        )}
      </section>
      <h2
        className="exercisesTitleMain"
        style={{ backgroundColor: "var(--color2)" }}
        onClick={handleClickBannerRutine}
      >
        rutinas
      </h2>
      <section style={{ width: "100vw" }} className="rutines">
        {loading && <Spinner />}

        {errorMessage && <p>Error: {errorMessage}</p>}
        {exercises.length > 0 && (
          <RutinesListNormal
            nameClassRutines={nameClassRutines}
            rutines={rutines}
            likeRutines={likeRutines}
            favRutines={favRutines}
            deleteRutine={deleteRutine}
          />
        )}
      </section>
      <h2
        className="exercisesTitleMain"
        style={{ backgroundColor: "var(--color1)" }}
        onClick={handleClickBannerLike}
      >
        me gustas
      </h2>
      <section style={{ paddingLeft: "4rem" }}>
        <section className={`likesExercisesMain ${likesActive}`}>
          <h2 className={`exerciseListOnLikesPageTitle ${likesActive} `}>
            EJERCICIOS
          </h2>
          {loading && <Spinner />}

          {errorMessage && <p>Error: {errorMessage}</p>}
          {exercises.length > 0 && (
            <ExerciseList
              nameClass={nameClass2}
              exercises={likesExercises}
              likeExercises={likeExercises}
              favExercises={favExercises}
              deleteExercise={deleteExercise}
              title={exercisesOnLikePage}
              rutines={rutines}
            />
          )}
        </section>
        <section className={`likesRutinesMain ${likesActive}`}>
          <h2 className={`rutineListOnLikesPageTitle ${likesActive}`}>
            RUTINAS
          </h2>

          {rutines.length > 0 && (
            <RutinesListNormal
              nameClassRutines={nameClassRutines2}
              rutines={likesRutines}
              likeRutines={likeRutines}
              favRutines={favRutines}
              deleteRutine={deleteRutine}
            />
          )}
        </section>
      </section>
      <h2 className="exercisesTitleMainWip" style={{ height: "140px" }}>
        <Link to="/wip">wip</Link>
      </h2>
    </>
  );
};

export default ExercisesPage;
