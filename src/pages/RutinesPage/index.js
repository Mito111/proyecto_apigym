import RutinesListNormal from "../../components/RutinesListNormal";
import useRutines from "../../hooks/useRutines";
import useExercises from "../../hooks/useExercises";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const RutinesPage = () => {
  const {
    rutines,
    likeRutines,
    favRutines,
    deleteRutine,
    errorMessage,

    loading,
  } = useRutines();
  const nameClassRutines = "rutineListNormal";
  const navigate = useNavigate();
  return (
    <section style={{ width: "100vw" }}>
      <div className="exercisesTitle" style={{ height: "100px" }}>
        <div
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          <ArrowBack fontSize="large"></ArrowBack>
        </div>

        <h2 style={{ fontSize: "60px", marginTop: "0", paddingLeft: "1rem" }}>
          Rutinas
        </h2>
      </div>

      {loading && <Spinner />}

      {errorMessage && <p>Error: {errorMessage}</p>}
      {rutines.length > 0 && (
        <RutinesListNormal
          nameClassRutines={nameClassRutines}
          rutines={rutines}
          likeRutines={likeRutines}
          favRutines={favRutines}
          deleteRutine={deleteRutine}
        />
      )}
    </section>
  );
};

export default RutinesPage;
