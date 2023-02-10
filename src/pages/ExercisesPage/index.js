import ExerciseList from "../../components/ExerciseList";
import useExercises from "../../hooks/useExercises";
import Spinner from "../../components/Spinner";

const ExercisesPage = () => {
  const { exercises, errorMessage, loading, likeExercises, deleteExercise } =
    useExercises();

  return (
    <section>
      <h2>Ejercicios</h2>

      {loading && <Spinner />}

      {errorMessage && <p>Error: {errorMessage}</p>}
      {exercises.length > 0 && (
        <ExerciseList
          exercises={exercises}
          likeExercises={likeExercises}
          deleteExercise={deleteExercise}
        />
      )}
    </section>
  );
};

export default ExercisesPage;
