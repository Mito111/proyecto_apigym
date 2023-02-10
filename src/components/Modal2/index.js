import "./style.css";
import { useNavigate } from "react-router-dom";
import useExercises from "../../hooks/useExercises";

const Modal2 = ({ children, showModalError, setShowModalError }) => {
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage } = useExercises();

  return (
    <div
      className="modalBack2"
      onClick={(event) => {
        setShowModalError(false);
        setErrorMessage("");

        event.preventDefault();
        return;
      }}
    >
      <div
        className="modalContainer2"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal2;
