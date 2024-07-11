import React, { ReactElement } from 'react';
import { Colors } from '../assets/colors';
import StatsCircle from './StatsCircle';
import { Slide, SlideProps, Dialog, DialogTitle, DialogContent, Button, Grid, Typography } from '@mui/material';
import { WPM_DESCRIPTION, CPM_DESCRIPTION, ACCURACY_DESCRIPTION } from '../assets/metricsDescriptions';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  wpm: number;
  cpm: number;
  accuracy: number;
}

interface TransitionProps extends Omit<SlideProps, 'children'> {
  children: ReactElement;
}

const Transition = React.forwardRef<HTMLDivElement, TransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup: React.FC<PopupProps> = ({ open, onClose, onReset, wpm, cpm, accuracy }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3" component="h2" fontWeight="bold">Time's Up!</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center">
          <Grid item><StatsCircle label="WPM" value={`${wpm}`} description={WPM_DESCRIPTION}/></Grid>
          <Grid item><StatsCircle label="CPM" value={`${cpm}`} description={CPM_DESCRIPTION} /></Grid>
          <Grid item><StatsCircle label="Accuracy" value={`${accuracy}%`} description={ACCURACY_DESCRIPTION} /></Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            onClick={onReset}
            variant="contained"
            sx={{ fontSize: '1.25rem', padding: '10px 24px', backgroundColor: Colors.first, '&:hover': { backgroundColor: Colors.first } }}
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
