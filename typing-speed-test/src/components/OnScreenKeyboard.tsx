import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../styles/OnScreenKeyboard.css';

interface OnScreenKeyboardProps {
  input: string;
  lastKeyPressed?: string;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ input, lastKeyPressed }) => {
  return (
    <Keyboard
      theme="hg-theme-default myTheme"
      inputValue={input}
      buttonTheme={[
        {
          class: "hg-highlight",
          buttons: lastKeyPressed ? lastKeyPressed : ""
        }
      ]}
    />
  );
};

export default OnScreenKeyboard;
