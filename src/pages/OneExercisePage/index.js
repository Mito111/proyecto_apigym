import Exercise from "../../components/Exercise";
import useExerciseById from "../../hooks/useExerciseById";
import Spinner from "../../components/Spinner";
import { useParams, Link, useNavigate } from "react-router-dom";

import useExercises from "../../hooks/useExercises";
import useRutines from "../../hooks/useRutines";
import "./style.css";
import { ArrowBack } from "@mui/icons-material";

const OneExercisePage = () => {
  let { id } = useParams();
  const { exercise, errorMessage, loading, likeExercises } =
    useExerciseById(id);
  const { deleteExercise, favExercises } = useExercises();

  const { rutines } = useRutines();

  const navigate = useNavigate();
  const {
    name,
    description,
    muscleGroup,
    idUser,
    username,
    likes,
    likedByMe,
    favedByMe,
    owner,
    createdAt,
    nameMedia,
  } = exercise;
  id = parseInt(id);
  return (
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
          {name}
        </h2>
      </div>

      {loading && <Spinner />}

      {errorMessage && <p>Error: {errorMessage}</p>}
      {Object.values(exercise).length > 0 && (
        <div className="oneExerciseArticle">
          <Exercise
            id={id}
            name={name}
            description={description}
            muscleGroup={muscleGroup}
            ownerId={idUser}
            ownerUsername={username}
            likes={likes}
            likedByMe={likedByMe}
            favedByMe={favedByMe}
            likeExercises={likeExercises}
            favExercises={favExercises}
            deleteExercise={deleteExercise}
            owner={owner}
            createdAt={createdAt}
            nameMedia={nameMedia}
            rutines={rutines}
          />
        </div>
      )}
    </section>
  );
};

export default OneExercisePage;
