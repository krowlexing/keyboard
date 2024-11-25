import styled from "@emotion/styled";
import { Typography } from "@mui/material";

type Props = {
    selected?: boolean;
    position?: "top" | "bottom" | "none";
};
export const Text = styled(Typography)({});

export const Tab = styled.div(({ selected, position }: Props) => ({
    borderTopLeftRadius: position == "top" ? 10 : undefined,
    borderBottomLeftRadius: position == "bottom" ? 10 : undefined,
    borderBottom: "1px solid black",
    backgroundColor: !selected ? "lightgray" : "white",
    display: "flex",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    padding: "10px",
}));
