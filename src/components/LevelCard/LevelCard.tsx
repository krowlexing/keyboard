import { Schedule } from "@mui/icons-material";
import { BigNumber, BottomLine, Container } from "./styles";
import { Paper, Typography } from "@mui/material";

interface Props {
    bigNumber: string;
    time: string;
}

export function LevelCard(props: Props) {
    const { time, bigNumber } = props;
    const fontSize = "0.8em";
    return (
        <Container>
            <BigNumber>{bigNumber}</BigNumber>
            <BottomLine>
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
                            flexShrink: 1,
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
