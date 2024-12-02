import { Edit, Schedule } from "@mui/icons-material";
import { BigNumber, BottomLine, Container } from "./styles";
import { Paper, Stack, Typography } from "@mui/material";

interface Props {
    bigNumber: string;
    time: string;
    onClick: () => void;
}

export function EditableLevelCard(props: Props) {
    const { time, bigNumber, onClick } = props;
    const fontSize = "0.8em";
    return (
        <Container onClick={onClick} sx={{ position: "relative" }}>
            <Edit
                sx={{
                    position: "absolute",
                    color: "white",
                    top: 5,
                    right: 5,
                }}
            />
            <BigNumber>{bigNumber}</BigNumber>
            <BottomLine>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                    }}
                >
                    <pre></pre>
                </div>
            </BottomLine>
        </Container>
    );
}
