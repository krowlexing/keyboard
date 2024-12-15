import {
    Button,
    Checkbox,
    Stack,
    Table,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { Unstable_NumberInput as NumberInput } from "@mui/base";
import { DifficultyData, zones } from "../../../dto/diff";

export type DifficultyFormData = {
    min: number;
    max: number;
    errors: number;
    time: number;
    zones: boolean[];
};

type DifficultyProps = {
    defaultValues: DifficultyData;
    onSubmit: (data: DifficultyFormData) => void;
};

export function DifficultyEditForm(props: DifficultyProps) {
    const { defaultValues } = props;

    const { register, watch, handleSubmit } = useForm<DifficultyFormData>({
        defaultValues: {
            min: defaultValues.minChars,
            max: defaultValues.maxChars,
            errors: defaultValues.errors,
            time: defaultValues.timeLimit,
            zones: zones(defaultValues.zones),
        },
    });

    const onSubmit = props.onSubmit;
    const form = watch();
    const labels = [
        "Минимальное количество знаков",
        "Максимальное количество знаков",
        "Количество допустимых ошибок",
        "Время нажатия на клавишу (в секундах)",
    ];

    const zonesLabels = [
        "1 зона (синяя и тёмно-синяя)",
        "2 зона (зеленая и голубая)",
        "3 зона (оранжевая и жёлтая)",
        "4 зона (красная и желтая)",
        "5 зона (фиолетовая)",
    ];

    const ids: (keyof DifficultyFormData)[] = ["min", "max", "errors", "time"];

    const rows = labels.map((label, index) => {
        return (
            <Input
                label={label}
                id={ids[index]}
                props={register(ids[index], {
                    valueAsNumber: true,
                    min: 0,
                    required: true,
                })}
            />
        );
    });

    const boxes = zonesLabels.map((zone, index) => {
        return (
            <CheckboxRow
                label={zone}
                inputProps={register(`zones.${index}`, {
                    required: true,
                })}
            />
        );
    });
    return (
        <Stack flex={1}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flex: 1 }}
            >
                <Stack
                    direction={"column"}
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                >
                    <Table>{rows}</Table>
                    <Typography>Выбор зон клавиатуры:</Typography>
                    <Table>{boxes}</Table>
                    <img src="/keyboard_fingers.png" width={700} height={250} />
                    <Stack direction="row" width="100%">
                        <Button
                            variant="contained"
                            sx={{ flex: 1 }}
                            type="submit"
                        >
                            Сохранить
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
}

type Props = {
    label: string;
    id: string;
    props: UseFormRegisterReturn<keyof DifficultyFormData>;
};

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"];

const Input = forwardRef(
    (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
        const formProps = props.props;
        return (
            <TableRow>
                <TableCell>{props.label}</TableCell>
                <TableCell>
                    <TextField
                        sx={{
                            maxWidth: "4rem",
                            textAlign: "center",
                        }}
                        size="small"
                        {...formProps}
                        inputRef={ref}
                        onKeyDown={(e) => {
                            if (!numbers.includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </TableCell>
            </TableRow>
        );
    }
);

type CheckboxRowProps = {
    label: string;
    inputProps: UseFormRegisterReturn;
};

const CheckboxRow = forwardRef(
    (props: CheckboxRowProps, ref: ForwardedRef<HTMLInputElement>) => {
        const { inputProps } = props;
        return (
            <TableRow sx={{ padding: "none" }}>
                <TableCell padding="none" sx={{ border: "none" }}>
                    <Checkbox {...inputProps} inputRef={ref} />
                    {props.label}
                </TableCell>
            </TableRow>
        );
    }
);
