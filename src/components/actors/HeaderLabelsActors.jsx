import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

const HeaderLabelsActors = () =>{
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th color="white" textAlign="center" borderRight="1px">
                        Icono
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        LABEL
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        ID
                    </Th>
                    {/*<Th color="white" textAlign="center" alignItems='center'>
                        <Icon as={FiSettings} fontSize="1.1vw" />
    </Th>*/}
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeaderLabelsActors;