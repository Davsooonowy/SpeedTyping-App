import React, { useState } from 'react';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import RandomTextPlaceholderInput from '../components/RandomTextPlaceholderInput';
import StatsCircle from '../components/StatsCircle';
import HeaderSection from '../components/HeaderSection';
import { Box, Container, Grid } from '@mui/material';
import useTimer from '../hooks/useTimer';
import { TIMER_DESCRIPTION, WPM_DESCRIPTION, CPM_DESCRIPTION, ACCURACY_DESCRIPTION } from '../assets/metricsDescriptions';


const TypingTestPage: React.FC = () => {
  const [input, setInput] = useState("");
  const { timeLeft, startTimer, isActive, resetTimer } = useTimer(60);
  const handleInputChange = (newInput: string) => {
    setInput(newInput);
    if (!isActive) startTimer();
    if (!timeLeft) resetTimer();
  };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
        if (!isActive) startTimer();
      }
    };


  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', marginTop: '64px', justifyContent: 'center' }}>
      <HeaderSection />
      <Grid container spacing={2} justifyContent="center">
        <Grid item><StatsCircle label="Time Left" value={`${timeLeft}s`} description={TIMER_DESCRIPTION}/></Grid>
        <Grid item><StatsCircle label="WPM" value="120" description={WPM_DESCRIPTION}/></Grid>
        <Grid item><StatsCircle label="CPM" value="400" description={CPM_DESCRIPTION} /></Grid>
        <Grid item><StatsCircle label="Accuracy" value='42' description={ACCURACY_DESCRIPTION} /></Grid>
      </Grid>
      <Box my={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
          <RandomTextPlaceholderInput onInputChange={handleInputChange} input={input} onKeyDown={handleKeyDown} />
          <OnScreenKeyboard input={input} />
      </Box>
    </Container>
  );
};

export default TypingTestPage;
