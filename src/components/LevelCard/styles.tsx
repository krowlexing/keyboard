import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";

export const BottomLine = styled.div({
    color: "white",
    background:
        "linear-gradient(90deg, rgba(53,46,171,1) 0%, rgba(166,68,173,1) 100%)",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    textAlign: "center",
});
export const BigNumber = styled(Typography)({
    width: "200px",
    height: "200px",
    textAlign: "center",
    lineHeight: "240px",
    fontSize: "8em",
    color: "white",
    backgroundColor: "darkblue",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
});

export const Container = styled(Paper)({
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    maxWidth: "200px",
    margin: 5,
});
