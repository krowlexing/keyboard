import { Stack } from "@mui/material";
import { useState } from "react";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton";

interface Props {}

export function AdminStats(props: Props) {
    const [difficulty, setDifficulty] = useState(1);

    return (
        <AdminSkeleton selected="stats">
            <Stack direction="row">
                <DifficultyLevelPane
                    selected={difficulty}
                    onTabClick={setDifficulty}
                />
            </Stack>
            <Stack
                direction="column"
                justifyContent={"space-between"}
                alignItems={"center"}
                flex={1}
            >
                <div>
                    <img src="/public/stonks.png" width={700} height={250} />
                </div>
                <div>
                    <img src="/public/hist.png" width={700} height={250} />
                </div>
            </Stack>
        </AdminSkeleton>
    );
}
