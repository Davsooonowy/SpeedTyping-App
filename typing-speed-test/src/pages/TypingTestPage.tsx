import React, { useState } from 'react';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import RandomTextPlaceholderInput from '../components/RandomTextPlaceholderInput';
import StatsCircle from '../components/StatsCircle';
import HeaderSection from '../components/HeaderSection';
import { Box, Container, Grid } from '@mui/material';

const TypingTestPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [lastKeyPressed, setLastKeyPressed] = useState("");

  const handleInputChange = (newInput: string) => {
    const newKey = newInput.split('').find((char, index) => char !== input[index]);
    if (newKey) {
      setLastKeyPressed(newKey);
    }
    setInput(newInput);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', marginTop: '64px', justifyContent: 'center' }}>
      <HeaderSection />
      <Grid container spacing={2} justifyContent="center">
        <Grid item><StatsCircle label="Time Left" value="60s" /></Grid>
        <Grid item><StatsCircle label="WPM" value="120" /></Grid>
        <Grid item><StatsCircle label="CPM" value="400" /></Grid>
        <Grid item><StatsCircle label="Accuracy" value="25%" /></Grid>
      </Grid>
      <Box my={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
        <RandomTextPlaceholderInput onInputChange={handleInputChange} input={input} />
        <OnScreenKeyboard input={input} lastKeyPressed={lastKeyPressed} />
      </Box>
    </Container>
  );
};

export default TypingTestPage;
