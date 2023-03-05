import Rutine from "../Rutine";

import "./style.css";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const RutinesListNormal = ({
  rutines,
  likeRutines,
  favRutines,
  deleteRutine,
  nameClassRutines,
}) => {
  const nameClass = "rutineOnRutinesPage";
  const rutineNormal = true;

  return (
    <ul className={` ${nameClassRutines} `}>
      {rutines.map((rutine) => {
        const {
          id,
          name,

          description,
          idUser,
          username,
          duration,
          exercisesOnRutine,
          likes,
          likedByMe,
          addedByMe,
          owner,
          createdAt,
          favsRutinesIds,
        } = rutine;

        return (
          <li key={id}>
            {/* Mirar si utilizar el Link, para enviar al usuario a la rutina que acaba de crear*/}
            <Link to={`/rutines/${id}`}>
              <Rutine
                nameClass={nameClass}
                id={id}
                name={name}
                description={description}
                ownerId={idUser}
                ownerUsername={username}
                duration={duration}
                exercisesOnRutine={exercisesOnRutine}
                likes={likes}
                likedByMe={likedByMe}
                addedByMe={addedByMe}
                likeRutines={likeRutines}
                favRutines={favRutines}
                deleteRutine={deleteRutine}
                owner={owner}
                createdAt={createdAt}
                favsRutinesIds={favsRutinesIds}
                rutineSelect={rutineNormal}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RutinesListNormal;
