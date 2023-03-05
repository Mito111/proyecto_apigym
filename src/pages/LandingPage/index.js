import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import useRutines from "../../hooks/useRutines";

import RutinesListNormal from "../../components/RutinesListNormal";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./style.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const {
    exercises,
    errorMessage,

    likeExercises,
    favExercises,
    deleteExercise,
  } = useExercises();

  const { rutines, likeRutines, favRutines, deleteRutine } = useRutines();

  const exerciseList = document.querySelector(".exerciseList");
  const rutineList = document.querySelector(".rutineListNormal");

  const [exercisesActive, setExercisesActive] = useLocalStorage(
    "exercisesActive",
    ""
  );
  const [rutinesActive, setRutinesActive] = useLocalStorage(
    "rutinesActive",
    ""
  );
  const nameClassRutines = `rutineListNormal ${rutinesActive}`;
  const nameClass = `exerciseList ${exercisesActive} `;

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

  return (
    <>
      <h2 className="landingTitle">
        Bienvenido a APIGYM.<br></br>Tu aplicación de entrenamiento
        personalizado.
      </h2>
      <section className="exercisesLandingSection">
        <h2 className="exercisesTitleMain" onClick={handleClickBannerExercise}>
          ejercicios
        </h2>
        <section style={{ width: "100vw" }} className="exercises">
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
      </section>
      <section className="rutinesLandingSection">
        <h2
          className="exercisesTitleMain"
          style={{ backgroundColor: "var(--color2)" }}
          onClick={handleClickBannerRutine}
        >
          rutinas
        </h2>
        <section style={{ width: "100vw" }} className="rutines">
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
      </section>
      <h2 className="exercisesTitleMainWip" style={{ height: "140px" }}>
        <Link to="/wip">wip</Link>
      </h2>
    </>
  );
};

export default LandingPage;
