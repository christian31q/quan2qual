import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const HeaderLabelsActors = () =>{
    const { t } = useTranslation();
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th width="20%" color="white" textAlign="center" borderRight="1px">
                        {t('iconWord')}
                    </Th>
                    <Th width="20%" color="white" textAlign="center" borderRight="1px">
                        LABEL
                    </Th>
                    <Th width="11%" color="white" textAlign="center" borderRight="1px">
                        ID
                    </Th>
                    <Th width="3%" color="white" textAlign="center" alignItems='center'>
                        <Icon as={FiSettings} fontSize="0.9vw" />
                    </Th>
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeaderLabelsActors;