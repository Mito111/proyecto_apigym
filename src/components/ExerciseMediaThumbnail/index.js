const ExerciseMediaThumbnail = ({ nameMedia, name }) => {
  return (
    <ul>
      <li>
        <img
          src={`http://localhost:4000/${nameMedia}`}
          alt={name}
          width="150px"
        />
      </li>
    </ul>
  );
};

export default ExerciseMediaThumbnail;
