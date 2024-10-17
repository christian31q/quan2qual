import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Grid, Center } from '@chakra-ui/react';
import ProjectCard from '../components/OpenCards';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProjectsFromDB } from '../utils/mongoUtils';

function OpenProjectContainer() {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const userId = sessionStorage.getItem('userId');
          const result = await fetchProjectsFromDB(userId); // Esta función debe hacer la solicitud a MongoDB
          console.log('Result Project: ', result);
          setProjects(result); 
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
  
      fetchProjects();
    }, []);

    const handleDeleteProject = (deletedProjectId) => {
      setProjects(projects.filter((project) => project._id !== deletedProjectId));
    };

    return (
        <Box
            p="6"
            bg="gray.300"
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
                color="#173378"
                mt="0.3rem"
                mb="1.5rem"
            >
                {t('openProjectTitle')}
            </Text>
            <Center>
                <Box
                    maxH="25rem" 
                    mb="1rem" 
                    overflowY="scroll" 
                >
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                      {projects.length > 0 ? (
                        projects.map((project) => (
                          <ProjectCard
                            key={project._id}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                                    <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#173378" />
                                  </svg>}
                            title={project.name} // Mostrar el nombre del proyecto
                            creationDate={new Date(project.created_at).toLocaleDateString()} // Formatear la fecha
                            _id={project._id}
                            type="project"
                            onDelete={handleDeleteProject}
                          />
                        ))
                      ) : (
                          <Box
                            gridColumn={2}
                          >
                            <Link to="/createProject">
                              <Button
                                w="10rem"
                                h="2.375rem"
                                bg="#173378"
                                color="white"
                                fontSize="1.25rem"
                                fontWeight="400"
                                shadow="lg"
                                mt="1.5rem"
                                _hover={{ backgroundColor: 'gray.600' }}
                              > 
                                {t('newProject')}
                              </Button>
                            </Link>
                          </Box>
                    )}
                    </Grid>
                </Box>
            </Center>
            <Link to="/dashboardNewLoadProject">
                <Button
                    w="10rem"
                    h="2.375rem"
                    bg="#173378"
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

