import { Stack } from "@mui/material";
import { Skeleton } from "../../components/Skeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { useState } from "react";
import { DifficultyEditForm } from "../../components/admin/DifficultyEditForm.tsx";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton.tsx";
import { ManualForm } from "../../components/admin/exercise/ManualForm.tsx";
import { TypeSelector } from "../../components/admin/exercise/TypeSelector.tsx";
import { AutomaticForm } from "../../components/admin/exercise/AutomaticForm.tsx";

export function ExerciseCreation() {
    const [difficulty, setDifficulty] = useState(1);
    const [manual, setManual] = useState(true);

    return (
        <AdminSkeleton selected="create">
            <Stack direction="row" flex={1}>
                <Stack flex={1} alignItems={"center"}>
                    <Stack
                        width={900}
                        direction="column"
                        flexWrap="wrap"
                        justifyContent="start"
                        alignItems="center"
                        margin="10px"
                    >
                        <TypeSelector onChange={setManual} manual={manual} />

                        {manual ? <ManualForm /> : <AutomaticForm />}
                    </Stack>
                </Stack>
            </Stack>
        </AdminSkeleton>
    );
}
