import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";

export const Row = (props: StackProps) => {
    return <Stack direction="row" {...props} />;
};

export const Column = (props: StackProps) => {
    return <Stack direction="column" {...props} />;
};

export const Txt = (props: TypographyProps) => {
    return <Typography {...props} />;
};
