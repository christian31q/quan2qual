import React, { useRef } from 'react';
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
  const data = [
    { id: 1, label: 'Santiao' },
    { id: 2, label: 'Ana'},
    { id: 3, label: 'Juan'},
    { id: 4, label: 'Libro'},
    { id: 5, label: 'Ana'},
    { id: 6, label: 'Juan'},
    { id: 7, label: 'Libro'},
    { id: 8, label: 'Juan'},
    { id: 9, label: 'Libro'},
    { id: 10, label: 'Ana'},
    { id: 11, label: 'Juan'},
    { id: 12, label: 'Libro'},
    { id: 13, label: 'Libro'},
    { id: 14, label: 'Ana'},
    { id: 15, label: 'Juan'},
    { id: 16, label: 'Libro'},

    //Agregar más si es necesario
  ];

  const handleEdit = (id) => {
    console.log("Editar elemento con ID:", id);
  };
  const handleDelete = (id) => {
    console.log("Eliminar elemento con ID:", id);
  };

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
          <HeaderTableActors />
          <HeaderLabelsActors/>
          <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
            <TableBodyActors data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
          <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
            <TableBodyActors data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
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
