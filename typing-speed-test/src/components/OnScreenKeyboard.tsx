import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../styles/OnScreenKeyboard.css';
import useKeyboard from '../hooks/useKeyboard';

interface OnScreenKeyboardProps {
  input: string;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ input }) => {
  const { capsLock, activeKey } = useKeyboard();

  return (
    <Keyboard
      theme="hg-theme-default myTheme"
      inputValue={input}
      layoutName={capsLock ? 'shift' : 'default'}
      buttonTheme={[
        {
          class: "activeKey",
          buttons: activeKey
        }
      ]}
    />
  );
};

export default OnScreenKeyboard;
