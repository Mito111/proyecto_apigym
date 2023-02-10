const ExerciseMedia = ({ nameMedia, name }) => {
  return (
    <ul>
      <li>
        <img src={`http://localhost:4000/${nameMedia}`} alt={name} />
      </li>
    </ul>
  );
};

export default ExerciseMedia;
