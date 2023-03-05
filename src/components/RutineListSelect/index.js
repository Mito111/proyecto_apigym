import Rutine from "../Rutine";

import "./style.css";

import { useTokenContext } from "../../contexts/TokenContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RutineListSelect = ({
  rutines,
  setRutines,
  likeRutines,
  favRutines,
  deleteRutine,
  favExercises,
  idExercise,
  setShowDropdown,
}) => {
  const { token } = useTokenContext();
  const nameClass = "rutine";
  const rutineSelect = false;
  return (
    <ul className="rutineListSelect">
      {rutines.map((rutine) => {
        const {
          id,
          name,

          description,
          idUser,
          username,
          duration,
          exercisesOnRutine,

          addedByMe,
          owner,
          createdAt,
          favsRutinesIds,
        } = rutine;

        const exerciseAlreadyAdded = favsRutinesIds.includes(
          idExercise.toString()
        );

        return (
          <li key={id}>
            {/* Mirar si utilizar el Link, para enviar al usuario a la rutina que acaba de crear*/}
            <div
              onClick={async (e) => {
                e.preventDefault();
                if (exerciseAlreadyAdded) {
                  toast.info(
                    `¡Este ejercicio ya ha sido añadido a esta rutina anteriormente!`,
                    {
                      autoClose: 5000,
                      closeOnClick: true,
                      theme: "light",
                    }
                  );
                }

                const res = await fetch(
                  `http://localhost:4000/exercises/${idExercise}/rutines/${id}/favorites`,
                  {
                    method: "POST",
                    headers: { authorization: token },
                  }
                );

                const body = await res.json();

                favExercises({
                  idExercise,
                  idRutine: id,
                  newNumOfExercises: body.data.exercisesOnRutine,

                  favedByLoggedUser: body.data.favedByMe,
                  rutines,
                });

                setRutines(body.data.rutines);

                setShowDropdown(false);
                // navigate(0);
                toast.success(
                  `¡El ejercicio ha sido añadido a tu rutina con éxito!`
                  // {
                  //   autoClose: 5000,
                  //   closeOnClick: true,
                  //   theme: "light",
                  // }
                );
              }}
            >
              <Rutine
                nameClass={nameClass}
                id={id}
                name={name}
                description={description}
                ownerId={idUser}
                ownerUsername={username}
                duration={duration}
                exercisesOnRutine={exercisesOnRutine}
                addedByMe={addedByMe}
                likeRutines={likeRutines}
                favRutines={favRutines}
                deleteRutine={deleteRutine}
                owner={owner}
                createdAt={createdAt}
                rutineSelect={rutineSelect}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RutineListSelect;
