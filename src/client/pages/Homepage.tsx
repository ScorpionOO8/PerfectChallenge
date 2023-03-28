import React from 'react';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { questions } from '../utils/questions';

const Homepage: React.FC = () => {
  console.log(questions); // add this line to log the questions array to the console


  const history = useHistory();

  const onStartQuiz = () => {
    history.push('/quiz');
  };

  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center">
        <Heading mb={6}>Welcome to Perfect Challenge!</Heading>
        <Text mb={6}>
          Take a short quiz to find your weaknesses, and we'll create a
          custom 30-day self-improvement challenge for you.
        </Text>
        <Button colorScheme="teal" onClick={onStartQuiz}>
          Start Quiz
        </Button>
      </Box>
    </Container>
  );
};

export default Homepage;
     
