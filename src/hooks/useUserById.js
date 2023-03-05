import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";

const useUserById = (id) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchEntryById = async () => {
      try {
        setLoading(true);
        let headers = {};
        if (token) {
          headers = { Authorization: token };
        }
        const res = await fetch(`http://localhost:4000/users/id/${id}`, {
          headers,
        });

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setUser(body.data.user);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryById();
  }, [id, setErrorMessage, setUser, setLoading]);

  return { user, loading, errorMessage };
};

export default useUserById;
