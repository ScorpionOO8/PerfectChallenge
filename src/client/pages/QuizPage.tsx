import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Heading, VStack, FormControl, FormLabel, Radio, RadioGroup } from '@chakra-ui/react';
import { Question } from '../../Shared/interfaces/Question';
import { questions } from '../utils/questions';

interface FinalQuestionFormProps {
  onAnswered: (answer: number) => void;
}

const FinalQuestionForm: React.FC<FinalQuestionFormProps> = ({ onAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);

  const handleAnswer = () => {
    if (selectedAnswer !== undefined) {
      onAnswered(selectedAnswer);
    }
  };

  return (
    <Box>
      <FormControl as="fieldset">
        <FormLabel as="legend">How many habits do you want to take on?</FormLabel>
        <RadioGroup
          value={selectedAnswer}
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
        <Button
        colorScheme="teal"
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

interface QuestionFormProps {
  question: Question;
  onAnswered: (answer: number) => void;
  isLastQuestion: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onAnswered, isLastQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);

  const handleAnswer = () => {
    if (selectedAnswer !== undefined) {
      onAnswered(selectedAnswer);
    }
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
        <Button
        colorScheme="teal"
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
          {currentQuestionIndex < totalQuestions ? (
            <QuestionForm
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswered={handleAnswered}
              isLastQuestion={currentQuestionIndex === totalQuestions - 1}
            />
          ) : (
            <FinalQuestionForm onAnswered={handleAnswered} />
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default QuizPage;
