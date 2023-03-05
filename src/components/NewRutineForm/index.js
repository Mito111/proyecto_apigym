import { useState } from "react";
import useRutines from "../../hooks/useRutines";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import Modal2 from "../Modal2";
import "./style.css";

const NewRutineForm = ({ setNewRutine, type }) => {
  const {
    setRutines,
    name,
    setName,
    description,
    setDescription,
    duration,
    setDuration,

    errorMessage,
    setErrorMessage,
  } = useRutines();

  const [showModalError, setShowModalError] = useState(false);

  const navigate = useNavigate();

  const { token } = useTokenContext();

  return (
    <section className="newRutineFormSection">
      <h4>crea una nueva rutina</h4>
      <div className="newRutineForm">
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();

              const formData = new FormData();

              // Metemos en el formData los datos que ha introducido el usuario en el formulario
              formData.set("name", name);
              formData.set("description", description);
              formData.set("duration", duration);

              // Hacemos una petición POST a la API y mandamos el formData en el body. También mandamos el header Authorization con el token
              const res = await fetch("http://localhost:4000/rutines", {
                method: "POST",
                headers: {
                  authorization: token,
                },
                body: formData,
              });

              // Accedemos al body de la respuesta
              const body = await res.json();

              // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
              if (!res.ok) {
                throw new Error(body.message);
              }

              setRutines(body.data.rutines);
              navigate(0);
            } catch (error) {
              // Si salta algún error lo sacamos por consola y metemos el mensaje en el estado errorMessage
              setShowModalError(true);

              setErrorMessage(error.message);
              console.error(error.message);
            }
          }}
        >
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <label>
            Descripción:
            <textarea
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </label>
          <label htmlFor="duration">Duración:</label>
          <input
            id="duration"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            required
          />
          <button
            className="newRutineButtons"
            onClick={() => {
              navigate("/home");
            }}
          >
            Nueva rutina
          </button>
        </form>{" "}
      </div>
      {showModalError && (
        <Modal2 setShowModalError={setShowModalError}>
          <p>{errorMessage}</p>
        </Modal2>
      )}
    </section>
  );
};

export default NewRutineForm;
