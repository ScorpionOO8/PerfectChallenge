import React, { useState } from 'react';
import { Box, Button, Container, Heading, VStack, FormControl, FormLabel, Radio, RadioGroup } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Question } from '../../Shared/interfaces/Question';
import { questions } from '../utils/questions';

interface QuestionFormProps {
  question: Question;
  onAnswered: (answer: number) => void;
  isLastQuestion: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onAnswered, isLastQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(1);

  const handleAnswer = () => {
    onAnswered(selectedAnswer);
  };

  return (
    <Box>
      <FormControl as="fieldset">
        <FormLabel as="legend">{question.text}</FormLabel>
        <RadioGroup value={selectedAnswer} onChange={(value: string) => setSelectedAnswer(parseInt(value))}>
          <VStack spacing={2}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
          </VStack>
        </RadioGroup>
        <Button colorScheme="teal" mt={4} onClick={handleAnswer}>Submit</Button>
      </FormControl>
    </Box>
  );
};

interface QuizPageProps {
  onFinish: (scores: Record<string, number>) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const history = useHistory();

  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const scores = calculateScores(answers);
      onFinish(scores);
      history.push('/results');
    }
  };

  const calculateScores = (answers: number[]): Record<string, number> => {
    const scores: Record<string, number> = {};
  
    questions.forEach((question, index) => {
      const category = question.category;
      const answer = answers[index];
  
      if (scores[category]) {
        scores[category] += answer;
      } else {
        scores[category] = answer;
      }
    });
  
    // Get top 4 categories with highest scores
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const topCategories = sortedScores.map(([category]) => category);
  
    return scores;
  };
  
  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center">
        <Heading mb={6}>Quiz</Heading>
        <VStack spacing={6}>
          <QuestionForm
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            onAnswered={handleAnswered}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </VStack>
        {currentQuestionIndex === questions.length && (
          <Button onClick={() => {
            const scores = calculateScores(answers);
            onFinish(scores);
            history.push('/results');
          }}>
            Finish
          </Button>
        )}
      </Box>
    </Container>
  );
};
export default QuizPage;