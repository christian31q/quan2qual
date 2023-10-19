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
import { Box, Text, Button, Grid, Center } from '@chakra-ui/react';
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
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 1"
                          creationDate="2023-10-09"
                          //onOpen={<Link to="/openSessions">Abrir</Link>}
                        />
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 2"
                          creationDate="2023-10-09"
                        />
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 3"
                          creationDate="2023-10-09"
                        />
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 4"
                          creationDate="2023-10-09"
                        />
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 5"
                          creationDate="2023-10-09"
                        />
                        <ProjectCard
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                  <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
                                </svg>}
                          title="Project Title 6"
                          creationDate="2023-10-09"
                        />
                        {/* Repite los componentes según sea necesario */}
                    </Grid>
                </Box>
            </Center>
            {/*
            <VStack spacing={4} align="start">
                {/*{projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
          />
        ))}}
            </VStack>
            */}
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

