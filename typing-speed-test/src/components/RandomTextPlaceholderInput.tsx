import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useRandomText } from '../hooks/useRandomText';
import { Colors } from '../assets/colors';

interface RandomTextPlaceholderInputProps {
  onInputChange: (newInput: string) => void;
  input: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const RandomTextPlaceholderInput: React.FC<RandomTextPlaceholderInputProps> = ({ onInputChange, input, onClick, onKeyDown }) => {
  const { text: originalText, loading } = useRandomText();
  const [position, setPosition] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onInputChange(newValue);
    setPosition(newValue.length);
  };

  // Combine user input and the remaining original text
  const displayedText = loading ? 'Loading...' : input + originalText.substring(position);

  // Future functionality for marking letters can be implemented here
  // by comparing `input` with `originalText` and applying styles conditionally

  return (
    <TextField
      fullWidth
      value={displayedText}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        readOnly: true,
      }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0} // Make the TextField focusable
      sx={{
        height: '12em',
        '& .MuiInputBase-input': {
          fontSize: '1.75rem',
          padding: '2em 0.875em',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.75em',
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0.125rem',
            borderColor: Colors.Secondary,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.Secondary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.first,
          },
        },
      }}
    />
  );
};

export default RandomTextPlaceholderInput;
