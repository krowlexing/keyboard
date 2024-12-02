import { Stack } from "@mui/material";
import { DifficultyLevelTab } from "../DifficultyLevelTab";

interface Props {
    selected: number;
    onTabClick: (diff: number) => void;
}

export function DifficultyLevelPane(props: Props) {
    const { selected, onTabClick } = props;
    let tabs = Array(5)
        .fill(0)
        .map((_, i) => (
            <DifficultyLevelTab
                level={`${i + 1}`}
                selected={i == selected - 1}
                onClick={() => onTabClick(i + 1)}
                position={i == 0 ? "top" : i == 4 ? "bottom" : undefined}
            />
        ));

    return (
        <Stack
            direction={"column"}
            justifyContent={"space-between"}
            minWidth={200}
            maxWidth={200}
            borderRadius={10}
            flex={1}
        >
            {tabs}
        </Stack>
    );
}
