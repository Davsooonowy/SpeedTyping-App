import React from 'react';
import { Box, Typography } from '@mui/material';

const HeaderSection: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} style={{ padding: '0.5em' }}>
      <Typography variant="h4" style={{ fontWeight: 'bold', padding: '0.125em' }}>Test your typing skills</Typography>
    </Box>
  );
};

export default HeaderSection;
