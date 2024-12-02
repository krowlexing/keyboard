import { Stack, TextField, Typography } from "@mui/material";
import { ExerciseTextInput, SaveButton } from "./styles";

type Props = {
    text?: string;
};

export function ManualForm(props: Props) {
    return (
        <Stack
            direction="column"
            width="inherit"
            justifyContent="center"
            alignItems="center"
        >
            <ExerciseTextInput defaultValue={props.text} />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                margin={3}
            >
                <Typography margin={3}>Уровень сложности</Typography>
                <TextField
                    type="number"
                    size="small"
                    defaultValue={5}
                    sx={{ width: "5rem" }}
                />
            </Stack>
            <SaveButton />
        </Stack>
    );
}
