import React, { useState } from 'react';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import RandomTextPlaceholderInput from '../components/RandomTextPlaceholderInput';
import StatsCircle from '../components/StatsCircle';
import HeaderSection from '../components/HeaderSection';
import { Box, Container, Grid } from '@mui/material';
import useTimer from '../hooks/useTimer';

const TypingTestPage: React.FC = () => {
  const [input, setInput] = useState("");
  const { timeLeft, startTimer, isActive, resetTimer } = useTimer(60); // Added isActive to destructuring

  const handleInputChange = (newInput: string) => {
    setInput(newInput);
    if (!isActive) startTimer();
    if (!timeLeft) resetTimer();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
  // Example: Check if the key is alphanumeric and not a control key
  // This is a simplistic approach; you might need to adjust it based on your requirements
      if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
        const newInput = input + event.key;
        handleInputChange(newInput);
      }
      // Implement other key handling logic as needed
    };


  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', marginTop: '64px', justifyContent: 'center' }}>
      <HeaderSection />
      <Grid container spacing={2} justifyContent="center">
        <Grid item><StatsCircle label="Time Left" value={`${timeLeft}s`} /></Grid> {/* Updated to dynamically display timeLeft */}
        <Grid item><StatsCircle label="WPM" value="120" /></Grid>
        <Grid item><StatsCircle label="CPM" value="400" /></Grid>
        <Grid item><StatsCircle label="Accuracy" value="25%" /></Grid>
      </Grid>
      <Box my={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
          <RandomTextPlaceholderInput onInputChange={handleInputChange} input={input} onKeyDown={handleKeyDown} />
          <OnScreenKeyboard input={input} />
      </Box>
    </Container>
  );
};

export default TypingTestPage;
