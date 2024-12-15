import { useEffect, useState } from "react";

export function useTimer(time: number, onEnd: () => void) {
    const [timer, setTimer] = useState(time);
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
            console.log("clear interval" + interval);
            clearInterval(interval);
        }
        setStopped(true);
        onEnd();
    };
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 0 || stopped) {
                    stop();
                    return t;
                }
                return t - 1;
            });
        }, 1000);

        saveInterval(interval);
        console.log("set interval " + interval);

        return () => {
            if (interval != null) {
                console.log("clear interval " + interval);
                clearInterval(interval);
            }
        };
    }, []);

    return [timer, start, stop] as const;
}
