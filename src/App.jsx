import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa las partes necesarias de react-router-dom
// Importa las páginas que desea navegar
import Login from './pages/LoginPage';
import PasswordRecovery from './pages/PasswordRecoveryPage';
import ResetPassword from './pages/ResetPasswordPage'
import Dashboard from './pages/DashboardPage';
import CreateProject from './pages/CreateProjectPage'
import AddSessionType from './pages/AddSessionTypePage'
import VideoPage from './pages/VideoPage';
import ImagePage from './pages/ImagePage';
import AudioPage from './pages/AudioPage';


//i18next framework 
import './i18n';


export function App() {
  return (
    <ChakraProvider>
      <Router> {/* Envuelve tu aplicación en el componente Router */}
        <Routes>
          <Route path="/" element={<Login/>} /> {/* Ruta para la página de inicio */}
          <Route path="/passwordRecovery" element={<PasswordRecovery/>} /> {/* Ruta para otra página*/}
          <Route path="/resetPassword" element={<ResetPassword/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboardNewLoadProject" element={<Dashboard/>}/>
          <Route path="/createProject" element={<CreateProject/>}/>
          <Route path="/addSessionType" element={<AddSessionType/>}/>
          <Route path="/videoWindow" element={<VideoPage/>} />
          <Route path="/imagenWindow" element={<ImagePage/>} />
          <Route path="/audioWindow" element={<AudioPage/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}