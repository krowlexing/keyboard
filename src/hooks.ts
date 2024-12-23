import { useEffect, useState } from "react";

export function useTimer(time: number, onEnd: () => void) {
    const [timer, setTimer] = useState(time);
    const [paused, setPaused] = useState(true);
    const [stopped, setStopped] = useState(false);

    const [interval, saveInterval] = useState<NodeJS.Timeout | null>(null);

    const start = () => {
        console.log("start");
        setStopped(false);
        setTimer(time);
    };

    const stop = () => {
        console.log("stop " + interval);
        if (interval != null) {
            console.log("clear interval - stop" + interval);
            clearInterval(interval);
        }
        setStopped(true);
        onEnd();
    };

    const pause = () => {
        setPaused(true);
    };

    const resume = () => {
        setPaused(false);
    };

    useEffect(() => {
        setTimer(time);
    }, [time]);

    useEffect(() => {
        console.log("timer mounted");
        let interval = setInterval(() => {
            if (!paused) {
                setTimer((t) => {
                    if (t <= 0 || stopped) {
                        stop();
                        return t;
                    }
                    return t - 1;
                });
            }

            if (timer <= 0 || stopped) {
                clearInterval(interval);
            }
        }, 1000);

        saveInterval(interval);
        console.log("set interval " + interval);

        return () => {
            if (interval != null) {
                console.log("clear interval - cleanup" + interval);
                clearInterval(interval);
            }
        };
    }, [stopped, paused]);

    return [
        timer,
        start,
        stop,
        {
            pause,
            resume,
        },
    ] as const;
}
