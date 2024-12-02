import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { LevelCard } from "../../components/LevelCard";
import { EditableLevelCard } from "../../components/LevelCard/EditableLevelCard";

interface Props {}

export function ExerciseEdit(props: Props) {
    const [difficulty, setDifficulty] = useState(1);
    const nav = useNavigate();
    let examples = Array(10)
        .fill(0)
        .map((_, i) => (
            <EditableLevelCard
                onClick={() => nav("/admin/editor")}
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
