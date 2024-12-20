import { Container, Stack } from "@mui/material";
import { LevelCard } from "../components/LevelCard";
import { Skeleton } from "../components/Skeleton";
import { DifficultyLevelPane } from "../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Exercise } from "../data/Exercise";
import { network } from "../network/network";

interface Props {}

export function Exercises(props: Props) {
    const [difficulty, setDifficulty] = useState(1);
    const nav = useNavigate();

    const [exercises, setExercises] = useState<Exercise[] | null>(null);

    useEffect(() => {
        network.exercises.getForLevel(difficulty).then(setExercises);
    }, [difficulty]);

    if (exercises == null) {
        return <Skeleton selected="exercises">Подождите......</Skeleton>;
    }

    const sortedExercises = exercises.sort((a, b) => a.id - b.id);
    console.dir(sortedExercises);
    let examples = sortedExercises.map((e, i) => (
        <LevelCard
            onClick={() => nav("/keyboard/" + e.id)}
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
