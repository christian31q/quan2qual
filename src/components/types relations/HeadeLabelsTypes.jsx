import React from 'react';
import { Thead, Tr, Th, Icon, Table } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const HeadeLabelsTypes = () =>{
    const { t } = useTranslation();
    return(
        <Table size="sm" style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Thead bg="#173378">
                <Tr>
                    <Th color="white" textAlign="center" borderRight="1px">
                        {t('typeWord')}
                    </Th>
                    <Th color="white" textAlign="center" borderRight="1px">
                        {t('weightWord')}
                    </Th>
                </Tr>
            </Thead>
        </Table>
    );
}
export default HeadeLabelsTypes;