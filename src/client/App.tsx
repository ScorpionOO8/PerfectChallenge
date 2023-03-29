import { ChakraProvider, VStack, HStack, Button } from '@chakra-ui/react';
import { theme } from './theme';
import { ReactNode, useState } from 'react';
import BorderBox from './components/BorderBox';
import { Global, css } from "@emotion/react";

export default function App({ children }: { children: ReactNode }) {

  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');
        `}
      />
      <VStack>
        <BorderBox>
          {children}
        </BorderBox>
      </VStack>
    </ChakraProvider>
  );
}
