import { Stack } from "@mui/material";
import { Skeleton } from "../../components/Skeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { useState } from "react";
import { DifficultyEditForm } from "../../components/admin/DifficultyEditForm.tsx";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton.tsx";

export function DifficultySettings() {
    const [difficulty, setDifficulty] = useState(1);

    return (
        <AdminSkeleton selected="difficulty">
            <Stack direction="row" flex={1}>
                <DifficultyLevelPane
                    selected={difficulty}
                    onTabClick={setDifficulty}
                />
                <Stack flex={1} alignItems={"center"}>
                    <Stack
                        width={900}
                        direction={"row"}
                        flexWrap={"wrap"}
                        justifyContent={"start"}
                        alignItems={"start"}
                        height="min-content"
                        margin="10px"
                    >
                        <DifficultyEditForm />
                    </Stack>
                </Stack>
            </Stack>
        </AdminSkeleton>
    );
}
