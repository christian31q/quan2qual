import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const HeadeLabelsTypes = () =>{
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Tipo
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Peso
                    </Th>
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeadeLabelsTypes;