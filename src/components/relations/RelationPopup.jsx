import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button,
  Select, Input, Text, Box
} from '@chakra-ui/react';
import LiveBoxTypes from '../LiveBoxTypes';
import { useSearchParams } from 'react-router-dom';
import useRelationTypeStore from '../../store/relationTypesStore';
import useRelationStore from '../../store/relationStore';
import { useTranslation } from 'react-i18next';

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const RelationPopup = ({ isOpen, onClose, existingRelations, onCreateRelation, imageIndex }) => {
  const { t } = useTranslation();
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

  // Mostrar el LiveBox de creación de tipos de relación
  const handleTypesIconClick = () => {
    onClose(); // Cerrar el popup actual
    setLiveBoxTypesOpen(true); // Abrir el LiveBox para crear tipos de relación
  };

  const handleCloseLiveBoxTypes = () => {
    setLiveBoxTypesOpen(false);
  };

  // Validar los campos antes de asignar la relación
  const handleAssignRelation = () => {;
    // Validar que los campos estén completos
    if (selectedRelationType && relationDirection && relationClass && temporaryRelation) {
      // Fusionar la relación temporal con los nuevos datos (tipo de relación, dirección, clase)
      const completedRelation = {
        ...temporaryRelation,   // Aquí se incluyen source, target, session_id
        type_id: selectedRelationType._id,
        type_label: selectedRelationType.selectedOption === 'custom'
        ? selectedRelationType.inputValues.nombre_personalizada  // Mostrar nombre personalizado si es "custom"
        : selectedRelationType.label,  
        weight: selectedRelationType.inputValues.peso_relacion,
        direction: relationDirection,
        class: relationClass,
        imageIndex,
      };
  
      // Enviar la relación completa a MongoDB
      addRelation(completedRelation);  // Aquí guardar la relación en la DB
      
      showToast(`${t('toastRelationCreated')}`, 'success');
      // Cerrar modal
      resetPopUp();
    } else {
      showToast(`${t('toastFillFields')}`, 'error');
    }
  };

  const resetPopUp = () => {
    setSelectedRelationType('');
    setRelationDirection('dirigida');
    setRelationClass('');
    onClose();
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
          <ModalHeader textAlign='center'>{t('relationPopupTitle')}</ModalHeader>
          <ModalBody>
            {/* Selección de tipos de relación */}
            <Text mt={4}>{t('editTypeWord')}:</Text>
            {relationTypes.length > 0 ? (
              <Select
                placeholder={t('selectTypeWord')}
                value={selectedRelationType ? JSON.stringify(selectedRelationType) : ''}  // Serializar el objeto para el valor seleccionado
                onChange={(e) => setSelectedRelationType(JSON.parse(e.target.value))}  // Deserializar al cambiar la selección
              >
                {relationTypes.map((relation) => (
                  <option key={relation._id} value={JSON.stringify(relation)}>  {/* Serializar el objeto */}
                    {relation.selectedOption === 'custom'
                      ? relation.inputValues.nombre_personalizada  // Mostrar nombre personalizado si selectedOption es "custom"
                      : relation.label}  {/* Mostrar el label por defecto */}
                    {" | Weight: " + relation.inputValues.peso_relacion}  {/* Mostrar el peso */}
                  </option>
                ))}
              </Select>
            ) : (
              <Text>{t('relationPopupNoType')}</Text>
            )}
            {/* Ocultar el botón de "Crear nuevo tipo de relación" si ya hay tipos */}
            {relationTypes.length === 0 && (
              <Button mt={4} colorScheme="green" onClick={handleTypesIconClick}>
                {t('relationPopupNewTypeButton')}
              </Button>
            )}

            {/* Dropdown para tipo de relación (dirigida o no dirigida) */}
            <Text mt={4}>{t('editDirectionWord')}:</Text>
            <Select
              value={relationDirection}
              onChange={(e) => setRelationDirection(e.target.value)}
            >
              <option value="dirigida">{t('relationPopupDirected')}</option>
              <option value="no_dirigida">{t('relationPopupNoDirected')}</option>
            </Select>

            {/* Campo para clase */}
            <Text mt={4}>{t('editClassRelatonship')}:</Text>
            <Input
              placeholder={t('editClassRelatonship')}
              value={relationClass}
              onChange={(e) => setRelationClass(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={resetPopUp}>
              {t('cancel')}
            </Button>
            <Button colorScheme="blue" onClick={handleAssignRelation}>
              {t('relationPopupButtonAssing')}
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
