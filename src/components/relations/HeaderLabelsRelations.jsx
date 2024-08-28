import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const HeaderLabelsRelations = () =>{
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Source
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Target
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Peso
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Tipo
                    </Th>
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeaderLabelsRelations;