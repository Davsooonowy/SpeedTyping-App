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
  const [successfulInput, setSuccessfulInput] = useState<{ char: string; crossed: boolean }[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onInputChange(newValue);
    setPosition(newValue.length);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (onClick) onClick();
  };

  const handleKeyDownPrevent = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key.length === 1) {
      const match = originalText.charAt(position) === event.key;
      console.log(match ? "success" : "failed");
      setPosition((prevPosition) => prevPosition + 1);

      // Add the character to successfulInput with crossed set based on match
      const updatedInput = [...successfulInput, { char: event.key, crossed: !match }];

      // Step 3: Keep the logic for trimming successfulInput, adapted for an array of objects
      const maxChars = 25;
      while (updatedInput.map(item => item.char).join(' ').length > maxChars && updatedInput.length > 1) {
        updatedInput.shift();
      }

      setSuccessfulInput(updatedInput);
    }
    if (onKeyDown) onKeyDown(event);
  };

  const displayedText = loading ? 'Loading...' : originalText.substring(position);

return (
  <TextField
    fullWidth
    value={displayedText}
    onChange={() => {}}
    variant="outlined"
    InputProps={{
      readOnly: true,
      startAdornment: (
        <div style={{ overflow: 'hidden', width: '100%', textAlign: 'right', marginRight: '-1ch' }}>
          {successfulInput.map((input, index) => (
            <span key={index} style={{ color: 'grey', fontSize: '1.75rem', lineHeight: 'normal', textDecoration: input.crossed ? 'line-through' : 'none' }}>
              {input.char}
            </span>
          ))}
        </div>
      ),
    }}
    onClick={handleClick}
    onKeyDown={handleKeyDownPrevent}
    tabIndex={0}
    sx={{
      height: '12em',
      '& .MuiInputBase-input': {
        fontSize: '1.75rem',
        padding: '2em 0.875em',
        paddingLeft: '1ch',
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
