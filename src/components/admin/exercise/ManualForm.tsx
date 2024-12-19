import { Input, Stack, TextField, Typography } from "@mui/material";
import { ExerciseTextInput, SaveButton } from "./styles";
import { useForm } from "react-hook-form";

type Props = {
    text: string;
    difficulty: number;
    difficultyError: boolean;
    onDifficultyChange: (difficulty: number) => void;
    onChange: (text: string) => void;
    onSave: (text: string, level: number) => void;
};

export function ManualForm(props: Props) {
    const { text, difficulty, difficultyError } = props;
    const { onChange, onDifficultyChange, onSave } = props;
    return (
        <form
            style={{ width: "inherit" }}
            onSubmit={(e) => {
                onSave(text, difficulty);
                e.preventDefault();
            }}
        >
            <Stack
                direction="column"
                width="inherit"
                justifyContent="center"
                alignItems="center"
            >
                <ExerciseTextInput
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    multiline
                    required
                    defaultValue={props.text}
                />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    margin={3}
                >
                    <Typography margin={3}>Уровень сложности</Typography>
                    <Input
                        required
                        type="number"
                        size="small"
                        value={difficulty}
                        inputProps={{
                            min: 1,
                            max: 5,
                        }}
                        onChange={(e) =>
                            onDifficultyChange(parseInt(e.target.value))
                        }
                        sx={{
                            width: "5rem",
                            border: difficultyError
                                ? "3px solid red"
                                : undefined,

                            borderRadius: 3,
                        }}
                    />
                </Stack>
                <SaveButton type="submit" />
            </Stack>
        </form>
    );
}
