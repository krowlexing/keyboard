import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";

type Props = {
    gradient?: boolean;
};
export const BottomLine = styled.div(({ gradient }: Props) => ({
    color: "white",
    background: gradient
        ? "linear-gradient(90deg, rgba(53,46,171,1) 0%, rgba(166,68,173,1) 100%)"
        : "darkblue",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
}));

export const BigNumber = styled(Typography)({
    width: "180px",
    height: "180px",
    textAlign: "center",
    lineHeight: "220px",
    fontSize: "8em",
    color: "white",
    backgroundColor: "darkblue",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
});

export const Container = styled(Paper)({
    borderRadius: 10,
    display: "block",
    maxWidth: "200px",
    height: "min-content",
    margin: 5,
});
