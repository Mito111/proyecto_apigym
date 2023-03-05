import "./style.css";
import { useNavigate } from "react-router-dom";
import useExercises from "../../hooks/useExercises";
import { createBrowserHistory } from "history";
import buttonCancel from "../../assets/images/buttonCancel.png";

const Modal = ({ children, setShowModal }) => {
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage } = useExercises();
  const history = createBrowserHistory();

  const newExercise = document.querySelector(".newExercise");
  const newRutine = document.querySelector(".newRutine");
  return (
    <div
      className="modalBack"
      onClick={(event) => {
        event.preventDefault();
        setShowModal(false);
        setErrorMessage("");
        if (newExercise) {
          newExercise.classList.remove("clicked");
        }
        if (newRutine) {
          newRutine.classList.remove("clicked");
        }
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
      <img
        src={buttonCancel}
        alt="buttonCancel"
        className="buttonCancel"
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.preventDefault();
          setShowModal(false);
          setErrorMessage("");
          if (newExercise) {
            newExercise.classList.remove("clicked");
          }
          if (newRutine) {
            newRutine.classList.remove("clicked");
          }
        }}
      ></img>
    </div>
  );
};

export default Modal;
