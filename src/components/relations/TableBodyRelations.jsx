import React, { useState, useEffect } from 'react';
import { Box, Table, Tbody, Tr, Td, Icon, Text } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import EditRelationModal from './EditRelationModal'; 
import { IconPickerItem } from 'react-icons-picker';
import { useSearchParams } from 'react-router-dom';
import useActorDragStore from '../../store/actorDragStore';
import useRelationStore from '../../store/relationStore';
import useRelationTypeStore from '../../store/relationTypesStore';
import { motion } from 'framer-motion';
import { createStandaloneToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const { ToastContainer, toast } = createStandaloneToast();

const TableBodyRelations = () => {
  const { t } = useTranslation();
  const { actorsInstances } = useActorDragStore();
  const { relations, removeRelation, loadRelations, updateRelation } = useRelationStore();  // Añadimos updateRelation para la edición
  const { relationTypes } = useRelationTypeStore();

  const [isOpen, setIsOpen] = useState(false);  // Modal para eliminar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // Modal para editar
  const [relationIdToDelete, setRelationIdToDelete] = useState(null);
  const [relationLabelToDelete, setRelationLabelToDelete] = useState(null);
  const [relationToEdit, setRelationToEdit] = useState(null);  // Relación que vamos a editar

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  // Cargar relaciones cuando el componente se monte
  useEffect(() => {
    if (sessionId) {
      loadRelations(sessionId);
    }
  }, [sessionId, loadRelations]);

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Función para obtener detalles de un actor desde el objeto actorsInstances
  const getActorDetails = (actorId) => {
    return actorsInstances[actorId]?.actor || null;  // Acceder directamente usando actorId como clave
  };

  // Abrir el modal para confirmar la eliminación
  const handleOpenDeleteModal = (relation) => {
    setRelationIdToDelete(relation._id); // Guardar el ID de la relación a eliminar
    setRelationLabelToDelete(relation.type_label);
    setIsOpen(true);
  };

  // Confirmar la eliminación de la relación
  const handleConfirmDelete = () => {
    if (relationIdToDelete) {
      removeRelation(relationIdToDelete); // Llamar al store para eliminar la relación
      showToast(`${t('toastDeleteRelationship')}`, 'success');
      setIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Abrir el modal de editar relación
  const handleOpenEditModal = (relation) => {
    setRelationToEdit(relation); 
    setIsEditModalOpen(true); 
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); 
  };

  // Función para editar la relación
  const handleEditRelation = (updatedRelation) => {
    updateRelation(updatedRelation._id, updatedRelation);  // Llama al store para actualizar la relación
    showToast(`${t('toastEditRelationship')}`, 'success');
    handleCloseEditModal();
  };

  // Animaciones para las filas de la tabla
  const rowVariants = {
    hidden: { opacity: 0, scale: 0.95, background: "#173378" },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <Table size="sm" color="white">
        <Tbody>
        {relations.map((relation) => {
            // Obtener los detalles del actor para el source y el target
            const sourceActor = getActorDetails(relation.source);
            const targetActor = getActorDetails(relation.target);

            return (
              <motion.tr
                key={relation._id}
                bg="#173378"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                <Td width="35%" textAlign="center" borderRight="1px solid white">
                  {sourceActor ? (
                    <>
                    <Icon
                      bg={sourceActor.color}
                      borderRadius="100%"
                      fontSize="1.9vw"
                    >
                      <IconPickerItem
                        value={sourceActor.icon}
                        size={24}
                      />
                    </Icon>
                      <Text>{sourceActor.name}</Text>
                    </>
                  ) : (
                    <Text>No se encontró el actor</Text>
                  )}
                </Td>
                <Td width="35%" textAlign="center" borderRight="1px solid white">
                  {targetActor ? (
                    <>
                    <Icon
                      bg={targetActor.color}
                      borderRadius="100%"
                      fontSize="1.9vw"
                    >
                      <IconPickerItem
                        value={targetActor.icon}
                        size={24}
                      />
                    </Icon>
                      <Text>{targetActor.name}</Text>
                    </>
                  ) : (
                    <Text>No se encontró el actor</Text>
                  )}
                </Td>
                <Td minWidth="15%" textAlign="center" borderRight="1px solid white">
                  {relation.weight}
                </Td>
                <Td minWidth="20%" textAlign="center" borderRight="1px solid white" fontSize={12}>
                  {relation.type_label}
                </Td>
                <Td minWidth='0%' className="hover-element" textAlign="center">
                  <Icon as={FiMoreVertical} fontSize="1.5vw" />
                  <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(relation)} />
                  <TiDeleteOutline className="delete-icon" onClick={() => handleOpenDeleteModal(relation)} />
                </Td>
              </motion.tr>
            );
        })}
        </Tbody>
      </Table>
      {relations.length == 0 && (
          <Box>
            <Text color="#173378" textAlign="center" width="100%" padding="2">
              {t('tableRelationshipsText')}            
            </Text>
        </Box>
      )}
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={`${t('relationshipWord')}: ${relationLabelToDelete}`}
      />
      <EditRelationModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        relation={relationToEdit}
        onEdit={handleEditRelation} 
        relationTypes={relationTypes} 
      />
      <ToastContainer />
    </>
  );
};

export default TableBodyRelations;

/*
    Ya se editan relaciones y eliminan
    Revisar con más calma

*/
