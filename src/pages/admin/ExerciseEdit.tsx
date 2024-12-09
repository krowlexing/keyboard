import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { LevelCard } from "../../components/LevelCard";
import { EditableLevelCard } from "../../components/LevelCard/EditableLevelCard";
import { Exercise } from "../../data/Exercise";
import { network } from "../../network/network";
import { Txt } from "../../utils/styles";

interface Props {}

export function ExerciseEdit(props: Props) {
    const [difficulty, setDifficulty] = useState(1);

    const [exercises, setExercises] = useState<Exercise[] | null>();

    useEffect(() => {
        network.exercises.getForLevel(difficulty).then(setExercises);
    }, [difficulty]);

    const nav = useNavigate();

    if (exercises == null) {
        return (
            <AdminSkeleton selected="edit">
                <Txt>Подождите......</Txt>
            </AdminSkeleton>
        );
    }

    let examples = exercises.map((exercise, i) => (
        <EditableLevelCard
            onClick={() => nav("/admin/editor/" + exercise.id)}
            time="02:00"
            bigNumber={`${i + 1}`}
        />
    ));

    return (
        <AdminSkeleton selected="edit">
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
        </AdminSkeleton>
    );
}
