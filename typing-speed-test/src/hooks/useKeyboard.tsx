import {useEffect, useState} from 'react';

const useKeyboard = () => {
    const [input, setInput] = useState('');
    const [capsLock, setCapsLock] = useState(false);
    const [activeKey, setActiveKey] = useState('');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' || event.code === 'CapsLock') {
                event.preventDefault();
            }

            const {key, getModifierState} = event;

            if (key === 'CapsLock') {
                setCapsLock(!capsLock);
            } else if (key === ' ') {
                setInput((prevInput) => prevInput + ' ');
            } else {
                setInput((prevInput) => prevInput + key);
            }

            let keyIdentifier = event.key;
            if (keyIdentifier === ' ') {
                keyIdentifier = '{space}';
                setInput((prevInput) => prevInput.trimEnd() + ' ');
            } else if (keyIdentifier === 'Backspace') {
                keyIdentifier = '{bksp}';
                setInput((prevInput) => prevInput.slice(0, -1));
            } else {
                setInput((prevInput) => prevInput + keyIdentifier);
            }

            setActiveKey(keyIdentifier);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            setActiveKey('');
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [capsLock]);

    return {input, capsLock, activeKey};
};

export default useKeyboard;
