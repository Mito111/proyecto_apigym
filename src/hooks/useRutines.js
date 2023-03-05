import { useState, useEffect } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import useLocalStorage from "./useLocalStorage";
import { useSearchParams } from "react-router-dom";
import useExercises from "./useExercises";

const useRutines = () => {
  const [rutines, setRutines] = useLocalStorage("rutines", []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { token } = useTokenContext();

  const { favExercises } = useExercises();

  const likeRutines = ({ id, newNumOfLikes, likedByLoggedUser }) => {
    const index = rutines.findIndex((rutine) => rutine.id === id);
    rutines[index].likedByMe = likedByLoggedUser;

    rutines[index].likes = newNumOfLikes;

    setRutines([...rutines]);
  };

  const deleteRutine = ({ id }) => {
    const newRutines = rutines.filter((rutine) => rutine.id !== id);
    setRutines(newRutines);
  };

  const favRutines = ({ id, favedByLoggedUser }) => {
    const index = rutines.findIndex((rutine) => rutine.id === id);
    rutines[index].favedByMe = favedByLoggedUser;
  };

  useEffect(() => {
    const fetchRutines = async () => {
      try {
        setLoading(true);
        let headers = {};
        if (token) {
          headers = { authorization: token };
        }

        const res = await fetch(
          `http://localhost:4000/rutines?${searchParams.toString()}`,
          {
            method: "GET",
            headers,
          }
        );
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setRutines(body.data.rutines);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRutines();
  }, [token, setRutines, searchParams]);

  return {
    rutines,
    likeRutines,
    favRutines,
    deleteRutine,
    name,
    setName,
    description,
    setDescription,
    duration,
    setDuration,
    setRutines,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
  };
};

export default useRutines;
