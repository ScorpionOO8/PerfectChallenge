import React from 'react';
import { Box, Button, Container, Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Habit } from '../../Shared/interfaces/Habit';
import { habits } from '../utils/habits';

interface ResultsPageProps {
  habits: Habit[];
  scores: Record<string, number>;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ habits, scores }) => {
  const history = useHistory();

  const handleRestartQuiz = () => {
    history.push('/quiz');
  };

  const getTopImprovementAreas = (scores: Record<string, number>): string[] => {
    const sortedCategories = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return sortedCategories.slice(0, 4).map(([category]) => category);
  };

  const topImprovementAreas = getTopImprovementAreas(scores);
  const selectedHabits = habits.filter((habit) => topImprovementAreas.includes(habit.category));

  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center">
        <Heading mb={6}>Your 30-Day Challenge</Heading>
        <VStack spacing={6}>
          <VStack spacing={4} width="100%">
            <Text>Your custom 30-day challenge includes the following habits:</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {selectedHabits.map((habit, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="md"
                  width="100%"
                >
                  <Text fontWeight="bold">{habit.category}</Text>
                  <Text>{habit.options.join(', ')}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
          <Button colorScheme="teal" onClick={handleRestartQuiz}>
            Restart Quiz
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ResultsPage;
