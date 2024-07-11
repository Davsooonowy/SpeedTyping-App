import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Colors } from '../assets/colors';

interface StatsCircleProps {
  label: string;
  value: number | string;
  percentage?: number;
  color?: string;
  description?: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const StatsCircle: React.FC<StatsCircleProps> = ({ label, value, percentage = 100, color = Colors.first, description }) => {

  const tooltipContent = (
    <React.Fragment>
        <Typography color="inherit" style={{ fontWeight: 'bold' }}>{label}</Typography>
        {description && <Typography>{description}</Typography>}
    </React.Fragment>
  );

return (
    <>
      <HtmlTooltip title={tooltipContent}>
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
      </HtmlTooltip>
    </>
  );
};

export default StatsCircle;
