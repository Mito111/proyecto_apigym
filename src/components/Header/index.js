import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

import "./style.css";
import { Avatar } from "@mui/material";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";
import Settings from "../SettingSVG/Settings";
import { useState } from "react";
import Modal from "../Modal";
import NewExerciseForm from "../NewExerciseForm";

const Header = () => {
  const { token, setToken, loggedUser } = useTokenContext();
  const { username, avatar, role } = loggedUser;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState(false);

  return (
    <header>
      <h1>
        <Link to="/">APIGYM</Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          {!token && (
            <>
              <li>
                <NavLink to="/register">Registro</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}

          {role !== "normal" && (
            <>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    event.preventDefault();

                    event.target.classList.add("clicked");
                    setNewExercise(true);
                  }}
                  className="nuevoEjercicio"
                >
                  Nuevo ejercicio
                </div>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <NavLink to="/profile">
                  <Avatar
                    alt={`${username} avatar`}
                    src={
                      avatar ? `http://localhost:4000/${avatar}` : defaultAvatar
                    }
                  />
                </NavLink>
              </li>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Settings></Settings>
                </div>
              </li>
            </>
          )}

          {showModal && (
            <Modal setShowModal={setShowModal}>
              <div>
                <p>Quieres cerrar sesión?</p>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();

                    setToken("");
                    navigate("/");
                  }}
                >
                  Hasta Luego!
                </button>
              </div>
            </Modal>
          )}

          {newExercise && (
            <Modal setShowModal={setNewExercise}>
              <NewExerciseForm
                setNewExercise={setNewExercise}
              ></NewExerciseForm>
            </Modal>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
