import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Icon } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import EditActorModal from './EditActorModal';
import DeleteConfirmationModal from '../../container/DeleteConfirmationModal';
import { IconPickerItem } from 'react-icons-picker';
import requestMongo from '../../api/request';

import { createStandaloneToast } from '@chakra-ui/react';
import { color } from 'framer-motion';

const { ToastContainer, toast } = createStandaloneToast();

const TableBodyActors = ({ data }) => {
  const [actors, setActors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //Editar actores
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actorIdToEdit, setActorIdToEdit] = useState(null);
  const [actorToEdit, setActorToEdit] = useState(null);

  const handleOpenEditModal = (actor) => {
    setActorIdToEdit(actor._id); // Usa el ID del actor
    setActorToEdit(actor); // Proporciona el actor completo
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Editar actores
  const handleEdit = async (editedName, editedColor, editedAttributes) => {
    try{
      // Emitir evento para indicar que un actor ha sido editado
      const event = new CustomEvent('editActor', {
        detail: {
          id: actorIdToEdit,
          editedName,
          editedColor,
          editedAttributes,
        },
      });
      document.dispatchEvent(event); // Emitir el evento
      
      // Actualizar la lista de actores y el almacenamiento local
      const updatedActors = actors.map((actor) => {
        if (actor.id === actorIdToEdit) {
          return {
            ...actor,
            name: editedName,
            color: editedColor,
            attributes: editedAttributes,
          };
        }
        return actor;
      });

      setActors(updatedActors);

      // Filtro y cuerpo
      const filter = {_id: { $oid: actorIdToEdit} };
      const update = {
        $set: {
          name: editedName,
          color: editedColor,
          attributes: editedAttributes,
        }
      };

      const result = await requestMongo("actors", { filter, update }, "updateOne");
      console.log('Result: ', result);

      if (result && result.modifiedCount > 0){
        showToast('Actor editado correctamente', 'success');
      } else{
        setIsEditModalOpen(false); // Cerrar el modal
      }
    } catch (error){
      console.error('Error al editar el actor: ', error);
      showToast('Error al editar el actor', 'error');
    }
  };

  /*
    Actualizar el estado del actor cuando se edita 
  
  */   

  //Borrar actores
  const [actorIdToDelete, setActorIdToDelete] = useState(null);
  const [actorNameToDelete, setActorNameToDelete] = useState(null);

  const handleConfirmDelete = () => {
    // Emitir evento para indicar que un actor ha sido eliminado
    const event = new CustomEvent('deleteActor', {
      detail: actorIdToDelete,
    });
    document.dispatchEvent(event); // Emitir el evento
  
    // Actualizar la lista de actores y el almacenamiento local
    const updatedActors = actors.filter((actor) => actor.id !== actorIdToDelete);
    setActors(updatedActors);
    localStorage.setItem('actors', JSON.stringify(updatedActors));
    setIsOpen(false); // Cerrar modal
    showToast('Actor eliminado correctamente', 'success');
  };
  

  const handleOpenModal = (actor) => {
    setActorIdToDelete(actor.id); // Usa el ID del actor para eliminar
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
  useEffect(() => {
    async function getActors() {
      try{
        const storedActors = await requestMongo("actors", "", "find");
        console.log('Actores DB: ', storedActors.documents);
        setActors(storedActors.documents);
  
      } catch (error){
        console.log("Error al obtener los actores: ", error);
      }
      
    }
    getActors();
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
          {actors.map((actor) => (
            <Tr key={actor.id_front} bg="#173378">
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
              <Td width='8.9%' textAlign="center" borderRight="1px">{actor.id_front}</Td>
              <Td width='0%' className="hover-element" textAlign="center">
                <Icon as={FiMoreVertical} fontSize="1.5vw" />
                <TbEditCircle className="edit-icon" onClick={() => handleOpenEditModal(actor)} />
                <TiDeleteOutline className="delete-icon" onClick={() => handleOpenModal(actor)} />
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
      <ToastContainer />
    </>
  );
};

export default TableBodyActors;
