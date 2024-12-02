import { Schedule } from "@mui/icons-material";
import { BigNumber, BottomLine, Container } from "./styles";
import { Paper, Stack, Typography } from "@mui/material";

interface Props {
    bigNumber: string;
    time: string;
    onClick: () => void;
}

export function LevelCard(props: Props) {
    const { time, bigNumber, onClick } = props;
    const fontSize = "0.8em";
    return (
        <Container onClick={onClick}>
            <BigNumber>{bigNumber}</BigNumber>
            <BottomLine gradient>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                    }}
                >
                    <Schedule
                        sx={{
                            fontSize,
                            marginRight: "10px",
                        }}
                    />
                    <Typography
                        component={"div"}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "-0.2em",
                            fontSize,
                        }}
                    >
                        {time}
                    </Typography>
                </div>
            </BottomLine>
        </Container>
    );
}
