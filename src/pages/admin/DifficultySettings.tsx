import { Stack } from "@mui/material";
import { Skeleton } from "../../components/Skeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { DifficultyEditForm } from "../../components/admin/DifficultyEditForm.tsx";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton.tsx";
import { DifficultyData, zonesToString } from "../../dto/diff.ts";
import { network } from "../../network/network.ts";
import { DifficultyFormData } from "../../components/admin/DifficultyEditForm.tsx/DifficultyEditForm.tsx";

export function DifficultySettings() {
    const [difficulty, setDifficulty] = useState(1);

    const [data, setData] = useState<DifficultyData | null>(null);

    useEffect(() => {
        network.difficulty.get(difficulty).then(setData);
    }, [difficulty]);

    const updateDifficulty = async (data: DifficultyFormData) => {
        await network.difficulty.update(difficulty, {
            errors: data.errors,
            timeLimit: data.time,
            minChars: data.min,
            maxChars: data.max,
            zones: zonesToString(data.zones),
        });
        const newDiffData = await network.difficulty.get(difficulty);
        setData(newDiffData);
    };

    if (data == null) {
        return (
            <AdminSkeleton selected="difficulty">
                <Stack direction="row" flex={1}>
                    <DifficultyLevelPane
                        selected={difficulty}
                        onTabClick={setDifficulty}
                    />
                    <Skeleton selected="difficulty">Подождите......</Skeleton>
                </Stack>
            </AdminSkeleton>
        );
    }

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
                        <DifficultyEditForm
                            defaultValues={data}
                            onSubmit={updateDifficulty}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </AdminSkeleton>
    );
}
