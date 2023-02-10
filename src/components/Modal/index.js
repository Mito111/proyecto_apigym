import "./style.css";
import { useNavigate } from "react-router-dom";
import useExercises from "../../hooks/useExercises";
import { createBrowserHistory } from "history";

const Modal = ({ children, setShowModal }) => {
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage } = useExercises();
  const history = createBrowserHistory();

  const nuevoEjercicio = document.querySelector(".nuevoEjercicio");
  return (
    <div
      className="modalBack"
      onClick={(event) => {
        event.preventDefault();
        setShowModal(false);
        setErrorMessage("");
        nuevoEjercicio.classList.remove("clicked");
      }}
    >
      <div
        className="modalContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
