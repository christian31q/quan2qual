import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import EditActorModal from './EditActorModal';
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import { IconPickerItem } from 'react-icons-picker';
import { useSearchParams } from 'react-router-dom';
import useActorStore from '../../store/actorStore';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const TableBodyActors = ({ data }) => {
  const { t } = useTranslation();
  const { actors, fetchActors, deleteActor, updateActor } = useActorStore();

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const [isOpen, setIsOpen] = useState(false);

  //Editar actores
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actorIdToEdit, setActorIdToEdit] = useState(null);
  const [actorToEdit, setActorToEdit] = useState(null);

  const rowVariants = {
    hidden: { opacity: 0, scale: 0.95, background: "#173378" },
    visible: { opacity: 1, scale: 1 },
  };

  const handleOpenEditModal = (actor) => {
    setActorIdToEdit(actor._id); // Usa el ID del actor
    setActorToEdit(actor); // Proporciona el actor completo
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Editar actores
  const handleEdit = (editedName, editedColor, editedAttributes) => {
    if (actorIdToEdit) {
      const updatedData = {
        name: editedName,
        color: editedColor,
        attributes: editedAttributes,
      };

      // Llamamos a la función de Zustand para actualizar el actor
      updateActor(actorIdToEdit, updatedData);

      showToast(`${t('toastEditedActor')}`, 'success');
      handleCloseEditModal();
    }
  };
   
  //Borrar actores
  const [actorIdToDelete, setActorIdToDelete] = useState(null);
  const [actorNameToDelete, setActorNameToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (actorIdToDelete) {
      // Llamamos a la función de Zustand para eliminar el actor
      deleteActor(actorIdToDelete);
      showToast(`${t('toastDeleteActor')}`, 'success');
      setIsOpen(false); // Cerrar modal
    }
  };

  const handleOpenModal = (actor) => {
    setActorIdToDelete(actor._id); // Usa el ID del actor para eliminar
    setActorNameToDelete(actor.name); // Guarda el nombre para mostrarlo
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  // Cargar actores al montar el componente
  useEffect(() => {
    fetchActors(sessionId); // Llama a la función de Zustand para obtener actores de MongoDB
  }, [fetchActors]);


  return (
    <>
      <Table size="sm" color="white">
        <Tbody>
        {actors.map((actor, index) => (
            <motion.tr 
              key={actor._id} 
              bg="#173378"
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
            >
              <Td width='30%' textAlign="center" borderRight="1px">
                <Icon
                  bg={actor.color}
                  borderRadius="100%"
                  fontSize="2.5vw"
                >
                  <IconPickerItem
                    value={actor.icon}
                    size={24}
                  />
                </Icon>
              </Td>
              <Td width='30%' textAlign="center" borderRight="1px">{actor.name}</Td>
              <Td width='14.5%' textAlign="center" borderRight="1px">{index + 1}</Td> 
              <Td width='1%' className="hover-element" textAlign="center">
                <Icon as={FiMoreVertical} fontSize="1.5vw" />
                <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(actor)} />
                <TiDeleteOutline className="delete-icon" onClick={() => handleOpenModal(actor)} />
              </Td>
            </motion.tr>
        ))}
        </Tbody>
      </Table>
      <EditActorModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        actor={actorToEdit}
        onEdit={handleEdit}
      />
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={`${t('actorLabelText')}: ${actorNameToDelete}`}
      />
      <ToastContainer />
    </>
  );
};

export default TableBodyActors;
