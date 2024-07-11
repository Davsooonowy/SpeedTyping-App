import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Colors } from '../assets/colors';

interface StatsCircleProps {
  label: string;
  value: number | string;
  percentage?: number;
  color?: string;
}

const StatsCircle: React.FC<StatsCircleProps> = ({ label, value, percentage = 100, color = Colors.first }) => {
  const progress = percentage; // Assuming percentage is already calculated before passing to this component

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={100}
          thickness={2}
          style={{ color }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" component="div" color="textPrimary" style={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle1" component="div" color="textSecondary" style={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StatsCircle;
