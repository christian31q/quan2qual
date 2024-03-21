import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Icon } from '@chakra-ui/react';
import { FiSettings, FiMoreVertical, FiEdit, FiTrash } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";

import { CgBoy } from 'react-icons/cg';
//import { HeaderLabels } from './HeaderLabelsActors'


const TableBodyActors = ({ data, handleEdit, handleDelete }) => {
  return (
    <Table size="sm" color="white">
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
              <TbEditCircle className="edit-icon" onClick={() => handleEdit(item.id)} />
              <TiDeleteOutline className="delete-icon" onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableBodyActors;
