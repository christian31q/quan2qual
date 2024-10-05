import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button,
  Select, Input, Text, Box
} from '@chakra-ui/react';
import LiveBoxTypes from '../LiveBoxTypes';
import { useSearchParams } from 'react-router-dom';
import useRelationTypeStore from '../../store/relationTypesStore';
import useRelationStore from '../../store/relationStore';

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const RelationPopup = ({ isOpen, onClose, existingRelations, onCreateRelation }) => {
  const { relationTypes, fetchRelationTypes } = useRelationTypeStore();
  const { temporaryRelation, addRelation } = useRelationStore();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const [selectedRelationType, setSelectedRelationType] = useState('');
  const [relationDirection, setRelationDirection] = useState('dirigida'); // Default
  const [relationClass, setRelationClass] = useState('');
  const [isLiveBoxTypesOpen, setLiveBoxTypesOpen] = useState(false); // LiveBox control

  useEffect(() => {
    if (sessionId) {
      fetchRelationTypes(sessionId);
    }
  }, [fetchRelationTypes, sessionId]);

  //console.log(relationTypes);

  // Mostrar el LiveBox de creación de tipos de relación
  const handleTypesIconClick = () => {
    onClose(); // Cerrar el popup actual
    setLiveBoxTypesOpen(true); // Abrir el LiveBox para crear tipos de relación
  };

  const handleCloseLiveBoxTypes = () => {
    setLiveBoxTypesOpen(false);
  };

  // Validar los campos antes de asignar la relación
  const handleAssignRelation = () => {
    console.log(temporaryRelation);
    // Validar que los campos estén completos
    if (selectedRelationType && relationDirection && relationClass && temporaryRelation) {
      // Fusionar la relación temporal con los nuevos datos (tipo de relación, dirección, clase)
      const completedRelation = {
        ...temporaryRelation,   // Aquí se incluyen source, target, session_id
        type: selectedRelationType,
        direction: relationDirection,
        class: relationClass,
      };
  
      // Enviar la relación completa a MongoDB
      addRelation(completedRelation);  // Aquí guardar la relación en la DB
  
      // Cerrar modal
      onClose();
    } else {
      showToast('Por favor, completa todos los campos.', 'error');
    }
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Asignar una relación</ModalHeader>
          <ModalBody>
            {/* Selección de tipos de relación */}
            <Text mt={4}>Tipo de Relación:</Text>
            {relationTypes.length > 0 ? (
              <Select
                placeholder="Seleccione el tipo de relación"
                value={selectedRelationType}
                onChange={(e) => setSelectedRelationType(e.target.value)}
              >
                {relationTypes.map((relation) => (
                  <option key={relation._id} value={relation.label}>
                    {relation.label} | weight: {relation.inputValues.peso_relacion}
                  </option>
                ))}
              </Select>
            ) : (
              <Text>No hay tipos de relación creados.</Text>
            )}

            {/* Ocultar el botón de "Crear nuevo tipo de relación" si ya hay tipos */}
            {relationTypes.length === 0 && (
              <Button mt={4} colorScheme="green" onClick={handleTypesIconClick}>
                Crear nuevo tipo de relación
              </Button>
            )}

            {/* Dropdown para tipo de relación (dirigida o no dirigida) */}
            <Text mt={4}>Tipo de Relación:</Text>
            <Select
              value={relationDirection}
              onChange={(e) => setRelationDirection(e.target.value)}
            >
              <option value="dirigida">Dirigida</option>
              <option value="no_dirigida">No dirigida</option>
            </Select>

            {/* Campo para clase */}
            <Text mt={4}>Clase:</Text>
            <Input
              placeholder="Clase de la relación"
              value={relationClass}
              onChange={(e) => setRelationClass(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleAssignRelation}>
              Asignar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal para crear nuevos tipos de relación */}
      <LiveBoxTypes isOpen={isLiveBoxTypesOpen} onClose={handleCloseLiveBoxTypes} />
    </>
  );
};

export default RelationPopup;
