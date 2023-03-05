import { Link } from "react-router-dom";
import "./style.css";

const HeaderLanding = () => {
  return (
    <header>
      <h1 className="title">
        <a href="/" style={{ color: "white", fontSize: "95px" }}>
          APIGYM
        </a>
      </h1>
      <nav className="active">
        <ul className="menuButtonsLanding">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderLanding;
