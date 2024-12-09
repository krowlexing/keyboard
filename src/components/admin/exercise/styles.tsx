import { Button, ButtonProps, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export const ExerciseTextInput = forwardRef((props: TextFieldProps, ref) => {
    return (
        <TextField
            multiline
            minRows={7}
            sx={{
                width: "inherit",
            }}
            {...props}
            inputRef={ref}
        />
    );
});

export const GenerateButton = (props: ButtonProps) => {
    return (
        <Button
            variant="contained"
            {...props}
            sx={{
                color: "black",
                background: "white",
                borderRadius: 100,
                border: "2px solid black",
                width: "inherit",
                ...props.sx,
            }}
        >
            Сгенерировать
        </Button>
    );
};

export const SaveButton = (props: ButtonProps) => {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: 100,
                border: "2px solid black",
                width: "inherit",
            }}
            {...props}
        >
            Сохранить{" "}
        </Button>
    );
};
