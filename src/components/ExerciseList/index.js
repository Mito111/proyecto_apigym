import Exercise from "../Exercise";
import { Link } from "react-router-dom";
import { useState } from "react";

const ExerciseList = ({ exercises, likeExercises, deleteExercise }) => {
  const [thumbnail, setThumbnail] = useState(true);

  return (
    <ul>
      {exercises.map((exercise) => {
        const {
          id,
          name,
          description,
          muscleGroup,
          idUser,
          likes,
          likedByMe,
          owner,
          createdAt,
          nameMedia,
        } = exercise;

        return (
          <li key={id}>
            <Link to={`/exercises/${id}`}>
              <Exercise
                id={id}
                name={name}
                description={description}
                muscleGroup={muscleGroup}
                ownerId={idUser}
                likes={likes}
                likedByMe={likedByMe}
                likeExercises={likeExercises}
                deleteExercise={deleteExercise}
                owner={owner}
                createdAt={createdAt}
                nameMedia={nameMedia}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ExerciseList;
