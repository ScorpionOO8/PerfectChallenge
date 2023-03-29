import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Heading, VStack, FormControl, FormLabel, Radio, RadioGroup } from '@chakra-ui/react';
import { Question } from '../../Shared/interfaces/Question';
import { questions } from '../utils/questions';

interface QuizFormProps {
  question: Question;
  onAnswered: (answer: number) => void;
  isFinalQuestion: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ question, onAnswered, isFinalQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);

  const handleAnswer = () => {
    if (selectedAnswer !== undefined) {
      onAnswered(selectedAnswer);
    }
  };

  return (
    <Box>
      <FormControl as="fieldset">
        <FormLabel as="legend">{isFinalQuestion ? 'How many habits do you want to take on?' : question.text}</FormLabel>
        <RadioGroup value={selectedAnswer} onChange={(value: string) => setSelectedAnswer(parseInt(value))}>
          <VStack spacing={2}>
            {[...Array(5)].map((_, index) => (
              <Radio key={index} value={index + 1}>
                {index + 1}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
        <Button
          colorScheme="blue"
          mt={4}
          onClick={handleAnswer}
          isDisabled={selectedAnswer === undefined}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

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

  return (
    <Container maxW="container.md" centerContent>
      <Box textAlign="center">
        <Heading mb={6}>Quiz</Heading>
        <VStack spacing={6}>
          {currentQuestionIndex <= totalQuestions ? (
            <QuizForm
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswered={handleAnswered}
              isFinalQuestion={currentQuestionIndex === totalQuestions}
            />
          ) : null}
        </VStack>
      </Box>
    </Container>
  );
};

export default QuizPage;
