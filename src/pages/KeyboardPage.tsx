import { useEffect, useState } from "react";
import { KeyboardInput } from "../components/KeyboardInput";
import { useNavigate, useNavigation, useParams } from "react-router";
import { network } from "../network/network";
import { countErrors } from "../components/KeyboardInput/KeyboardInput";
import { ArrowBack } from "@mui/icons-material";
import { Column, Row } from "../utils/styles";
import { Timer } from "../components/KeyboardInput/components/Timer";
import { useTimer } from "../hooks";
import { Keyboard } from "../components/keyboard/Keyboard";
import { Skeleton } from "../components/Skeleton";
import { getExerciseDuration, prettyTime } from "../utils";
import { DifficultyData } from "../dto/diff";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

interface Props {}

let audio = new Audio("/погоня.mp3");

export function KeyboardInputTest(props: Props) {
    const { id } = useParams();

    const [exampleText, setExampleText] = useState("");
    const [value, setValue] = useState("");
    const [allowInput, setDisabled] = useState(false);
    const [difficulties, setDifficulties] = useState<DifficultyData[]>([]);
    const [difficulty, setDifficulty] = useState(1);

    const [keyboardHidden, setKeyboardHidden] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);

    const [text, setText] = useState("");

    const nav = useNavigate();
    const path = window.location.pathname;
    const n = useNavigation();

    const defaultTime =
        difficulties.length > 0
            ? getExerciseDuration(difficulties[difficulty - 1], exampleText)
            : 120;
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

    useEffect(() => {
        audio = new Audio("/погоня.mp3");
    }, []);

    useEffect(() => {
        if (playAudio) {
            audio.play();
            audio.volume = 0.5;
            audio.loop = true;
            return () => audio.pause();
        }
    }, [playAudio]);

    const nextKey = getNextKey(value, exampleText);

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

    useEffect(() => {
        network.exercises.get(+id!).then((e) => {
            setDifficulty(e.level);
            setExampleText(e.text);
        });
        network.difficulty.all().then((d) => {
            setDifficulties(d);
        });
    }, [id]);

    if (id == null || difficulties.length == 0) {
        return <div>а где id....</div>;
    }
    const maxErrors = difficulties[difficulty - 1].errors;

    return (
        <Skeleton selected="exercises">
            <Column
                width={"100%"}
                height={"100%"}
                paddingLeft={20}
                paddingRight={20}
                paddingTop={10}
            >
                <Row justifyContent={"space-between"} fontSize={"1.5rem"}>
                    <ArrowBack sx={{ width: 50, height: 30 }} />
                    <div>
                        Количество символов: {value.length}/{exampleText.length}
                    </div>
                    <Timer time={prettyTime(timer)} />
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
                <Row
                    justifyContent={"center"}
                    visibility={keyboardHidden ? "hidden" : "visible"}
                >
                    <Keyboard nextKey={nextKey} />
                </Row>
                <Row width={"min-content"}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={!keyboardHidden}
                                        onChange={(e) =>
                                            setKeyboardHidden(!e.target.checked)
                                        }
                                    ></input>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    включить клавиатуру
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={playAudio}
                                        onChange={(e) =>
                                            setPlayAudio(e.target.checked)
                                        }
                                    ></input>
                                </TableCell>
                                <TableCell>включить музыку</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Row>
            </Column>
        </Skeleton>
    );
}

function getNextKey(value: string, exampleText: string): string {
    const length = Math.min(value.length, exampleText.length);
    const char = exampleText[length];
    return char == " " ? "spacebar" : char;
}
