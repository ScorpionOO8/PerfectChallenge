import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Habit } from '../../Shared/interfaces/Habit';
import { habits } from '../utils/habits';
import { categories } from '../utils/categories';

interface ResultsPageProps {
  habits: Habit[];
  scores: Record<string, number>;
  totalHabits: number;
}

const ResultsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<ResultsPageProps>();
  const { scores, totalHabits } = location.state;
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>('');

  const handleRestartQuiz = () => {
    history.push('/quiz');
  };

  const getTopImprovementAreas = (scores: Record<string, number>): string[] => {
    const sortedCategories = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return sortedCategories.slice(0, totalHabits).map(([category]) => category);
  };

  const handleOptionChange = (value: string) => {
    setCurrentSelection(value);
  };

  const handleSubmit = () => {
    setSelectedOptions((prev) => [...prev, currentSelection]);
    setStep((prev) => prev + 1);
    setCurrentSelection('');
  };

  const topImprovementAreas = getTopImprovementAreas(scores);
  const selectedHabits = habits.filter((habit) => topImprovementAreas.includes(habit.category));
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center">
        <Heading mb={6}>Your 30-Day Challenge</Heading>
        <VStack spacing={6}>
          {step < selectedHabits.length ? (
            <VStack spacing={4} width="100%">
              <Text>Select a habit from the {categoryMap[selectedHabits[step].category]} category:</Text>
              <RadioGroup value={currentSelection} onChange={handleOptionChange}>
                <Stack>
                  {selectedHabits[step].options.map((option, index) => (
                    <Radio key={index} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!currentSelection}>
                Submit
              </Button>
            </VStack>
          ) : (
          <>
            <VStack spacing={4} width="100%">
              <Text>Your custom 30-day challenge includes the following habits:</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {selectedOptions.map((option, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="md"
                    width="100%"
                    >
                      <Text fontWeight="bold">{categoryMap[selectedHabits[index].category]}</Text>
                      <Text>{option}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
              <Button colorScheme="blue" onClick={handleRestartQuiz}>
                Restart Quiz
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Container>
  );
};
export default ResultsPage;      
