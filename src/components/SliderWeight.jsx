import React, {useState} from 'react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Tooltip } from '@chakra-ui/react';
import { TbWeight } from 'react-icons/tb';

const SliderWeight = ({ value , onChange }) => {
    const [showTooltipLabel, setShowTooltip] = React.useState(false);
  return (
    <Slider
      defaultValue={1}
      flex="1"
      value={value}
      onChange={onChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      min={0}
      max={1}
      step={0.1}
    >
      <SliderTrack bg="gray.100">
        <SliderFilledTrack bg="blue.500" />
      </SliderTrack>
      <Tooltip hasArrow bg='teal.500' color='white' placement='top' isOpen={showTooltipLabel} label={`${value}`}>
        <SliderThumb boxSize={6}>
          <Box color="blue.500" as={TbWeight} />
        </SliderThumb>
      </Tooltip>
    </Slider>
  );
};

export default SliderWeight;
