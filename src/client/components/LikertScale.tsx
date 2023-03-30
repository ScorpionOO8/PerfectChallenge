// src/components/LikertScale.tsx
import React from 'react';
import { HStack, Button, Image, Box, useBreakpointValue } from '@chakra-ui/react';

import image1 from '../assets/LikScl1.png';
import image2 from '../assets/LikScl2.png';
import image3 from '../assets/LikScl3.png';
import image4 from '../assets/LikScl4.png';
import image5 from '../assets/LikScl5.png';

interface LikertScaleProps {
  min: number;
  max: number;
  step: number;
  value: number | null;
  onChange: (value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ min, max, step, value, onChange }) => {
  const images = [image1, image2, image3, image4, image5];
  const options = [];

  const buttonSize = useBreakpointValue({
    base: '37.5px',
    sm: '56.25px',
    md: '75px',
    lg: '75px',
    xl: '75px',
  });

  for (let i = min; i <= max; i += step) {
    options.push(
      <Button
        key={i}
        onClick={() => onChange(i)}
        p={0}
        width={buttonSize}
        height={buttonSize}
        border={"none"}
        backgroundColor={'transparent'}
        borderRadius="10px"
      >
        <Box
          width="100%"
          height="100%"
          border="4px"
          borderColor={i === value ? 'white' : 'transparent'}
          borderRadius="10px"
          overflow="hidden"
        >
          <Image src={images[i - 1]} alt={`Option ${i}`} boxSize="100%" />
        </Box>
      </Button>
    );
  }

  return <HStack spacing={5} justifyContent="center">{options}</HStack>;
};

export default LikertScale;
