import { Stack, Typography, TextField } from "@mui/material";
import { ExerciseTextInput, GenerateButton, SaveButton } from "./styles";

type Props = {
    text?: string;
};

export function AutomaticForm(props: Props) {
    return (
        <Stack direction="column" width="inherit">
            <ExerciseTextInput defaultValue={props.text} />
            <Stack direction="column" margin={3}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography marginRight={3}>Длина упражнения</Typography>
                    <TextField
                        size="small"
                        defaultValue={50}
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
                        type="number"
                        size="small"
                        defaultValue={5}
                        sx={{ width: "5rem" }}
                    />
                </Stack>
            </Stack>
            <GenerateButton sx={{ marginBottom: 2 }} />
            <SaveButton />
        </Stack>
    );
}
