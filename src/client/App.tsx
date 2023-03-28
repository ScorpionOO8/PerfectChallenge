import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './styles/theme';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import { habits } from './utils/habits';


const App: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>({});

  // Define the onFinish callback function
  const handleQuizFinish = (newScores: Record<string, number>) => {
    // You can decide what to do with the final quiz scores here
    // For example, update the state with the new scores
    setScores(newScores);
    // Perform any other actions as needed
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/quiz"
            // Pass the handleQuizFinish function as the onFinish prop to QuizPage
            render={() => <QuizPage onFinish={handleQuizFinish} />}
          />
          <Route
            path="/results"
            render={() => <ResultsPage habits={habits} scores={scores} />}
          />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;