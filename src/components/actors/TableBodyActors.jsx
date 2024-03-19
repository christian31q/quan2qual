import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Icon } from '@chakra-ui/react';
import { FiSettings, FiMoreVertical, FiEdit, FiTrash } from 'react-icons/fi';
import { CgBoy } from 'react-icons/cg';
//import { HeaderLabels } from './HeaderLabelsActors'


const TableBodyActors = ({ data, handleEdit, handleDelete }) => {
  return (
    <Table size="sm" color="white">
      {/*<Thead bg="#272F34" position="sticky" >
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
          <Th w="1vw" color="white" textAlign="center" alignItems='center'>
            <Icon as={FiSettings} fontSize="1vw" />
          </Th>
        </Tr>
  </Thead>*/}
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id} bg="#272F34">
            <Td width='30.1%' textAlign="center" borderRight="1px">
              <Icon as={CgBoy} bg="red" borderRadius="100%" fontSize="2.5vw" />
            </Td>
            <Td width='28.5%' textAlign="center" borderRight="1px">{item.label}</Td>
            <Td width='19.5%' textAlign="center" borderRight="1px">{item.id}</Td>
            <Td width='20%' className="hover-element"textAlign="center" >
              <Icon as={FiMoreVertical} fontSize="1.5vw" />
              <FiEdit className="edit-icon" onClick={() => handleEdit(item.id)} />
              <FiTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableBodyActors;
