import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";

const useRutineById = (id) => {
  const [rutine, setRutine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useTokenContext();

  const likeRutine = ({ newNumOfLikes, likedByLoggedUser }) => {
    rutine.likedByMe = likedByLoggedUser;
    rutine.likes = newNumOfLikes;

    setRutine({ ...rutine });
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

        const res = await fetch(`http://localhost:4000/rutines/${id}`, {
          headers,
        });

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setRutine(body.data.rutine);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryById();
  }, [id, setErrorMessage, setRutine, setLoading]);

  return { rutine, loading, errorMessage, setRutine, likeRutine };
};

export default useRutineById;
