import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/style.css';
import IconPicker from 'react-icons-picker';
import { createStandaloneToast } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import useActorStore from '../store/actorStore';
import { useTranslation } from 'react-i18next';

const { ToastContainer, toast } = createStandaloneToast();

function LiveBoxActors({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { createActor } = useActorStore();

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [actorName, setActorName] = useState('');
  const [actorColor, setActorColor] = useState({
    hue: 90,
    saturation: 70,
    luminosity: 50,
    alpha: 1,
  });
  const [actorIcon, setActorIcon] = useState("FaUsers");
  const [attributes, setAttributes] = useState([]);

  function hslToHex(h, s, l) {
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
  
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const validateAndCreateActor = () => {
    if (!actorName.trim()) {
      showToast(`${t('toastEnterLabelActor')}`, 'error');
      return;
    }

    if (typeof actorColor.color !== 'number' || isNaN(actorColor.color)) {
      showToast(`${t('toastEnterColorActor')}`, 'error');
      return;
    }

    const hexColor = hslToHex(actorColor.color, actorColor.saturation, actorColor.luminosity);
    const newActor = {
      name: actorName,
      color: hexColor,
      icon: actorIcon,
      attributes,
      session_id: sessionId,
    };

    // Llamar a la función del store de Zustand para crear el actor
    createActor(newActor);

    showToast(`${t('toastActorCreated')}`, 'success');
    resetFields();
    onClose();
  };

  const handleColorChange = (color) => {
    setActorColor((prev) => ({...prev, color}));
  };

  const handleIconChange = (icon) => {
    setActorIcon(icon);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = { key, value };
    setAttributes(updatedAttributes);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const handleCancel = () => {
    resetFields();
    onClose();
  };

  const showToast = (message, type) => {
    toast({
      title: type,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const resetFields = () => {
    setActorName('');
    setActorColor({
      hue: 90,
      saturation: 100,
      luminosity: 50,
      alpha: 1,
    });
    setActorIcon('FaUsers');
    setAttributes([]);
  };

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="#173378"
      p="30px"
      borderRadius="md"
      boxShadow="md"
      display={isOpen ? 'block' : 'none'}
      zIndex="999"
      minWidth="650px"
    >
      <Text fontSize="1.5rem" mb="4" textAlign="center">
        {t('createNewActorWord')}
      </Text>
      <Divider mb="4" />
      <Flex alignItems="center" mb="4" justifyContent="center">
        <ColorPicker
          {...actorColor}
          onInput={handleColorChange}
        />
        <IconPicker value={actorIcon} onChange={handleIconChange} />
      </Flex>
      <Divider mb="4" />
      <VStack mb="4" spacing="2">
        <HStack spacing="4">
          <Text>Label:</Text>
          <Input
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
            placeholder={t('actorLabelText')}
            _placeholder={{ color: 'gray.400' }}
          />
        </HStack>
        <Text fontSize="xl" mb="4" textAlign="center">
          {t('addActorAttributes')}
        </Text>
        {attributes.map((attribute, index) => (
          <HStack key={index} spacing="4">
            <Input
              placeholder={t('attributeText')}
              value={attribute.key}
              onChange={(e) => handleAttributeChange(index, e.target.value, attribute.value)}
            />
            <Input
              placeholder={t('valueText')}
              value={attribute.value}
              onChange={(e) => handleAttributeChange(index, attribute.key, e.target.value)}
            />
            <IconButton
              aria-label="Eliminar atributo"
              icon={<TiDeleteOutline />}
              onClick={() => handleRemoveAttribute(index)}
              fontSize="30px"
              variant="ghost"
              color="white"
              _hover={{ bg: "red.600" }}
            />
          </HStack>
        ))}
        <IconButton
          colorScheme='gray'
          aria-label='Añadir atributo'
          icon={<IoMdAddCircleOutline />}
          onClick={handleAddAttribute}
          fontSize="30px"
          width="10rem"
          borderRadius="0.75rem"
        />
      </VStack>
      <Flex justifyContent="space-evenly">
        <Button
          onClick={handleCancel}
          colorScheme='red'
          width= "10.375rem"
          height= "2.8125rem"
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={validateAndCreateActor}
          colorScheme="green"
          width= "10.375rem"
          height= "2.8125rem"
        >
          {t('create')}
        </Button>
      </Flex>
      <ToastContainer />
    </Box>
  );
}

export default LiveBoxActors;