import { Stack } from "@mui/material";
import { Skeleton } from "../components/Skeleton";
import { DifficultyLevelPane } from "../components/DifficultyLevelPane";
import { useState } from "react";

interface Props {}

export function Stats(props: Props) {
    const [difficulty, setDifficulty] = useState(1);

    return (
        <Skeleton selected="statistics">
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
        </Skeleton>
    );
}
