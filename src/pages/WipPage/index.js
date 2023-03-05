import LoginForm from "../../components/LoginForm";
import "./style.css";

const WipPage = () => {
  return (
    <>
      <div className="landingTitle">
        ESTAMOS TRABAJANDO EN MEJORAR ESTA PÁGINA.
      </div>
      <div className="infoWip">
        <div>
          Disculpen las molestias, y esperemos implementar rápido todas las
          mejoras en la empleabilidad y funcionalidad, de cara a mejorar la
          experiencia del usario
        </div>

        <ul>
          Futuras mejoras
          <li>Versión de movil optimizada</li>
          <li>Correción de errores</li>
          <li>Poder eliminar rutinas creadas</li>
          <li>Verificación de perfil autorizado para ser coach o admin</li>
          <li>
            Mejor funcionalidad de elemenos como el Burger Menu con la imagen
            del avatar del usuario
          </li>
          <li>Diseño perfeccionado, y adaptado a más soportes</li>
          <li>Un mayor soporte responsive para todo tipo de pantallas</li>
          <li>Y muchas más...</li>
        </ul>

        <div>
          Esperemos que su experiencia haya sido agradable, y que no dude en
          utilizar nuestra aplicación para organizar sus futuros entrenamientos
        </div>
      </div>
    </>
  );
};

export default WipPage;
