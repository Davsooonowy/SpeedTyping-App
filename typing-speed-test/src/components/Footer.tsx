import React from 'react';
import {Box, Typography} from '@mui/material';
import {Colors} from '../assets/colors';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: Colors.third,
                color: Colors.fifth,
                textAlign: 'center',
                padding: '10px 0',
                bottom: 0,
                width: '100%',
            }}
        >
            <Typography variant="body1">© 2024 Speedy. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;
