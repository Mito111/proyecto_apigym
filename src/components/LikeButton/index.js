import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./style.css";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import useRutines from "../../hooks/useRutines";
import useExercises from "../../hooks/useExercises";
import useRutineById from "../../hooks/useRutineById";
import { useParams } from "react-router-dom";

const LikeButton = ({ id, likes, likedByMe, likeType, type }) => {
  const { token } = useTokenContext();
  const [showNoLogged, setShowNoLogged] = useState(false);
  const { setRutines } = useRutines();
  const { setExercises } = useExercises();
  const { id: idRutine } = useParams();
  const { setRutine } = useRutineById(idRutine);
  let likesCheat = "";
  let likedCheat = "";

  return (
    <span>
      <p>{likes} Me gusta</p>

      <span
        onClick={async (event) => {
          event.preventDefault();
          if (!token) {
            setShowNoLogged(true);
          }

          const res = await fetch(
            `http://localhost:4000/${type}s/${id}/likes`,
            {
              method: "POST",
              headers: { authorization: token },
            }
          );

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }
          if (type === "exercise") {
            likesCheat = body.data.exercise.likes;
            likedCheat = body.data.exercise.likedByMe;
          }
          if (type === "rutine") {
            likesCheat = body.data.rutine.likes;
            likedCheat = body.data.rutine.likedByMe;
          }

          likeType({
            id: id,
            newNumOfLikes: likesCheat,
            likedByLoggedUser: likedCheat,
          });
          setExercises(body.data.exercises);
          setRutines(body.data.rutines);
          setRutine(body.data.rutines[id]);
        }}
      >
        {likedByMe ? (
          <FavoriteIcon
            fontSize="large"
            className="liked"
            style={{ cursor: "pointer", color: "var(--color3)" }}
          />
        ) : (
          <FavoriteBorderIcon
            fontSize="large"
            className="noLiked"
            style={{ cursor: "pointer" }}
          />
        )}
      </span>
      {showNoLogged && (
        <Modal setShowModal={setShowNoLogged}>
          <div className="logout">
            <h3>
              Dale Like a un ejercicio para mostrar tu interés y guardarlo entre
              tus ejercicios preferidos.
            </h3>
            <p>
              Unete a ApiGym ahora mismo para poder darle Like a este ejercicio
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

export default LikeButton;
