import React, { useState, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Heading, VStack, FormControl, FormLabel, Radio, RadioGroup, useBreakpointValue } from '@chakra-ui/react';
import { Question } from '../../Shared/interfaces/Question';
import { questions } from '../utils/questions';
import LikertScale from '../components/LikertScale';
import { AnimatePresence, motion } from 'framer-motion';

interface QuizFormProps {
  question: Question;
  onAnswered: (answer: number) => void;
  isFinalQuestion: boolean;
}

const QuizForm = forwardRef<HTMLDivElement, QuizFormProps>(
  ({ question, onAnswered, isFinalQuestion }, ref) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleAnswer = () => {
      if (selectedAnswer !== null) {
        onAnswered(selectedAnswer);
      }
    };

    return (
      <Box ref={ref} textAlign="center">
        <FormControl as="fieldset">
          <FormLabel as="legend">{isFinalQuestion ? 'How many habits do you want to take on?' : question.text}</FormLabel>
          {isFinalQuestion ? (
            <RadioGroup
              value={selectedAnswer === null ? '' : selectedAnswer.toString()}
              onChange={(value: string) => setSelectedAnswer(parseInt(value))}
            >
              <VStack spacing={2}>
                {[...Array(5)].map((_, index) => (
                  <Radio key={index} value={index + 1}>
                    {index + 1}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          ) : (
            <LikertScale
              min={1}
              max={5}
              step={1}
              value={selectedAnswer}
              onChange={(value) => setSelectedAnswer(value)}
            />
          )}
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleAnswer}
            isDisabled={selectedAnswer === null}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    );
  }
);

const MotionQuizForm = motion(QuizForm);

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const history = useHistory();
  const totalQuestions = questions.length;

  const handleAnswered = (answer: number) => {
    if (currentQuestionIndex === totalQuestions) {
      const scores = calculateScores(answers);
      history.push('/results', { scores, totalHabits: answer });
    } else {
      setAnswers([...answers, answer]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

    return scores;
  };

  const pageVariants = {
    initial: { x: '50%', opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: '-50%', opacity: 0 }
  };

  const transition = {
    duration: 0.5, // Animation duration in seconds
    ease: 'easeInOut', // Easing function
  };

  return (
    <Container maxW="container.md" centerContent>
      <Heading mb={6}>Quiz</Heading>
        <VStack spacing={6}>
            {currentQuestionIndex <= totalQuestions ? (
              <AnimatePresence exitBeforeEnter>
                <MotionQuizForm
                  key={currentQuestionIndex}
                  question={questions[currentQuestionIndex]}
                  onAnswered={handleAnswered}
                  isFinalQuestion={currentQuestionIndex === totalQuestions}
                  initial="initial" animate="in" exit="out" transition={transition} variants={pageVariants}
                />
              </AnimatePresence>
            ) : null}
      </VStack>
    </Container>
  );
};

export default QuizPage;