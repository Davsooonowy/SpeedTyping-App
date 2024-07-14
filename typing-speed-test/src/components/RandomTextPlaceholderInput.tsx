import React, {useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {useRandomText} from '../hooks/useRandomText';
import {Colors} from '../assets/colors';
import {calculateAccuracy, calculateCPM, calculateWPM} from "../utils/statisticsUtils";

interface RandomTextPlaceholderInputProps {
    onInputChange: (newInput: string) => void;
    input: string;
    onClick?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onUpdateAccuracy?: (accuracy: number) => void;
    onUpdateCPM?: (cpm: number) => void;
    onUpdateWPM?: (wpm: number) => void;
    timeLeft: number;
    resetTrigger: number;
}

const RandomTextPlaceholderInput: React.FC<RandomTextPlaceholderInputProps> = ({
                                                                                   onInputChange,
                                                                                   input,
                                                                                   onClick,
                                                                                   onKeyDown,
                                                                                   onUpdateAccuracy,
                                                                                   onUpdateCPM,
                                                                                   timeLeft,
                                                                                   onUpdateWPM,
                                                                                   resetTrigger
                                                                               }) => {
    const {text: originalText, loading} = useRandomText([resetTrigger]);
    const [position, setPosition] = useState(0);
    const [successfulInput, setSuccessfulInput] = useState<{ char: string; crossed: boolean }[]>([]);
    const [maxChars, setMaxChars] = useState(35);
    const [totalLetters, setTotalLetters] = useState(0);
    const [correctLetters, setCorrectLetters] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [correctWords, setCorrectWords] = useState(0);


    useEffect(() => {
        setPosition(0);
        setSuccessfulInput([]);
    }, [resetTrigger]);

    useEffect(() => {
        const calculateMaxChars = () => {
            const textFieldElement = document.querySelector('.text-field-container input') as HTMLElement;
            const textFieldWidth = textFieldElement ? textFieldElement.offsetWidth : 0;
            const averageCharWidth = 9;
            const calculatedMaxChars = Math.floor(textFieldWidth / averageCharWidth);
            setMaxChars(calculatedMaxChars);
        };

        calculateMaxChars();
        window.addEventListener('resize', calculateMaxChars);

        return () => window.removeEventListener('resize', calculateMaxChars);
    }, []);

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
            setPosition((prevPosition) => prevPosition + 1);

            if (event.key !== ' ') {
                setCurrentWord((prevWord) => prevWord + event.key);
            } else {
                // Check correctness of the word when space is encountered
                const isCorrect = originalText.split(' ')[correctWords] === currentWord;
                if (isCorrect) {
                    setCorrectWords((prevCount) => prevCount + 1);
                }
                setCurrentWord(''); // Reset current word for the next word
            }

            let updatedInput;
            setTotalLetters((prevTotal) => prevTotal + 1);
            if (match) {
                setCorrectLetters((prevCorrect) => prevCorrect + 1);
                updatedInput = [...successfulInput, {char: event.key, crossed: false}];
            } else {
                const originalChar = originalText.charAt(position);
                updatedInput = [...successfulInput, {char: originalChar, crossed: true}];
            }

            const accuracy = calculateAccuracy(correctLetters, totalLetters);
            if (onUpdateAccuracy) onUpdateAccuracy(accuracy);

            const elapsedTime = (60 - timeLeft);

            const CPM = calculateCPM(correctLetters, elapsedTime);
            if (onUpdateCPM) onUpdateCPM(CPM);

            const WPM = calculateWPM(correctWords, elapsedTime);
            if (onUpdateWPM) onUpdateWPM(WPM);

            const maxChars = 35;
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
            onChange={() => {
            }}
            variant="outlined"
            InputProps={{
                readOnly: true,
                startAdornment: (
                    <div style={{overflow: 'hidden', width: '100%', textAlign: 'right', marginRight: '-1ch'}}>
                        {successfulInput.map((input, index) => (
                            <span key={index} style={{
                                color: 'grey',
                                fontSize: '1.75rem',
                                lineHeight: 'normal',
                                textDecoration: input.crossed ? 'line-through' : 'none'
                            }}>
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
                    paddingRight: '10ch',
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
