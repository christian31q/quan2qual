import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          welcomeText: 'Welcome',
          inputLoginEmail: 'Enter your user',
          inputLoginPassword: 'Enter your password',
          forgotPassword: 'Forgot your password?',
          buttonLogIn: 'Log In',
          usertText: 'User',
          buttonPasswordRecovery: 'Reset Password',
          resetPassword: 'Reset Password',
          newPassword: 'New Password',
          newPasswordInput: 'Enter your new password',
          confirmPassword: 'Confirm password',
          confirmPasswordInput: 'Confirm your password',
          loading: 'Loading...',
          username: 'Username',
          newProject: 'New Project',
          openProject: 'Open Project',
          logOut: 'Log Out',
          createProjectTitle: 'Create New Project',
          projectTitle: 'Project title',
          projectTitleInput: 'Enter the project name',
          cancel: 'Cancel',
          next: 'Next',
          errorMessageProjectName: 'Please, fill in the project name.',
          addSessionTypeTitle:'Add Session Type',
          newSessionText: 'New Session',
          addSessionTitleInput: 'Enter the session title',
          addSessionTypeErrorMessage: 'Please, complete the session title field or select a file type',
          typeFileText: 'Type of file:',
          create: 'Create',
          videoText: 'Video',
          imageText: 'Image',
          audioText: 'Audio',
          openButton: 'Open',
          openProjectTitle: 'Open Project',
          returnButton: 'Return',
          languageText: 'Language',
          spanishButton:'Spanish'
        }
      },
      es: {
        translation: {
            welcomeText: 'Bienvenido',
            inputLoginEmail: 'Escriba su usuario',
            inputLoginPassword: 'Escriba su contraseña',
            forgotPassword: '¿Olvidó su contraseña?',
            buttonLogIn: 'Iniciar Sesión',
            usertText: 'Usuario',
            buttonPasswordRecovery: 'Restablecer contraseña',
            resetPassword: 'Restablecer contraseña',
            newPassword: 'Nueva Contraseña',
            newPasswordInput: 'Escriba su nueva contraseña',
            confirmPassword: 'Confirmar contraseña',
            confirmPasswordInput: 'Confirme su contraseña',
            loading: 'Cargando...',
            username: 'Nombre de Usuario',
            newProject: 'Nuevo Proyecto',
            openProject: 'Abrir Proyecto',
            logOut: 'Cerrar Sesión',
            createProjectTitle: 'Crear Nuevo Proyecto',
            projectTitle: 'Nombre del proyecto',
            projectTitleInput: 'Escriba el nombre del proyecto',
            cancel: 'Cancelar',
            next: 'Siguiente',
            errorMessageProjectName: 'Por favor, complete el nombre del proyecto.',
            addSessionTypeTitle:'Añadir Tipo de Sesión',
            newSessionText: 'Nueva Sesión',
            addSessionTitleInput: 'Escriba el título de la sesión',
            addSessionTypeErrorMessage: 'Por favor, complete el campo del título de la sesión o seleccione un tipo de archivo',
            typeFileText: 'Tipo de archivo:',
            create: 'Crear',
            videoText: 'Vídeo',
            imageText: 'Imagen',
            audioText: 'Audio',
            openButton: 'Abrir',
            openProjectTitle: 'Abrir Proyecto',
            returnButton: 'Volver',
            languageText: 'Idioma',
            spanishButton:'Español'
            
        }

      }
    },
    lng: 'en',
    fallbackLng: 'en'
  });

export default i18n;