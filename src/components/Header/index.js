import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

import "./style.css";
import { Avatar } from "@mui/material";
import defaultAvatar from "../../assets/images/defaultAvatar.jpg";

import { useState, useRef } from "react";
import Modal from "../Modal";
import NewExerciseForm from "../NewExerciseForm";
import NewRutineForm from "../NewRutineForm";

import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { token, setToken, loggedUser } = useTokenContext();
  const { username, avatar, role } = loggedUser;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState(false);
  const [newRutine, setNewRutine] = useState(false);

  const navRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuButtonHover = () => {
    clearTimeout(timeoutId);
    setShowMenu(true);
  };

  const handleMenuButtonHoverDelay = () => {
    setTimeoutId(
      setTimeout(() => {
        setShowMenu(false);
      }, 1000)
    );
  };

  return (
    <>
      <header>
        <h1 className="title">
          <a href="/" style={{ color: "white", fontSize: "95px" }}>
            APIGYM
          </a>
        </h1>

        <nav
          className={showMenu ? "active" : ""}
          ref={navRef}
          onMouseEnter={handleMenuButtonHover}
          onMouseLeave={handleMenuButtonClick}
        >
          <ul className="menuButtons">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/rutines">Rutinas</Link>
            </li>
            <li>
              <Link to="/likes">Me gustas</Link>
            </li>
            <li>
              <div
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                  event.preventDefault();

                  event.target.classList.add("clicked");
                  setNewRutine(true);
                }}
                className="newRutine"
              >
                Nueva rutina
              </div>
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
                    className="newExercise"
                  >
                    Nuevo ejercicio
                  </div>
                </li>
              </>
            )}
            {token && (
              <>
                <li></li>
                <li>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <LogoutIcon></LogoutIcon>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div
          className="menuButton"
          onMouseEnter={handleMenuButtonHover}
          onMouseLeave={handleMenuButtonHoverDelay}
        >
          <NavLink to="/profile" className={"avatarBurgerMenu"}>
            <Avatar
              alt={`${username} avatar`}
              src={avatar ? `http://localhost:4000/${avatar}` : defaultAvatar}
              sx={{ width: 80, height: 80 }}
            />
          </NavLink>
        </div>
      </header>
      {newExercise && (
        <Modal setShowModal={setNewExercise}>
          <NewExerciseForm setNewExercise={setNewExercise} />
        </Modal>
      )}
      {newRutine && (
        <Modal setShowModal={setNewRutine}>
          <NewRutineForm setNewRutine={setNewRutine} />
        </Modal>
      )}
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <div className="logout">
            <p style={{ fontWeight: "bold" }}>
              Estás seguro que quieres cerrar sesión?
            </p>
            <p>Esperamos volver a verte pronto</p>
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
    </>
  );
};

export default Header;
