import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import VerificationEmailSent from "./pages/VerificationEmailSent";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./utils/ProtectedRoute";
import PlayQuiz from "./pages/PlayQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification-sent" element={<VerificationEmailSent />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

      </Routes>
    </Router>
  );
}

export default App;
