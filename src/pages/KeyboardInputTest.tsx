import { useEffect, useState } from "react";
import { KeyboardInput } from "../components/KeyboardInput";
import { useNavigate, useNavigation, useParams } from "react-router";
import { network } from "../network/network";
import { countErrors } from "../components/KeyboardInput/KeyboardInput";
import { ArrowBack } from "@mui/icons-material";
import { Row } from "../utils/styles";
import { Timer } from "../components/KeyboardInput/components/Timer";
import { useTimer } from "../hooks";

interface Props {}

export function KeyboardInputTest(props: Props) {
    const { id } = useParams();

    const [exampleText, setExampleText] = useState("");
    const [value, setValue] = useState("");
    const [allowInput, setDisabled] = useState(false);

    const [text, setText] = useState("");

    const nav = useNavigate();
    const path = window.location.pathname;
    const n = useNavigation();

    const defaultTime = 120;
    const [timer, start, stop] = useTimer(defaultTime, () => {
        setDisabled(true);
    });

    const errors = countErrors(value, exampleText);

    let returnTimeout = null;
    const scheduleReturn = () => {
        returnTimeout = setTimeout(() => {
            if (path === "/keyboard/" + id) {
                nav("/exercises");
            }
        }, 2000);
    };

    const cancelReturn = () => {};

    const onEnd = (text: string) => {
        let errors = countErrors(text, exampleText);
        network.stats.create({
            exerciseId: +id!,
            chars: text.length,
            time: defaultTime - timer,
            errors,
        });

        scheduleReturn();
    };

    useEffect(() => {
        start();
        setDisabled(false);
        return () => {
            stop();
        };
    }, []);

    useEffect(() => {
        if (exampleText.length === 0) {
            return;
        }
        if (errors >= maxErrors || value.length === exampleText.length) {
            setDisabled(true);
            stop();
            onEnd(value);
        }
    }, [value]);

    const maxErrors = 5;

    useEffect(() => {
        network.exercises.get(+id!).then((e) => {
            setExampleText(e.text);
        });
    }, [id]);

    if (id == null) {
        return <div>а где id....</div>;
    }

    return (
        <>
            <Row justifyContent={"space-between"}>
                <ArrowBack />
                <div>
                    Количество символов: {value.length}/{exampleText.length}
                </div>
                <Timer time={`${Math.floor(timer / 60)}:${timer % 60}`} />
                <div>
                    Количество ошибок: {errors}/{maxErrors}
                </div>
            </Row>
            <KeyboardInput
                disableInput={!allowInput}
                value={value}
                placeholder={exampleText}
                onInput={(char) => {
                    setValue((val) => char);
                }}
            />
            <button onClick={() => setValue("")}>reset</button>
        </>
    );
}
