import React from 'react';
import { Grid, GridItem, Box, Button, HStack, Text } from '@chakra-ui/react';
import NavLeftTools from '../container/NavLeftToolsContainer';
import InputHeader from '../components/InputHeader'
import NavHeader from '../components/NavHeader'

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
