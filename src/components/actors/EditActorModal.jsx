import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/style.css';

const EditActorModal = ({ isOpen, onClose, actor, onEdit }) => {
  const [editedActor, setEditedActor] = useState(actor || { name: ''});
  const [actorEditColor, setActorColor] = useState({
    hue: 90,
    saturation: 70,
    luminosity: 50,
    alpha: 1,
  });

  // Limpiar el estado del actor editado cuando el modal se cierra
  useEffect(() => {
    if (!isOpen) {
      setEditedActor({ name: ''});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedActor({
      ...editedActor,
      [name]: value
    });
  };

  function hslToHex(h, s, l) {
    // Convertir los valores HSL a RGB
    let r, g, b;
    h /= 360;
    s /= 100;
    l /= 100;
  
    if (s === 0) {
      r = g = b = l; // Escala de grises
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    // Convertir RGB a hexadecimal
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  
  const handleColorChange = (color) => {
    setActorColor((prev) => ({...prev, color}));
  }

  const handleSubmit = () => {
    // Verificar si se ha modificado el nombre del actor
    const editedName = editedActor.name.trim() !== '' ? editedActor.name : actor.name;
  
    // Verificar si se ha seleccionado un nuevo color
    const hexColor = actorEditColor.color !== undefined ? hslToHex(actorEditColor.color, actorEditColor.saturation, actorEditColor.luminosity) : actor.color;
  
    // Llamar a handleEdit con el nombre y el color del actor editado
    onEdit(editedName, hexColor);
  
    // Cerrar el modal después de guardar los cambios
    onClose();
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Actor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize='20px'>Label</FormLabel>
            <Input
              type="text"
              name="name"
              value={editedActor.name}
              onChange={handleChange}
              placeholder={actor ? actor.name : ''}
            />
          </FormControl>
          <FormControl display='flex' alignItems='center' flexDirection='column' mt='20px'>
            <FormLabel fontSize='20px'>Color</FormLabel>
            <ColorPicker
              {...actorEditColor}
              onInput={handleColorChange}
            />
          </FormControl>
          {/* Aquí puedes agregar más campos para editar otros detalles del actor */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditActorModal;