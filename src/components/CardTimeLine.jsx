import React, {useState, useEffect} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Icon,
  } from '@chakra-ui/react'

import { IoListCircle } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiUser4Line } from 'react-icons/ri';
import { TbCirclesRelation } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

function CardTimeLine(){
    const { t } = useTranslation();
    return (
        <TableContainer width='260px'>
            <Table style={{borderCollapse:'separate', borderSpacing: '0 15px'}} size='sm'>
                <Tbody>
                    <Tr>
                        <Td bg='black' borderRadius='12px 0 0 12px' borderBottom='none' textAlign='center'>
                            <Icon as={IoListCircle} boxSize={8}/>
                        </Td>
                        <Td bg='#173378' borderRadius='0 12px 12px 0' borderBottom='none' fontSize='20px' fontWeight='400'>
                            Timeline
                        </Td>
                    </Tr>
                    <Tr>
                        <Td bg='black' borderRadius='12px 0 0 12px' borderBottom='none' textAlign='center'>
                            <Icon as={MdOutlinePermMedia} boxSize={8}/>
                        </Td>
                        <Td bg='#173378' borderRadius='0 12px 12px 0' borderBottom='none' fontSize='20px' fontWeight='400'>
                            Media
                        </Td>
                    </Tr>
                    <Tr>
                        <Td bg='black' borderRadius='12px 0 0 12px' borderBottom='none' textAlign='center'>
                            <Icon as={RiUser4Line} boxSize={8}/>
                        </Td>
                        <Td bg='#173378' borderRadius='0 12px 12px 0' borderBottom='none' fontSize='20px' fontWeight='400'> 
                            {t('actorsWord')}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td bg='black' borderRadius='12px 0 0 12px' borderBottom='none' textAlign='center'>
                            <Icon as={TbCirclesRelation} boxSize={8}/>
                        </Td>
                        <Td bg='#173378' borderRadius='0 12px 12px 0' borderBottom='none' fontSize='20px' fontWeight='400'> 
                            {t('relationsWord')}
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default CardTimeLine;