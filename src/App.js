import "./App.css";

// Importamos el CSS de App y de react toastify
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

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
import OwnProfilePage from "./pages/OwnProfilePage";
import ProfilePage from "./pages/ProfilePage";
import LikesPage from "./pages/LikesPage";
import RutinesPage from "./pages/RutinesPage";
import OneRutinePage from "./pages/OneRutinePage";
import WipPage from "./pages/WipPage";

function App() {
  const { token } = useTokenContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderLanding />} />
        <Route path="/login" element={<HeaderLanding />} />
        <Route path="/register" element={<HeaderLanding />} />
        <Route path="*" element={!token ? <HeaderLanding /> : <Header />} />
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
          <Route
            path="/rutines"
            element={!token ? <Navigate to="/" /> : <RutinesPage />}
          />
          <Route path="/exercises/:id" element={<OneExercisePage />} />
          <Route path="rutines/:id" element={<OneRutinePage />} />

          <Route
            path="/exercises/new"
            element={!token ? <Navigate to="/" /> : <NewExerciseForm />}
          />
          <Route
            path="/likes"
            element={!token ? <Navigate to="/" /> : <LikesPage />}
          />

          <Route path="/wip" element={<WipPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/profile" element={<OwnProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />

          <Route
            path="*"
            element={<Navigate to={token === "" ? "/" : "/home"} />}
          />
        </Routes>
      </main>
      <ToastContainer position="bottom-center" pauseOnHover theme="dark" />
      <Footer />
    </>
  );
}

export default App;
