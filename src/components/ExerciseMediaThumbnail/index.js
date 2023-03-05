const ExerciseMediaThumbnail = ({ nameMedia, name }) => {
  return (
    <ul>
      <li>
        <img
          src={`http://localhost:4000/${nameMedia}`}
          alt={name}
          style={{ maxWidth: "200px", maxHeight: "250px" }}
        />
      </li>
    </ul>
  );
};

export default ExerciseMediaThumbnail;
