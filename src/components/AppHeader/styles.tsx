import styled from "@emotion/styled";
import { Typography } from "@mui/material";
type Props = {
    selected?: boolean;
};

export const Text = styled(Typography)();

export const AppMenuItem = styled(Text)(({ selected }: Props) => ({
    display: "flex",
    borderBottom: selected ? "3px solid blue" : undefined,
    cursor: "pointer",
}));

export const HeaderContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid black",
    background: "white",
    padding: 30,
    paddingRight: 100,
    paddingLeft: 100,
});
