import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import EditActorModal from './EditActorModal'
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import { IconPickerItem } from 'react-icons-picker';

const TableBodyActors = ({ data }) => {
  const [actors, setActors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //Editar actores
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actorIndexToEdit, setActorIndexToEdit] = useState(null);
  const [actorToEdit, setActorToEdit] = useState(null);
  
  const handleOpenEditModal = (index, actor) => {
    setActorIndexToEdit(index);
    // Pasar todo el objeto actor
    setActorToEdit(actor);
    setIsEditModalOpen(true);
  };
  
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (editedName) => {
    const updatedActors = [...actors];
    updatedActors[actorIndexToEdit].name = editedName;
    setActors(updatedActors);
    localStorage.setItem('actors', JSON.stringify(updatedActors));
    setIsEditModalOpen(false); // Cerrar el modal de edición
  };
  
  //Borrar actores
  const [actorIndexToDelete, setActorIndexToDelete] = useState(null);
  const [actorNameToDelete, setActorNameToDelete] = useState(null);

  const handleConfirmDelete = () => {
    const updatedActors = [...actors];
    updatedActors.splice(actorIndexToDelete, 1);
    setActors(updatedActors);
    localStorage.setItem('actors', JSON.stringify(updatedActors));
    setIsOpen(false);
    const deleteActorEvent = new CustomEvent('deleteActor', {
      detail: actorIndexToDelete // Envía el índice del actor eliminado como detalle
    });
    document.dispatchEvent(deleteActorEvent);
  };

  const handleOpenModal = (index, name) => {
    setActorIndexToDelete(index);
    setActorNameToDelete(name);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    if (storedActors) {
      setActors(storedActors);
    }
  }, []);

  useEffect(() => {
    const handleNewActor = (event) => {
      const { detail } = event;
      setActors((prevActors) => [...prevActors, detail]);
    };
  
    document.addEventListener('newActor', handleNewActor);
  
    return () => {
      document.removeEventListener('newActor', handleNewActor);
    };
  }, []);

  return (
    <>
      <Table size="sm" color="white">
        <Tbody>
          {actors.map((actor, index) => (
            <Tr key={actor.name} bg="#272F34">
              <Td width='30.1%' textAlign="center" borderRight="1px">
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
              <Td width='29%' textAlign="center" borderRight="1px">{actor.name}</Td>
              <Td width='8.9%' textAlign="center" borderRight="1px">{index + 1}</Td>
              <Td width='0%' className="hover-element" textAlign="center">
                <Icon as={FiMoreVertical} fontSize="1.5vw" />
                <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(index, actor)} />
                <TiDeleteOutline className="delete-icon" onClick={() => handleOpenModal(index, actor.name)} />
              </Td>
            </Tr>
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
        type={`actor ${actorNameToDelete}`}
      />
    </>
  );
};

export default TableBodyActors;
