import React, { useState, useEffect } from 'react';
import { Button, Table, Tbody, Tr, Td, Icon, background } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import EditTypeModal from './EditTypeModal';
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import { createStandaloneToast } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import useRelationTypeStore from '../../store/relationTypesStore';
import { BsSortNumericDown, BsSortNumericUp  } from "react-icons/bs";
import { motion } from 'framer-motion';

const { ToastContainer, toast } = createStandaloneToast();

const TableBodyTypes = () => {
  const { relationTypes, fetchRelationTypes, deleteRelationType, updateRelationType } = useRelationTypeStore();
  
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isOpen, setIsOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [typeToEdit, setTypeToEdit] = useState(null);  // Guardar el tipo de relación completo para editar
  const [typeToDelete, setTypeToDelete] = useState(null);  // Guardar el tipo de relación completo para eliminar
  
  const [isAscending, setIsAscending] = useState(true);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const rowVariants = {
    hidden: { opacity: 0, scale: 0.95, background: "#173378" },
    visible: { opacity: 1, scale: 1 },
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

  // Función para abrir el modal de edición
  const handleOpenEditModal = (type) => {
    setTypeToEdit(type);  // Pasar el objeto completo del tipo a editar
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Editar un tipo de relación por su ID
  const handleEdit = async (editedType) => {
    try {
      // Crear una copia del objeto editado excluyendo el campo _id
      const { _id, ...updatedData } = editedType;  // Extraer _id y dejar el resto de los campos
  
      await updateRelationType(_id, updatedData); 
      showToast('Tipo de relación editado correctamente', 'success');
      setIsEditModalOpen(false);
    } catch (error) {
      showToast('Error al editar el tipo de relación', 'error');
    }
  };  

  // Función para abrir el modal de confirmación de eliminación
  const handleOpenModal = (type) => {
    setTypeToDelete(type);  // Pasar el objeto completo del tipo a eliminar
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Eliminar un tipo de relación por su ID
  const handleConfirmDelete = async () => {
    try {
      await deleteRelationType(typeToDelete._id);  // Eliminar usando el ID del tipo de relación
      showToast('Tipo de relación eliminado correctamente', 'success');
      setIsOpen(false);
    } catch (error) {
      showToast('Error al eliminar el tipo de relación', 'error');
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchRelationTypes(sessionId);  // Obtener los tipos de relación para una sesión
    }
  }, [fetchRelationTypes, sessionId]);

  return (
    <div style={{display: 'flex', flexDirection: "column"}}>
      <Button onClick={toggleOrder} bg="#173378" color="white" _hover={{ bg: '#ebedf0', color: 'black' }}>
        {isAscending ? <Icon as={BsSortNumericDown} fontSize="1.5vw" /> : <Icon as={BsSortNumericUp } fontSize="1.5vw" />}
      </Button>
      <Table size="sm" color="white">
        <Tbody>
          {relationTypes
            .sort((a, b) => isAscending
              ? a.inputValues.peso_relacion - b.inputValues.peso_relacion
              : b.inputValues.peso_relacion - a.inputValues.peso_relacion
            )
            .map((type) => (
              // Envolver las filas en el componente de animación de framer-motion
              <motion.tr
                key={type._id}
                bg="#173378"
                layout
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                <Td width="37%" textAlign="center" borderRight="1px" borderTop="1px">
                  {type.label === 'Relación personalizada' ? type.inputValues.nombre_personalizada : type.label}
                </Td>
                <Td width="29%" textAlign="center" borderRight="1px" borderTop="1px">
                  {type.inputValues.peso_relacion}
                </Td>
                <Td width="0%" className="hover-element" textAlign="center" borderTop="1px">
                  <Icon as={FiMoreVertical} fontSize="1.5vw" />
                  <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(type)} />
                  <TiDeleteOutline className="delete-icon" onClick={() => handleOpenModal(type)} />
                </Td>
              </motion.tr>
            ))}
        </Tbody>
      </Table>
      {/* Modal para editar un tipo de relación */}
      <EditTypeModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        type={typeToEdit}
        onEdit={handleEdit}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={`tipo de relación ${typeToDelete?.label}`}
      />
    </div>
  );
};

export default TableBodyTypes;