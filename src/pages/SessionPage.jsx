import React, { useRef, useState, useEffect } from 'react';
import { Grid, GridItem, Box, Flex, Text, IconButton, Table, Thead, Tbody, Tr, Th, Td, Tfoot, TableContainer, TableCaption, Icon, Center } from '@chakra-ui/react';
import NavLeftTools from '../container/NavLeftToolsContainer';
import InputHeader from '../components/InputHeader'
import NavHeader from '../components/NavHeader'
import FileUploadSection from '../components/FileUploadSection'
import VideoControls from '../components/VideoControls';
import HeaderTableActors from '../components/actors/HeaderTableActors';
import HeaderLabelsActors from '../components/actors/HeaderLabelsActors';
import TableBodyActors from '../components/actors/TableBodyActors'
import '../styles/HandleStyles.css'


function SessionPage({ mainContent, pageTitle }) {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const actorsData = localStorage.getItem('actors');
    if (actorsData) {
      setActors(JSON.parse(actorsData));
    }
  }, []);

  const handleEdit = (id) => {
    console.log("Editar elemento con ID:", id);
  };

  /*const handleDelete = (index) => {
    // Mostrar cuadro de diálogo de confirmación
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este actor?');
    
    // Verificar si el usuario confirmó la eliminación
    if (isConfirmed) {
      // Crea una copia del array de actores actual
      const updatedActors = [...actors];
      // Elimina el actor en la posición del índice especificado
      updatedActors.splice(index, 1);
      // Actualiza el estado local y el almacenamiento local con los actores actualizados
      setActors(updatedActors);
      localStorage.setItem('actors', JSON.stringify(updatedActors));
    }
  };*/
  


  //Sección video 
  const videoRef = useRef(null);
  const handleFileSelect = (file) => {
    // realizar acciones adicionales cuando se selecciona un archivo
    console.log("Archivo seleccionado:", file);
  };

  
  return (
    
    <Box height="100vh">
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav navR"
                        "nav reproductor"
                        "nav footer"`}
        gridTemplateRows={'6.2% 59.1% 6% 28.7%'}
        gridTemplateColumns={'5.99% 70.57% 23.44%'}
        h='100%'
        gap='0'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem 
            pl='2' 
            color='white' 
            bg='#041D39'
            borderLeft='1px' 
            borderColor='white'
            area={'header'} 
            colStart={2}
            shadow='xl'
        >
          <NavHeader pageTitleText={pageTitle}/>
        </GridItem>
        <GridItem 
            color='white' 
            bg='#041D39' 
            area={'nav'} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
            alignItems='center'
        >
            <NavLeftTools/>
        </GridItem>
        <GridItem 
            pl='2' 
            color='white'
            bg='#272F34' 
            area={'main'} 
            colStart={2}
            shadow='xl'
        >
          <FileUploadSection videoRef={videoRef} />
        </GridItem>
        <GridItem 
            borderLeft='1px' 
            borderColor='white' 
            color='white' 
            bg='#566066' 
            area={'navR'} 
            colStart={3} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
            style={{ overflowY: 'hidden'}}
        >
          {/*Tabla Actores*/}
          <HeaderTableActors/>
          <HeaderLabelsActors/>
          <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
            <TableBodyActors data={actors} handleEdit={handleEdit} />
          </div>
        </GridItem>
        <GridItem 
            pl='2' 
            color='white' 
            bg='#000000' 
            area={'reproductor'} 
            colSpan={3} 
            rowStart={3} 
            rowEnd={3}
            shadow='xl'
            display='flex'
        >
          {/*Reproductor*/}
          <VideoControls videoRef={videoRef} />
        </GridItem>
        <GridItem 
            pl='2' 
            color='white' 
            bg='#566066' 
            area={'footer'} 
            colSpan={3} 
            rowStart={4}
            shadow='xl'
        >
          Footer
        </GridItem> 
      </Grid>
    </Box>
  );
}

export default SessionPage;
