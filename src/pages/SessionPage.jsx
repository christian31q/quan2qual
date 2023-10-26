import React from 'react';
import { Grid, GridItem, Box, Stack, Button, HStack, Center } from '@chakra-ui/react';
import NavLeftTools from '../container/NavLeftToolsContainer';

import { TbCirclesRelation } from "react-icons/tb";
import { CiSaveDown1, CiImport } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPower} from "react-icons/bs";


//import { IoPricetagOutline } from "react-icons/io5";
//import { FiPlus } from "react-icons/fi";
//import { TiDeleteOutline } from "react-icons/ti";

function SessionPage({ mainContent, pageTitle }) {
  
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
            area={'header'} 
            colStart={2}
            shadow='xl'
        >
          <HStack direction='row' spacing={{ base: "10px", md: "20px  ", lg: "2.5vmin" }} justifyContent='right' mt='1vh'>
            <Button rightIcon={<CiSaveDown1 />} w='8vw' h='2vw' bg='#272F34' color='white' variant='solid'>
              Guardar
            </Button>
            <Button rightIcon={<AiOutlineLogout />} w='8vw' h='2vw' bg='#272F34' color='white' variant='solid'>
              Exportar
            </Button>
            <Button rightIcon={<BsPower />} w='8vw' h='2vw' bg='#272F34' color='white' variant='solid'>
              Salir
            </Button>
          </HStack>
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
          {mainContent}
        </GridItem>
        <GridItem 
            pl='2' 
            borderLeft='1px' 
            borderColor='white' 
            color='white' 
            bg='#566066' 
            area={'navR'} 
            colStart={3} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
        >
          Nav Right
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
        >
          Reproductor
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
