import { Container, Stack } from "@mui/material";
import { LevelCard } from "../components/LevelCard";
import { Skeleton } from "../components/Skeleton";

interface Props {}

export function Exercises(props: Props) {
    let examples = Array(10)
        .fill(0)
        .map((_, i) => <LevelCard time="02:00" bigNumber={`${i + 1}`} />);

    return (
        <Skeleton>
            <Stack direction={"row"} flexWrap={"wrap"}>
                {examples}
            </Stack>
        </Skeleton>
    );
}
