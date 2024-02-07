import { useState, useEffect } from 'react';
type props = {
    threshold?: number;
}
const useTimer = ({threshold = 30 }:props): [number, () => void] => {
    const [seconds, setSeconds] = useState<number>(threshold);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const resetTimer = () => {
        setSeconds(threshold);
    };

    useEffect(() => {
        if (seconds <= 0) {
            resetTimer();
        }
    }, [threshold, seconds]);

    return [seconds, resetTimer];
};

export default useTimer;
