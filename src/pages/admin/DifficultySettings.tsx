import { Paper, Stack, Typography } from "@mui/material";
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
    const [savePopup, setSavePopup] = useState(false);

    useEffect(() => {
        network.difficulty.get(difficulty).then(setData);
    }, [difficulty]);

    useEffect(() => {
        if (savePopup) {
            const timeout = setTimeout(() => {
                setSavePopup(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [savePopup]);

    const updateDifficulty = async (data: DifficultyFormData) => {
        const str = zonesToString(data.zones);
        await network.difficulty.update(difficulty, {
            errors: data.errors,
            timeLimit: data.time,
            minChars: data.min,
            maxChars: data.max,
            zones: str,
        });
        const newDiffData = await network.difficulty.get(difficulty);
        setSavePopup(true);
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

    const greenShade = "#4caf50";

    return (
        <AdminSkeleton selected="difficulty">
            <Stack direction="row" flex={1} position={"relative"}>
                <DifficultyLevelPane
                    selected={difficulty}
                    onTabClick={setDifficulty}
                />
                <Stack flex={1} alignItems={"center"} position={"relative"}>
                    {savePopup && (
                        <Paper
                            sx={{
                                padding: 3,
                                textAlign: "center",
                                position: "absolute",
                                borderRadius: 10,

                                top: 2,
                                background: greenShade,
                                zIndex: 1,
                            }}
                        >
                            <Typography color={"white"}>Сохранено</Typography>
                        </Paper>
                    )}
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
