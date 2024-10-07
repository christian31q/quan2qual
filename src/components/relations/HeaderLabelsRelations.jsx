import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const HeaderLabelsRelations = () =>{
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th width="21%" color="white" textAlign="center" borderRight="1px">
                        Source
                    </Th>
                    <Th width="21%" color="white" textAlign="center" borderRight="1px">
                        Target
                    </Th>
                    <Th width="1%" color="white" textAlign="center" borderRight="1px">
                        Peso
                    </Th>
                    <Th width="10%" color="white" textAlign="center" borderRight="1px">
                        Tipo
                    </Th>
                    <Th width="7%" color="white" textAlign="center" alignItems='center'>
                        <Icon as={FiSettings} fontSize="0.9vw" />
                    </Th>
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeaderLabelsRelations;