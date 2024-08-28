import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import EditTypeModal from './EditTypeModal';
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const TableBodyTypes = () => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Editar tipos de relación
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [typeIndexToEdit, setTypeIndexToEdit] = useState(null);
  const [typeToEdit, setTypeToEdit] = useState(null);

  const handleOpenEditModal = (index, type) => {
    setTypeIndexToEdit(index);
    // Pasar todo el objeto type
    setTypeToEdit(type);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (editedType) => {
    const updatedTypes = [...types];
    updatedTypes[typeIndexToEdit] = editedType;
    setTypes(updatedTypes);
    localStorage.setItem('types', JSON.stringify(updatedTypes));
    showToast('Tipo de relación editado correctamente', 'success');
    setIsEditModalOpen(false);
  };

  // Borrar tipos de relación
  const [typeIndexToDelete, setTypeIndexToDelete] = useState(null);
  const [typeNameToDelete, setTypeNameToDelete] = useState(null);

  const handleConfirmDelete = () => {
    const updatedTypes = [...types];
    updatedTypes.splice(typeIndexToDelete, 1);
    setTypes(updatedTypes);
    localStorage.setItem('types', JSON.stringify(updatedTypes));
    setIsOpen(false);
    showToast('Tipo de relación eliminado correctamente', 'success');
  };

  const handleOpenModal = (index, name) => {
    setTypeIndexToDelete(index);
    setTypeNameToDelete(name);
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

  useEffect(() => {
    const storedTypes = JSON.parse(localStorage.getItem('types'));
    if (storedTypes) {
      setTypes(storedTypes);
    }
  }, []);

  useEffect(() => {
    const handleNewActor = (event) => {
      const { detail } = event;
      setTypes((prevTypes) => [...prevTypes, detail]);
    };
  
    document.addEventListener('newType', handleNewActor);
  
    return () => {
      document.removeEventListener('newType', handleNewActor);
    };
  }, []);

  return (
    <>
      <Table size="sm" color="white">
        <Tbody>
          {types.map((type, index) => (
            <Tr key={index} bg="#173378">
              <Td width='37%' textAlign="center" borderRight="1px">{type.label === 'Relación personalizada' ? type.inputValues.nombre_personalizada : type.label}</Td>
              <Td width='29%' textAlign="center" borderRight="1px">{type.inputValues.peso_relacion}</Td>
              <Td width='0%' className="hover-element" textAlign="center">
                <Icon as={FiMoreVertical} fontSize="1.5vw" />
                <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(index, type)} />
                <TiDeleteOutline className="delete-icon" onClick={() => handleOpenModal(index, type.label)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EditTypeModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        type={typeToEdit}
        onEdit={handleEdit}
      />
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={`tipo de relación ${typeNameToDelete}`}
      />
    </>
  );
};

export default TableBodyTypes;