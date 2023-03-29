import { ChakraProvider, VStack, HStack, Button } from '@chakra-ui/react';
import { theme } from './theme';
import { ReactNode, useState } from 'react';
import BorderBox from './components/BorderBox';

export default function App({ children }: { children: ReactNode }) {

  return (
    <ChakraProvider theme={theme}>
      <VStack>
        <BorderBox>
          {children}
        </BorderBox>
      </VStack>
    </ChakraProvider>
  );
}
