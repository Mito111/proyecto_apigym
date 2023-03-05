import LoginForm from "../../components/LoginForm";
import "./style.css";

const LoginPage = () => {
  return (
    <>
      <h2 className="loginPageTitle">Inicia sesión en ApiGym</h2>
      <section>
        <LoginForm />
      </section>
      <div className="bannerDownLoginPage"></div>
    </>
  );
};

export default LoginPage;
