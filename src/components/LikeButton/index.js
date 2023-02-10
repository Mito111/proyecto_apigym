import useExercises from "../../hooks/useExercises";

import { useTokenContext } from "../../contexts/TokenContext";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./style.css";

const LikeButton = ({ id, likes, likedByMe, likeExercises }) => {
  const { token } = useTokenContext();

  return (
    <div>
      <p>{likes} Me gusta</p>

      <div
        onClick={async (event) => {
          event.preventDefault();
          const res = await fetch(
            `http://localhost:4000/exercises/${id}/likes`,
            {
              method: "POST",
              headers: { authorization: token },
            }
          );

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }
          likeExercises({
            id: id,
            newNumOfLikes: body.data.likes,
            likedByLoggedUser: body.data.likedByMe,
          });
        }}
      >
        {likedByMe ? (
          <FavoriteIcon fontSize="large" />
        ) : (
          <FavoriteBorderIcon fontSize="large" className="noLiked" />
        )}
      </div>
    </div>
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
