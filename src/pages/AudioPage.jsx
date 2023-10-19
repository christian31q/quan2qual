import React from 'react';

function AudioPage() {
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
        <GridItem pl='2' bg='orange.300' area={'header'} colStart={2}>
          Header
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'} rowStart={1} rowEnd={3}>
          Nav
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'} colStart={2}>
          Main Audio
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'navR'} colStart={3} rowStart={1} rowEnd={3}>
          Nav Right
        </GridItem>
        <GridItem pl='2' bg='red.300' area={'reproductor'} colSpan={3} rowStart={3} rowEnd={3}>
          Reproductor
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'} colSpan={3} rowStart={4}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
}

export default AudioPage;
