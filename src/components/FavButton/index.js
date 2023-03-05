import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./style.css";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import useRutines from "../../hooks/useRutines";
import RutineListSelect from "../RutineListSelect";

const FavButton = ({ id, favedByMe, favExercises, idExercise, rutines }) => {
  const { token } = useTokenContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoLogged, setShowNoLogged] = useState(false);

  const {
    setRutines,

    selectRutine,
  } = useRutines();

  const rutinesOwner = rutines.filter((rutine) => rutine.owner === 1);

  return (
    <span>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!token) {
            setShowNoLogged(true);
            return;
          }

          setShowDropdown(true);
        }}
      >
        {favedByMe ? (
          <BookmarkIcon
            fontSize="large"
            className="faved"
            style={{ cursor: "pointer" }}
          />
        ) : (
          <BookmarkBorderIcon
            fontSize="large"
            className="noFaved"
            style={{ cursor: "pointer" }}
          />
        )}
      </span>
      {showDropdown && (
        <Modal setShowModal={setShowDropdown}>
          <h3 className="selecRutineTitle">
            SELECCIONA LA RUTINA A LA QUE QUIERES AÑADIR EL EJERCICIO
          </h3>

          <div className="rutineOwnerList">
            <RutineListSelect
              rutines={rutinesOwner}
              setRutines={setRutines}
              selectRutine={selectRutine}
              idExercise={idExercise}
              favExercises={favExercises}
              setShowDropdown={setShowDropdown}
            ></RutineListSelect>
          </div>

          {rutinesOwner.length < 1 && <p>No tienes ninguna rutina creada</p>}
        </Modal>
      )}

      {showNoLogged && (
        <Modal setShowModal={setShowNoLogged}>
          <div className="logout">
            <h3>
              Añade un ejercicio a tus rutinas para organizar tus sesiones de
              entrenamiento y guardar tus ejercicios preferidos.
            </h3>
            <p>
              Unete a ApiGym ahora mismo para poder guardar este este ejercicio
              en alguna de tus rutinas.
            </p>
            <Link to="/login">
              <button
                style={{
                  backgroundColor: "lightgrey",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "250px",
                  cursor: "pointer",
                }}
              >
                INICIA SESIÓN
              </button>
            </Link>
            <Link to="/register">
              <button
                style={{
                  backgroundColor: "var(--color3)",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "2rem",

                  width: "225px",
                  cursor: "pointer",
                }}
              >
                REGÍSTRATE
              </button>
            </Link>
          </div>
        </Modal>
      )}
    </span>
  );
  // return (
  //   <div>
  //     <span>Likes: {likes}</span>

  //     {likedByMe ? (
  //       <div>
  //         <FavoriteIcon fontSize="large" />
  //       </div>
  //     ) : (
  //       <div>
  //         <FavoriteBorderIcon fontSize="large" />
  //       </div>
  //     )}

  //     <div
  //
  //

  //           if (likedByMe) {
  //           }
  //         } catch (error) {
  //           setShowModalError(true);
  //           setErrorMessage(error.message);
  //         }
  //       }}
  //     >
  //       {/* {showModalError && (
  //         <Modal2
  //           showModalError={showModalError}
  //           setShowModalError={setShowModalError}
  //         >
  //           {console.error("error", errorMessage)}{" "}
  //           <p>Debes de estar logeado para poder dar like a un ejercicio</p>
  //           <Link to="/login">
  //             <div className="loginButtonModal">LOG IN</div>
  //           </Link>
  //           <p>No tienes una cuenta?</p>
  //           <p>Regístrate aquí:</p>
  //           <Link to="/register">
  //             <div className="registerButtonModal">REGÍSTRATE</div>
  //           </Link>
  //           <button
  //             className="buttonCloseModal2"
  //             onClick={(event) => {
  //               event.preventDefault();
  //               setShowModalError(false);
  //             }}
  //           >
  //             Cancelar
  //           </button>
  //         </Modal2>
  //       )} */}
  //     </div>
  //   </div>
  // );
};

export default FavButton;
