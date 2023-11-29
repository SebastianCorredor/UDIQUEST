import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/admin/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';
import Footer from '../components/Footer';
import PollsterPage from '../pages/PollsterPage';
import SurveyPage from '../pages/SurveyPage';
import PointSurveyPage from '../pages/PointSurveyPage';
import StudentPage from '../pages/StudentPage';

export default function AppRouters() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin/user" element={<AdminPage />} />

        <Route path="/encuestador" element={<PollsterPage />} />

        <Route path="/encuestador/agregarEncuesta" element={<SurveyPage />} />

        <Route path="/encuestador/encuesta" element={<PointSurveyPage />} />

        <Route path="/estudiante" element={<StudentPage />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}
