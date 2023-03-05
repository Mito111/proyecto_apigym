import RegisterForm from "../../components/RegisterForm";
import "./style.css";

const RegisterPage = () => {
  return (
    <>
      <h2 className="registerPageTitle">Página de registro</h2>
      <section>
        <RegisterForm />
      </section>
      <div className="bannerDownRegisterPage"></div>
    </>
  );
};

export default RegisterPage;
