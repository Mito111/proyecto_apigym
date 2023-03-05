/* eslint-disable no-useless-escape */
import useUsers from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import Modal2 from "../Modal2";
import "./style.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const { user, setUser, errorMessage, setErrorMessage } = useUsers();

  const { setToken } = useTokenContext();

  const [showModalError, setShowModalError] = useState(false);

  const [tempVal, setTempVal] = useState("");
  const [tempPass, setTempPass] = useState("");
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="loginFormDiv">
      <form
        className="loginForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const password = user.password;
            const res = await fetch("http://localhost:4000/users/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user, password }),
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setToken(body.data.token);
            navigate("/exercises");
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setShowModalError(true);
          }
        }}
      >
        <label htmlFor="user">Nombre de usuario o email:</label>
        <input
          id="user"
          value={tempVal}
          onChange={(event) => {
            setTempVal(event.target.value);
          }}
          placeholder="User_99 o email@email.com"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={tempPass}
          onChange={(event) => {
            setTempPass(event.target.value);
          }}
          placeholder="******"
        />
        <button
          onClick={() => {
            if (emailRegex.test(tempVal)) {
              setUser({ email: tempVal, password: tempPass });
            } else {
              setUser({ username: tempVal, password: tempPass });
            }
          }}
        >
          Log-In
        </button>
      </form>
      {showModalError && (
        <Modal2 setShowModalError={setShowModalError}>
          <p>{errorMessage} </p>{" "}
        </Modal2>
      )}
    </div>
  );
};

export default LoginForm;
