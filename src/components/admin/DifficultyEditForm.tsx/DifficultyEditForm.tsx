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
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
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

    const goodZones = zones(defaultValues.zones);

    const [savePopup, setSavePopup] = useState(false);

    useEffect(() => {
        console.dir(defaultValues);
    }, []);
    const { register, watch, handleSubmit, reset, formState } =
        useForm<DifficultyFormData>({
            defaultValues: {
                min: defaultValues.minChars,
                max: defaultValues.maxChars,
                errors: defaultValues.errors,
                time: defaultValues.timeLimit,
                zones: zones(defaultValues.zones),
            },
        });

    const formErrors = formState.errors;

    useEffect(() => {
        reset({
            min: defaultValues.minChars,
            max: defaultValues.maxChars,
            errors: defaultValues.errors,
            time: defaultValues.timeLimit,
            zones: zones(defaultValues.zones),
        });
    }, [defaultValues]);

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

    const rows = [
        <>
            <Input
                key={labels[0]}
                label={labels[0]}
                id={ids[0]}
                props={register("min", {
                    valueAsNumber: true,
                    min: {
                        value: 25,
                        message: "Минимальное значение должно быть больше 25",
                    },
                    required: true,
                    max: {
                        value: 200,
                        message: "Максимальное значение должно быть меньше 200",
                    },
                    validate: (value, form) => {
                        return (
                            value < form.max ||
                            "Минимальное значение должно быть меньше максимального"
                        );
                    },
                })}
            />
            {formErrors.min !== undefined && (
                <Typography color={"red"} marginLeft={3}>
                    {formErrors.min.message}
                </Typography>
            )}
        </>,
        <>
            <Input
                key={labels[1]}
                label={labels[1]}
                id={"max"}
                props={register("max", {
                    valueAsNumber: true,
                    min: {
                        value: 25,
                        message: "Минимальное значение должно быть больше 25",
                    },
                    max: {
                        value: 200,
                        message: "Минимальное значение должно быть меньше 200",
                    },
                    required: true,
                })}
            />
            {formErrors.max !== undefined && (
                <Typography color={"red"} marginLeft={3}>
                    {formErrors.max.message}
                </Typography>
            )}
        </>,
        <>
            <Input
                key={labels[2]}
                label={labels[2]}
                id={"errors"}
                props={register("errors", {
                    valueAsNumber: true,
                    min: {
                        value: 1,
                        message: "Минимальное значение должно быть >= 1",
                    },
                    required: true,
                    max: {
                        value: 5,
                        message: "Максимальное значение должно быть <= 5",
                    },
                })}
            />
            {formErrors.errors !== undefined && (
                <Typography color={"red"} marginLeft={3}>
                    {formErrors.errors.message}
                </Typography>
            )}
        </>,
        <>
            <Input
                key={labels[3]}
                label={labels[3]}
                id={"time"}
                props={register("time", {
                    valueAsNumber: true,
                    min: {
                        value: 0.5,
                        message: "Минимальное значение должно быть >= 0.5",
                    },
                    required: true,
                    max: {
                        value: 1.5,
                        message: "Максимальное значение должно быть <= 1.5",
                    },
                })}
            />
            {formErrors.time !== undefined && (
                <Typography color={"red"} marginLeft={3}>
                    {formErrors.time.message}
                </Typography>
            )}
        </>,
    ];
    const boxes = zonesLabels.map((zone, index) => {
        return (
            <CheckboxRow
                key={index}
                label={zone}
                inputProps={register(`zones.${index}` as any, {
                    validate: (_value, form) => {
                        let sum = form.zones
                            .map((x) => (x ? 1 : 0))
                            .reduce((a: number, b: number) => a + b, 0);

                        return sum >= 2 || (sum == 1 && !form.zones[4]);
                    },
                })}
            />
        );
    });
    return (
        <Stack flex={1}>
            {/* {JSON.stringify(formErrors.min?.)} */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flex: 1, position: "relative" }}
            >
                <Stack
                    direction={"column"}
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                >
                    <Table>{rows}</Table>
                    <Typography>Выбор зон клавиатуры:</Typography>
                    <Table>
                        {formErrors.zones?.[0] !== undefined && (
                            <Typography color={"red"} marginLeft={3}>
                                Выберите еще хотя бы одну зону
                            </Typography>
                        )}
                        <tbody>{boxes}</tbody>
                    </Table>
                    <img src="/keyboard_fingers.png" width={600} height={250} />
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

const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Backspace",
    ".",
];

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
    (props: CheckboxRowProps, _ref: ForwardedRef<HTMLInputElement>) => {
        const { inputProps } = props;

        const propsClone = { ...inputProps, ref: undefined };
        const ref = inputProps.ref;
        return (
            <TableRow sx={{ padding: "none" }}>
                <TableCell padding="none" sx={{ border: "none" }}>
                    <input type="checkbox" {...propsClone} ref={ref} />
                    {props.label}
                </TableCell>
            </TableRow>
        );
    }
);
