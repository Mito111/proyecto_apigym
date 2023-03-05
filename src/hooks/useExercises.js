import { useState, useEffect } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import useLocalStorage from "./useLocalStorage";
import { useSearchParams } from "react-router-dom";

const useExercises = () => {
  const [exercises, setExercises] = useLocalStorage("exercises", []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [nameMedia, setNameMedia] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { token } = useTokenContext();

  const likeExercises = ({ id, newNumOfLikes, likedByLoggedUser }) => {
    const index = exercises.findIndex((exercise) => exercise.id === id);
    exercises[index].likedByMe = likedByLoggedUser;
    exercises[index].likes = newNumOfLikes;

    setExercises([...exercises]);
  };

  const deleteExercise = ({ id }) => {
    const newExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newExercises);
  };

  const favExercises = ({
    idExercise,
    idRutine,
    newNumOfExercises,
    favedByLoggedUser,
    rutines,
  }) => {
    const index = exercises.findIndex((exercise) => exercise.id === idExercise);

    const indexRutine = rutines.findIndex((rutine) => rutine.id === idRutine);

    exercises[index].favedByMe = favedByLoggedUser;

    rutines[indexRutine].exercisesOnRutine = newNumOfExercises;

    setExercises([...exercises]);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        let headers = {};
        if (token) {
          headers = { Authorization: token };
        }

        const res = await fetch(
          `http://localhost:4000/exercises?${searchParams.toString()}`,
          {
            method: "GET",
            headers,
          }
        );
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setExercises(body.data.exercises);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [token, setExercises, searchParams]);

  return {
    name,
    setName,
    description,
    setDescription,
    muscleGroup,
    setMuscleGroup,
    nameMedia,
    setNameMedia,
    likeExercises,
    favExercises,
    deleteExercise,
    exercises,
    setExercises,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
  };
};

export default useExercises;
