import React, {useEffect, useState} from 'react';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import RandomTextPlaceholderInput from '../components/RandomTextPlaceholderInput';
import StatsCircle from '../components/StatsCircle';
import HeaderSection from '../components/HeaderSection';
import { Box, Container, Grid } from '@mui/material';
import useTimer from '../hooks/useTimer';
import { TIMER_DESCRIPTION, WPM_DESCRIPTION, CPM_DESCRIPTION, ACCURACY_DESCRIPTION } from '../assets/metricsDescriptions';
import Popup from "../components/ScorePopup";


const TypingTestPage: React.FC = () => {
  const [input, setInput] = useState("");
  const { timeLeft, startTimer, isActive, resetTimer } = useTimer(60);
  const [accuracy, setAccuracy] = useState(0);
  const [cpm, setCPM] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [resetCount, setResetCount] = useState(0);


  useEffect(() => {
    if (timeLeft === 0) {
      setShowPopup(true);
    }
  }, [timeLeft]);

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

    const resetTest = () => {
      setInput("");
      setWPM(0);
      setCPM(0);
      setAccuracy(0);
      setShowPopup(false);
      resetTimer();
      setResetCount(count => count + 1);
    };


  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', marginTop: '64px', justifyContent: 'center' }}>
      <HeaderSection />
      <Grid container spacing={2} justifyContent="center">
        <Grid item><StatsCircle label="Time Left" value={`${timeLeft}s`} description={TIMER_DESCRIPTION}/></Grid>
        <Grid item><StatsCircle label="WPM" value={`${wpm}`} description={WPM_DESCRIPTION}/></Grid>
        <Grid item><StatsCircle label="CPM" value={`${cpm}`} description={CPM_DESCRIPTION} /></Grid>
        <Grid item><StatsCircle label="Accuracy" value={`${accuracy}%`} description={ACCURACY_DESCRIPTION} /></Grid>
      </Grid>
      <Box my={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
          <RandomTextPlaceholderInput onInputChange={handleInputChange} input={input} onKeyDown={handleKeyDown} onUpdateAccuracy={setAccuracy} onUpdateCPM={setCPM} timeLeft={timeLeft} onUpdateWPM={setWPM} resetTrigger={resetCount}/>
          <OnScreenKeyboard input={input} />
      </Box>
      <Popup open={showPopup} onClose={() => setShowPopup(false)} onReset={resetTest} wpm={wpm} cpm={cpm} accuracy={accuracy} />
    </Container>
  );
};

export default TypingTestPage;
