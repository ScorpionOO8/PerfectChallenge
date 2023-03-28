import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    teal: {
      500: '#38B2AC',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
});

export default theme;
