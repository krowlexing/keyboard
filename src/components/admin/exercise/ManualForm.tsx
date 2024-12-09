import { Stack, TextField, Typography } from "@mui/material";
import { ExerciseTextInput, SaveButton } from "./styles";
import { useForm } from "react-hook-form";

type Props = {
    text?: string;
    defaultLevel: number;
    onSave: (text: string, level: number) => Promise<void>;
};

type Form = {
    text: string;
    level: number;
};

export function ManualForm(props: Props) {
    const { defaultLevel } = props;

    const { register, handleSubmit, reset, formState } = useForm<Form>();

    const onSubmit = (data: Form) => {
        props.onSave(data.text, data.level).then(() => {
            reset();
        });
    };

    return (
        <form style={{ width: "inherit" }} onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction="column"
                width="inherit"
                justifyContent="center"
                alignItems="center"
            >
                <ExerciseTextInput
                    {...register("text", { required: true })}
                    multiline
                    defaultValue={props.text}
                />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    margin={3}
                >
                    <Typography margin={3}>Уровень сложности</Typography>
                    <TextField
                        {...register("level", {
                            min: 1,
                            max: 5,
                            required: true,

                            valueAsNumber: true,
                        })}
                        type="number"
                        size="small"
                        defaultValue={defaultLevel}
                        sx={{
                            width: "5rem",
                            border: formState.errors.level
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
