import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ExercisesPage from "./pages/ExercisesPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage/index.js";
import HeaderLanding from "./components/HeaderLanding";
import { useTokenContext } from "./contexts/TokenContext";
import NewExerciseForm from "./components/NewExerciseForm/index.js";
import OneExercisePage from "./pages/OneExercisePage/index.js";
import ProfilePage from "./pages/ProfilePage";

// vamos a hacer un cambio de prueba

// mE ACARGUE LO DE ARRIBA PA VERT SI FUNCIONA 

// BORRE COSAS ASI QUE AVEWR SI NO DAN OPROBLEMAS 

function App() {
  const { token } = useTokenContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderLanding />} />
        <Route path="/login" element={<HeaderLanding />} />
        <Route path="/register" element={<HeaderLanding />} />
        <Route path="*" element={<Header />} />
      </Routes>

      <main>
        <Routes>
          <Route
            path="/"
            element={!token ? <LandingPage /> : <Navigate to="/home" />}
          />

          <Route
            path="/home"
            element={!token ? <Navigate to="/" /> : <ExercisesPage />}
          />
          <Route
            path="/exercises"
            element={!token ? <Navigate to="/" /> : <Navigate to="/home" />}
          />
          <Route path="/exercises/:id" element={<OneExercisePage />} />

          <Route
            path="/exercises/new"
            element={!token ? <Navigate to="/" /> : <NewExerciseForm />}
          />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="*"
            element={<Navigate to={token === "" ? "/" : "/home"} />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
