import getTimeAgo from "../utils/getTimeAgo";
import LikeButton from "../LikeButton";
import "./style.css";

const Rutine = ({
  id,
  name,
  description,
  ownerUsername,
  duration,
  exercisesOnRutine,
  likes,
  likedByMe,
  likeRutines,

  owner,
  createdAt,
  nameClass,
  rutineSelect,
}) => {
  const type = "rutine";

  return (
    <article className={owner ? `ownRutine ${nameClass}` : `${nameClass}`}>
      <header>
        <h3>{name}</h3>
        <p> {description}</p>
      </header>
      <p>Duración estimada: {duration}</p>
      <p>Esta rutina contiene {exercisesOnRutine} ejercicios</p>

      <footer>
        <div>
          <p className="entryDateAuthor">
            Creada por {owner ? "ti " : `${ownerUsername} `}
            {getTimeAgo(new Date(createdAt))}
          </p>
        </div>
        {rutineSelect && (
          <LikeButton
            type={type}
            id={id}
            likes={likes}
            likedByMe={likedByMe}
            likeType={likeRutines}
          ></LikeButton>
        )}
      </footer>
    </article>
  );
};

export default Rutine;
