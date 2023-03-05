import { useState, useEffect } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import useLocalStorage from "./useLocalStorage";

const useUsers = () => {
  const [user, setUser] = useLocalStorage("loggedUser", {
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const { loggedUser } = useTokenContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loggedUser, setUser]);

  return {
    user,
    setUser,

    errorMessage,
    setErrorMessage,
    loading,
  };
};

export default useUsers;
