import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import PasswordRecovery from './pages/PasswordRecoveryPage';
import ResetPassword from './pages/ResetPasswordPage';
import LoadingPage from './pages/LoadingPage';
import Dashboard from './pages/DashboardPage';
import CreateProject from './pages/CreateProjectPage';
import AddSessionType from './pages/AddSessionTypePage';
import VideoPage from './pages/VideoPage';
import ImagePage from './pages/ImagePage';
import AudioPage from './pages/AudioPage';
import OpenProjecPage from './pages/OpenProjectPage';
import OpenSessionPage from './pages/OpenSessionPage';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import './i18n';
/*
El login lo hace bien pero al momento de recargar la página
una vez se está logeado, vuelve a sacar al login

*/
export function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/passwordRecovery" element={<PasswordRecovery />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            
            {/* Envolviendo los componentes con ProtectedRoute */}
            <Route path='/loadingPage' element={<ProtectedRoute><LoadingPage /></ProtectedRoute>} />
            <Route path="/dashboardNewLoadProject" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/createProject" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
            <Route path="/addSessionType" element={<ProtectedRoute><AddSessionType /></ProtectedRoute>} />
            <Route path="/videoWindow" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
            <Route path="/imagenWindow" element={<ProtectedRoute><ImagePage /></ProtectedRoute>} />
            <Route path="/audioWindow" element={<ProtectedRoute><AudioPage /></ProtectedRoute>} />
            <Route path="/openProjects" element={<ProtectedRoute><OpenProjecPage /></ProtectedRoute>} />
            <Route path="/openSessions" element={<ProtectedRoute><OpenSessionPage /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}