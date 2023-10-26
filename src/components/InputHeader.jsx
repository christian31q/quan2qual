import React, { useState } from 'react';
import { Input, Box, Button } from '@chakra-ui/react';
import '../styles/HandleStyles.css'

function InputHeader({pageTitle}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(pageTitle);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Box
        w='8.5vw'
        h='2vw'
        mr='32vw'
        ml='1vw'
        display='flex'
        alignItems='center'
        className={`box ${isEditing ? 'editing' : ''}`}
      >
        {isEditing ? (
          <Input
            variant='unstyled'
            value={inputValue}
            onChange={handleInputChange}
          />
        ) : (
          <Button
            variant='link'
            fontSize='16px'
            onClick={handleEditClick}
          >
            {inputValue}
          </Button>
        )}
      </Box>
    </div>
  );
}

export default InputHeader;

