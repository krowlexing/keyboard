import { Container, Stack } from "@mui/material";
import { LevelCard } from "../components/LevelCard";
import { Skeleton } from "../components/Skeleton";
import { DifficultyLevelPane } from "../components/DifficultyLevelPane";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

export function Exercises(props: Props) {
    const [difficulty, setDifficulty] = useState(1);
    const nav = useNavigate();
    let examples = Array(10)
        .fill(0)
        .map((_, i) => (
            <LevelCard
                onClick={() => nav("/keyboard")}
                time="02:00"
                bigNumber={`${i + 1}`}
            />
        ));

    return (
        <Skeleton selected="exercises">
            {/* <Stack direction="column" flex={1} sx={{ background: "green" }}> */}
            <Stack direction="row" flex={1}>
                <DifficultyLevelPane
                    selected={difficulty}
                    onTabClick={setDifficulty}
                />
                <Stack
                    direction={"row"}
                    flexWrap={"wrap"}
                    justifyContent={"start"}
                    alignItems={"start"}
                    height="min-content"
                    margin="10px"
                >
                    {examples}
                </Stack>
            </Stack>
            {/* </Stack> */}
        </Skeleton>
    );
}
