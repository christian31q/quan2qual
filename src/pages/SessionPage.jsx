import React, { useRef, useState, useEffect } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import NavLeftTools from '../container/NavLeftToolsContainer';
import InputHeader from '../components/InputHeader'
import NavHeader from '../components/NavHeader'
import FileUploadSection from '../components/FileUploadSection'
import VideoControls from '../components/VideoControls';

import HeaderTableActors from '../components/actors/HeaderTableActors';
import HeaderLabelsActors from '../components/actors/HeaderLabelsActors';
import TableBodyActors from '../components/actors/TableBodyActors'

import HeaderTableTypes from '../components/types relations/HeaderTableTypes';
import HeadeLabelsTypes from '../components/types relations/HeadeLabelsTypes';
import TableBodyTypes from '../components/relations/TableBodyTypes';

import HeaderTableRelations from '../components/relations/HeaderTableRelations';
import HeaderLabelsRelations from '../components/relations/HeaderLabelsRelations';
import '../styles/HandleStyles.css'


function SessionPage({ mainContent, pageTitle }) {
  const [actors, setActors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const actorsData = localStorage.getItem('actors');
    const typesData = localStorage.getItem('types');

    if (actorsData) {
      setActors(JSON.parse(actorsData));
    }
    if(typesData){
      setTypes(JSON.parse(typesData));
    }
  }, []);

  //Sección video 
  const videoRef = useRef(null);
  const handleFileSelect = (file) => {
    // realizar acciones adicionales cuando se selecciona un archivo
    console.log("Archivo seleccionado:", file);
  };

  const [activeLiveBox, setActiveLiveBox] = useState('Actors');

  
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
            display='flex' 
            bg='#041D39' 
            area={'nav'} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
            alignItems='center'
        >
            <NavLeftTools setActiveLiveBox={setActiveLiveBox} />
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
        <div>
          {/* Table and Labels related to Actors */}
          {activeLiveBox !== 'Types' && (
            <>
              <HeaderTableActors />
              <HeaderLabelsActors />
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                <TableBodyActors data={actors} />
              </div>
            </>
          )}

          {/* Table and Labels related to Types */}
          {activeLiveBox !== 'Actors' && (
            <>
              <HeaderTableTypes />
              <HeadeLabelsTypes />
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                {<TableBodyTypes data={types}/>}
              </div>
            </>
          )}

          {/* Table and Labels related to Relations */}
          {activeLiveBox !== 'Relations' && (
            <>
              {/*<HeaderTableRelations />
              <HeaderLabelsRelations />*/}
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                {/*<TableBodyRelations />*/}
              </div>
            </>
          )}
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
