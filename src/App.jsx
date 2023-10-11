import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa las partes necesarias de react-router-dom
import Login from './Login';
import Page2 from './PasswordRecovery'; // Importa las páginas que deseas navegar

export function App() {
  return (
    <ChakraProvider>
      <Router> {/* Envuelve tu aplicación en el componente Router */}
        <Routes>
          <Route path="/" element={<Login/>} /> {/* Ruta para la página de inicio */}
          <Route path="/passwordRecovery" element={<Page2/>} /> {/* Ruta para otra página (ajusta la URL y el componente) */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}






{/*
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel',
        isFollowing: true 
    },
    {
        userName: 'Sebas_Lam',
        name: 'Sebastián Lamprea',
        isFollowing: false 
    },
    {
        userName: 'PacoHdezs',
        name: 'Paco Hdezs',
        isFollowing: true 
    },
    {
        userName: 'TMChein',
        name: 'Tomas Angel',
        isFollowing: false 
    }
]
export function App (){
    return(
        <section className="App">
        {/*Mapear una lista de usuarios con sus respectivos estados*/}

        /*{
            users.map(user =>{
                const {userName, name, isFollowing} = user
                return(
                    <TwitterFollowCard
                       //Un identificador unico de cada elemento
                       //Puede ser el ID o algo que no se repita en cada elemento
                       //Lo mejor un ID de bases de datos
                        key={userName}
                        userName = {userName}
                        initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                )
            })
        }

        {/*Crear un componente unico, pasando sus respectivos parametros

        {/*<TwitterFollowCard  userName="Sebas_Lam">
            Sebastián Lamprea
         </TwitterFollowCard>
         <TwitterFollowCard  userName="elonmusk">
            Pablo Hernandez
         </TwitterFollowCard>
        /*</section>
    )
}  */