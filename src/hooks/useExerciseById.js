import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";

const useExerciseById = (id) => {
  const [exercise, setExercise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useTokenContext();

  const likeExercises = ({ newNumOfLikes, likedByLoggedUser }) => {
    exercise.likedByMe = likedByLoggedUser;
    exercise.likes = newNumOfLikes;

    setExercise({ ...exercise });
  };

  useEffect(() => {
    const fetchEntryById = async () => {
      try {
        if (id === undefined) {
          return;
        }
        setLoading(true);
        let headers = {};
        if (token) {
          headers = { Authorization: token };
        }
        const res = await fetch(`http://localhost:4000/exercises/${id}`, {
          headers,
        });

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setExercise(body.data.exercise);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryById();
  }, [id, setErrorMessage, setExercise, setLoading]);

  return { exercise, loading, errorMessage, likeExercises };
};

export default useExerciseById;
