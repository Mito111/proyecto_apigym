import Exercise from "../../components/Exercise";
import useExerciseById from "../../hooks/useExerciseById";
import Spinner from "../../components/Spinner";
import { useParams, Link } from "react-router-dom";
import BackArrow from "../../components/BackArrow";

const OneExercisePage = () => {
  const { id } = useParams();
  const { exercise, errorMessage, loading, likeExercises } =
    useExerciseById(id);

  const {
    name,
    description,
    muscleGroup,
    ownerId,
    likes,
    likedByMe,
    owner,
    createdAt,
    nameMedia,
  } = exercise;

  return (
    <section>
      <div className="oneExercise">
        <Link to="/home">
          <BackArrow></BackArrow>
        </Link>
        <h2>Ejercicio</h2>
      </div>

      {loading && <Spinner />}

      {errorMessage && <p>Error: {errorMessage}</p>}
      {Object.values(exercise).length > 0 && (
        <Exercise
          id={id}
          name={name}
          description={description}
          muscleGroup={muscleGroup}
          ownerId={ownerId}
          likes={likes}
          likedByMe={likedByMe}
          likeExercises={likeExercises}
          owner={owner}
          createdAt={createdAt}
          nameMedia={nameMedia}
        />
      )}
    </section>
  );
};

export default OneExercisePage;
