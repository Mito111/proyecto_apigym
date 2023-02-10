import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import Spinner from "../../components/Spinner";

const LandingPage = () => {
  const { exercises, errorMessage, loading } = useExercises();

  return (
    <section>
      <h2>
        Bienvenido a APIGYM. Tu aplicación de entrenamiento personalizado.
      </h2>

      {loading && <Spinner />}

      {errorMessage && <p>Error: {errorMessage}</p>}
      {exercises.length > 0 && <ExerciseList exercises={exercises} />}
    </section>
  );
};

export default LandingPage;
