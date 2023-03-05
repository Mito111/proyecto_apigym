import { useRef, useState } from "react";
import useExercises from "../../hooks/useExercises";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import Modal2 from "../Modal2";
import "./style.css";

const NewExerciseForm = ({ setNewExercise }) => {
  const {
    name,
    setName,
    description,
    setDescription,
    muscleGroup,
    setMuscleGroup,
    errorMessage,
    setErrorMessage,
  } = useExercises();

  const [showModalError, setShowModalError] = useState(false);

  const imageInputRef = useRef();

  const navigate = useNavigate();

  const { token } = useTokenContext();

  return (
    <section className="newExerciseFormSection">
      <h4>Añade un nuevo ejercicio</h4>
      <div className="newExerciseForm">
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();

              const media = imageInputRef.current.files;
              const formData = new FormData();

              // Metemos en el formData los datos que ha introducido el usuario en el formulario
              formData.set("name", name);
              formData.set("description", description);
              formData.set("muscleGroup", muscleGroup);

              // Si ha subido imágenes, hacemos un bucle que añade las imágenes al formData
              if (media.length) {
                for (const file of media) {
                  formData.set("media", file);
                }
              }

              // Hacemos una petición POST a la API y mandamos el formData en el body. También mandamos el header Authorization con el token
              const res = await fetch("http://localhost:4000/exercises", {
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
              setNewExercise(false);
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
          <label htmlFor="muscleGroup">Grupo Muscular:</label>
          <input
            id="muscleGroup"
            value={muscleGroup}
            onChange={(e) => {
              setMuscleGroup(e.target.value);
            }}
            required
          />

          <label htmlFor="media">Imagen:</label>
          <input
            id="media"
            type="file"
            ref={imageInputRef}
            accept="    image/jpg"
            required
          />
          <button
            className="newExerciseButtons"
            onClick={() => {
              navigate("/home");
            }}
          >
            Nuevo ejercicio
          </button>
        </form>
      </div>
      {showModalError && (
        <Modal2 setShowModalError={setShowModalError}>
          <p>{errorMessage}</p>
        </Modal2>
      )}
    </section>
  );
};

export default NewExerciseForm;
