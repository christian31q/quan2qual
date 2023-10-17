/*import React from 'react';
import { Box, VStack, Text, Button, Grid, Center } from '@chakra-ui/react';
import ProjectCard from '../components/OpenCards';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function OpenProjectContainer({ projects, onOpen }) {
    const {t} = useTranslation();

    return (
    <Box
        p="6" 
        bg="#D05543" 
        borderRadius="md" 
        boxShadow="lg" 
        w="55.875rem" 
        h="38.8125em" 
        textAlign="center"
    >
      <Text 
        fontSize="2.8125rem" 
        fontWeight="700" 
        fontFamily="Optima LT Pro" 
        color="#041D39" 
        mt="0.3rem"
        mb="1.5rem"
        >
            {t('openProjectTitle')}
      </Text>
      <Center>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
        </Grid>
      </Center>
      <VStack spacing={4} align="start">
        {/*{projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
          />
        ))}}
      </VStack>
      <Link to="/dashboardNewLoadProject">
          <Button
            w="10rem"
            h="2.375rem"
            bg="#041D39"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            shadow="lg"
            mt="1.5rem"
            _hover={{ backgroundColor: 'gray.600' }}
          >
            {t('returnButton')}
          </Button>
        </Link>
    </Box>
  );
}

export default OpenProjectContainer;
*/
import React from 'react';
import { Box, VStack, Text, Button, Grid, Center } from '@chakra-ui/react';
import ProjectCard from '../components/OpenCards';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function OpenProjectContainer({ projects, onOpen }) {
    const { t } = useTranslation();

    return (
        <Box
            p="6"
            bg="#D05543"
            borderRadius="md"
            boxShadow="lg"
            w="55.875rem"
            h="38.8125em"
            textAlign="center"
        >
            <Text
                fontSize="2.8125rem"
                fontWeight="700"
                fontFamily="Optima LT Pro"
                color="#041D39"
                mt="0.3rem"
                mb="1.5rem"
            >
                {t('openProjectTitle')}
            </Text>
            <Center>
                <Box
                    maxH="25rem" // Define la altura máxima visible
                    mb="1rem" // Agrega margen inferior para separarlo del resto de los elementos
                    overflowY="scroll" // Agrega desplazamiento vertical
                >
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        {/* Repite los componentes según sea necesario */}
                    </Grid>
                </Box>
            </Center>
            <VStack spacing={4} align="start">
                {/*{projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
          />
        ))}*/}
            </VStack>
            <Link to="/dashboardNewLoadProject">
                <Button
                    w="10rem"
                    h="2.375rem"
                    bg="#041D39"
                    color="white"
                    fontSize="1.25rem"
                    fontWeight="400"
                    shadow="lg"
                    mt="1.5rem"
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    {t('returnButton')}
                </Button>
            </Link>
        </Box>
    );
}

export default OpenProjectContainer;

