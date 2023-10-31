import React from 'react';
import { Grid, GridItem, Box, Flex, Text, IconButton, Table, Thead, Tbody, Tr, Th, Td, Tfoot, TableContainer, TableCaption, Icon, Center } from '@chakra-ui/react';
import NavLeftTools from '../container/NavLeftToolsContainer';
import InputHeader from '../components/InputHeader'
import NavHeader from '../components/NavHeader'
import FileUploadSection from '../components/FileUploadSection'
import { CgBoy, CgGirl } from "react-icons/cg";
import { BiBook } from "react-icons/bi";
import { FiMoreVertical, FiSettings  } from "react-icons/fi";
import { RiUser4Line } from "react-icons/ri";
import { FiEdit, FiTrash } from 'react-icons/fi';
import '../styles/HandleStyles.css'


function SessionPage({ mainContent, pageTitle }) {
  const handleEdit = (elementId) => {
    // Agrega aquí la lógica para editar el elemento con el ID proporcionado
    console.log("Editar elemento con ID:", elementId);
  };
  const handleDelete = (elementId) => {
    // Agrega aquí la lógica para eliminar el elemento con el ID proporcionado
    console.log("Eliminar elemento con ID:", elementId);
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
        <FileUploadSection/>
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
        >
          <TableContainer>
            <Text 
              display='flex'
              justifyContent='space-between'
              align='center'
              alignItems='center'
              fontSize="1.2vw"
              h='6.11vh' 
              bg='#272F34' 
              borderBottom='1px' 
              fontWeight='400'
              pl='1vw'
              pr='1vw'
            >
              Actores
              <Icon as={RiUser4Line} fontSize='1.5vw'/>
            </Text>
            <Table size="sm" color="white">
              <Thead bg="#272F34">
              <Tr>
                <Th w="15vw" color="white" textAlign="center" borderRight="1px">
                  Icono
                </Th>
                <Th w="15vw" color="white" textAlign="center" borderRight="1px">
                  LABEL
                </Th>
                <Th w="6vw" color="white" textAlign="center" borderRight="1px">
                  ID
                </Th>
                <Th w="1vw" color="white" textAlign="center">
                    <Icon as={FiSettings} fontSize="1vw" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr bg="#272F34">
                <Td textAlign="center" borderRight="1px">
                  <Icon as={CgBoy} bg="red" borderRadius="20px" fontSize="2.5vw" />
                </Td>
                <Td textAlign="center" borderRight="1px">Santiao</Td>
                <Td textAlign="center" borderRight="1px">1</Td>
                <Td className="hover-element">
                  <Icon as={FiMoreVertical} fontSize="1.5vw" />
                    <FiEdit className="edit-icon"  onClick={() => handleEdit(1)} />
                    <FiTrash className="delete-icon" onClick={() => handleDelete(1)} />
                </Td>
              </Tr>
            </Tbody>
            </Table>
            {/*<Table size='sm' color='white'>
              <Thead bg='#272F34'>
                <Tr>
                  <Th w='7vw' color='white' textAlign='center' borderRight='1px'>Icono</Th>
                  <Th w='10vw' color='white' textAlign='center' borderRight='1px'>LABEL</Th>
                  <Th color='white' textAlign='center'>ID</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr bg='#272F34'> 
                  <Td textAlign='center' borderRight='1px'><Icon as={CgBoy} bg='red' borderRadius="20px" fontSize='2.5vw'/></Td>
                  <Td textAlign='center' borderRight='1px'>Santiao</Td>
                  <Td textAlign='center' >1</Td>
                </Tr>
                <Tr bg='#272F34'>
                  <Td textAlign='center' borderRight='1px'><Icon as={BiBook} bg='green' borderRadius="20px" fontSize='2.5vw'/></Td>
                  <Td textAlign='center' borderRight='1px'>Libro</Td>
                  <Td textAlign='center'>2</Td>
                </Tr>
                <Tr bg='#272F34'>
                  <Td textAlign='center' borderRight='1px'><Icon as={CgGirl} bg='purple' borderRadius="20px" fontSize='2.5vw'/></Td>
                  <Td textAlign='center' borderRight='1px'>Lina</Td>
                  <Td textAlign='center'>3</Td>
                </Tr>
              </Tbody>
</Table>*/}
        </TableContainer>
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
