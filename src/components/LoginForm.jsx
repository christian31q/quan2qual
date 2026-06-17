import React, { useState } from 'react';
import {
  Flex,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiShow, BiHide } from 'react-icons/bi';
import { MdLockOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../components/LanguageChanger';
import bcrypt from 'bcryptjs';
import requestMongo from '../api/request';
import { createStandaloneToast } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const { ToastContainer, toast } = createStandaloneToast();
const MONGO_DEBUG = import.meta.env.VITE_MONGO_DEBUG === 'true';

function loginDebug(stage, details = {}) {
  if (!MONGO_DEBUG) return;
  console.log(`[login] ${stage}`, details);
}

function LoginForm() {
  const { t } = useTranslation();
  const { login, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (email && password) {
      setIsLoading(true);
      const startedAt = Date.now();

      loginDebug('submit', {
        email,
        hasPassword: Boolean(password)
      });
  
      try {
        const result = await requestMongo("users", { filter: { email: email } }, "findOne");
        loginDebug('mongo-users-findOne', {
          durationMs: Date.now() - startedAt,
          userFound: Boolean(result?.document)
        });
  
        if (result.document != null) {
          const user = result.document;
  
          const passwordMatch = await bcrypt.compare(password, user.password);
          loginDebug('password-compare', {
            userId: user?._id,
            passwordMatch
          });
          if (passwordMatch) {
            // Guardar el estado de autenticación y el ID del usuario en sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('userId', user._id);
            sessionStorage.setItem('userName', user.username);
  
            login();
            setTimeout(() => {
              setIsAuthenticated(true);
              navigateTo('/dashboardNewLoadProject');
            }, 3000); 

            loginDebug('login-success', {
              userId: user?._id,
              username: user?.username
            });
  
            return navigateTo('/loadingPage');
          } else {
            loginDebug('login-failed', {
              reason: 'wrong-password',
              email
            });
            showToast(`${t('toastWrongPassword')}`, 'error');
            setIsAuthenticated(false);
          }
        } else {
          loginDebug('login-failed', {
            reason: 'user-not-found',
            email
          });
          showToast(`${t('toastNoFindUser')}`, 'error');
          setIsAuthenticated(false);
        }
      } catch (error) {
        loginDebug('login-error', {
          email,
          message: error?.message
        });
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error en la autenticación');
      } finally {
        setIsLoading(false);
      }
    }
  };  

  return (
    <div>
      <Flex alignItems="center" flexDirection="column" h="100%">
        <Text fontSize="3xl" fontWeight="700" mb={6} fontFamily="Optima LT Pro" color="#173378">
          {t('welcomeText')}
        </Text>
        <form onSubmit={handleLogin}>
          <Stack spacing={6}>
            <FormControl id="email" maxW="20rem" textAlign="center" >
              <FormLabel></FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiUser fontSize="1.5rem" color="#173378" />}
                />
                <Input
                  type="email"
                  placeholder={t('inputLoginEmail')}
                  _placeholder={{ color: '#173378' }}
                  textAlign="center"
                  fontSize="1rem"
                  bg="white"
                  shadow="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" maxW="20rem" textAlign="center">
              <FormLabel></FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLockOutline fontSize="1.5rem" color="#173378" />}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='on'
                  placeholder={t('inputLoginPassword')}
                  _placeholder={{ color: '#173378' }}
                  textAlign="center"
                  fontSize="1rem"
                  bg="white"
                  shadow="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                />
                <InputRightElement width="4.5rem" >
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  >
                    {showPassword ? (
                      <BiShow fontSize="1.5rem" color="#173378" />
                    ) : (
                      <BiHide fontSize="1.5rem" color="#173378" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Flex justify="flex-end">
              <Text _hover={{ textDecoration: 'underline' }} cursor="pointer">
                <Link to="/passwordRecovery">{t('forgotPassword')}</Link>
              </Text>
            </Flex>

            <Button
              type='submit'
              color="white"
              w="20rem"
              h="2.375rem"
              bg="#173378"
              _hover={{ backgroundColor: 'gray.600' }}
              isLoading={isLoading} // Aquí es donde se muestra el spinner
              loadingText={t('loading')} // Texto mientras carga
            >
              {t('buttonLogIn')}
            </Button>

            {/*{setIsAuthenticated ? (
              <Text color="green.500" fontWeight="bold" mb={6}>
                ¡Credenciales correctas! Acceso concedido.
              </Text>
            ) : null}*/}
          </Stack>
        </form>
        <LanguageChanger/>
      </Flex>
    </div>
  );
}

export default LoginForm;
