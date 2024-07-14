import {useEffect, useState} from 'react';

const useTimer = (initialTime = 60) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((time) => {
                    if (time <= 1) {
                        clearInterval(interval!);
                        setIsActive(false);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);
    const resetTimer = () => {
        setTimeLeft(initialTime);
        setIsActive(false);
    };

    return {timeLeft, isActive, startTimer, pauseTimer, resetTimer};
};

export default useTimer;
