import Exercise from "../Exercise";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";

const ExerciseList = ({
  nameClass,
  exercises,
  likeExercises,
  favExercises,
  deleteExercise,
  title,
  rutines,
  changeIdOfExercises,
}) => {
  const [thumbnail, setThumbnail] = useState(true);

  return (
    <>
      {title && <h3 className="exercisesOnLikePage">EJERCICIOS</h3>}
      <ul className={`${nameClass} `}>
        {exercises.map((exercise) => {
          const {
            id,
            name,

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

          return (
            <li key={changeIdOfExercises ? exercises.indexOf(exercise) : id}>
              <Link to={`/exercises/${id}`}>
                <Exercise
                  id={id}
                  name={name}
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
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  rutines={rutines}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExerciseList;
