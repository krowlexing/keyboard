import { Stack, Typography, TextField, Paper } from "@mui/material";
import { ExerciseTextInput, GenerateButton, SaveButton } from "./styles";
import { groups, zones } from "../../../data/keys";
import { useEffect, useState } from "react";
import { network } from "../../../network/network";
import { useNavigate } from "react-router";
import { DifficultyData, zones as fromZones } from "../../../dto/diff";

type Props = {
    text: string;
    length: number;
    difficulty: number;
    difficulties: DifficultyData[];
    onDifficultyChange: (difficulty: number) => void;
    onLengthChange: (length: number) => void;
    onGenerate: (text: string) => void;
    onSave: (text: string) => void;
};

export function AutomaticForm(props: Props) {
    const { text, length, difficulty, difficulties } = props;
    const { onGenerate, onSave, onDifficultyChange, onLengthChange } = props;

    const allowedZones = fromZones(difficulties[difficulty - 1].zones);
    const nav = useNavigate();
    const [generateError, setGenerateError] = useState("");

    useEffect(() => {
        setGenerateError("");
    }, [difficulty, length]);

    return (
        <Stack direction="column" width="inherit" position={"relative"}>
            {generateError ? (
                <Paper
                    sx={{
                        position: "absolute",
                        padding: "30px 0px 30px 30px",
                        width: "97%",
                        left: 0,
                        zIndex: 100,
                        textAlign: "center",
                        background: "lightpink",
                    }}
                >
                    {generateError}
                </Paper>
            ) : (
                <></>
            )}
            <ExerciseTextInput defaultValue={props.text} value={text} />
            <Stack direction="column" margin={3}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography marginRight={3}>Длина упражнения</Typography>
                    <TextField
                        size="small"
                        value={length}
                        onChange={(e) => {
                            const int = parseInt(e.target.value);

                            onLengthChange(Number.isNaN(int) ? 0 : int);
                        }}
                        defaultValue={length}
                        sx={{ width: "5rem" }}
                    />
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    margin={3}
                >
                    <Typography marginRight={3}>Уровень сложности</Typography>
                    <TextField
                        onChange={(e) => {
                            const int = parseInt(e.target.value);
                            onDifficultyChange(Number.isNaN(int) ? 1 : int);
                        }}
                        type="number"
                        size="small"
                        inputProps={{ min: 1, max: 5 }}
                        value={difficulty}
                        sx={{ width: "5rem" }}
                    />
                </Stack>
            </Stack>
            <GenerateButton
                sx={{ marginBottom: 2 }}
                onClick={() => {
                    if (
                        length < difficulties[difficulty - 1].minChars ||
                        length > difficulties[difficulty - 1].maxChars
                    ) {
                        setGenerateError(
                            `Длина упражнения должна быть в диапазоне от ${
                                difficulties[difficulty - 1].minChars
                            } до ${difficulties[difficulty - 1].maxChars}`
                        );
                    } else {
                        setGenerateError("");
                        onGenerate(generateText(allowedZones, length));
                    }
                }}
            />
            <SaveButton
                onClick={() => {
                    onSave(text);
                }}
            />
        </Stack>
    );
}

function generateText(goodZones: boolean[], length: number): string {
    const zoneIds = goodZones
        .map((z, i) => (z ? i : null))
        .filter((z) => z != null);

    const availableChars = zoneIds.flatMap((id) => zones[id]);

    return Array(length)
        .fill(0)
        .map(() => randomChar(availableChars))
        .join("");
}

function randomChar(text: string[]): string {
    const id = randomInt(text.length);
    const result = text[id];

    if (text[id] != " ") {
        const id = randomInt(text.length);
        if (isNumber(result)) {
            const id = randomInt(text.length);
            if (isNumber(result)) {
                const id = randomInt(text.length);
                if (isNumber(result)) {
                    const id = randomInt(text.length);
                    if (isNumber(result)) {
                        const id = randomInt(text.length);

                        return text[id];
                    }
                    return text[id];
                }
                return text[id];
            }
            return text[id];
        }
        return text[id];
    }
    return text[id];
}

function randomInt(n: number) {
    return Math.floor(Math.random() * n + 1) % n;
}

function isNumber(char: string) {
    return (
        char == "0" ||
        char == "1" ||
        char == "2" ||
        char == "3" ||
        char == "4" ||
        char == "5" ||
        char == "6" ||
        char == "7" ||
        char == "8" ||
        char == "9"
    );
}
