import { Stack } from "@mui/material";
import { Skeleton } from "../components/Skeleton";
import { DifficultyLevelPane } from "../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { network } from "../network/network";
import { Stat } from "../dto/stats";
import { BarChart, LineChart } from "@mui/x-charts";

interface Props {}

export function Stats(props: Props) {
    const [difficulty, setDifficulty] = useState(1);
    const [stats, setStats] = useState<Stat[] | null>(null);

    useEffect(() => {
        network.stats.getForLevel(difficulty).then(setStats);
    }, [difficulty]);

    const data = prepareData(stats || []);

    const ids = data.map((d) => `Exercise ${d[0]}`);
    const averageTime = data.map((d) => d[1].time);
    const errors = data.map((d) => d[1].errors).map((d) => ({ data: [d] }));

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
                <LineChart
                    series={[
                        { data: [null, ...averageTime, null], curve: "linear" },
                    ]}
                    xAxis={[
                        {
                            scaleType: "point",
                            data: ["", ...ids, " "],

                            tickPlacement: "middle",
                        },
                    ]}
                    skipAnimation
                />
                <BarChart
                    series={errors}
                    yAxis={[
                        {
                            scaleType: "linear",
                            label: "Errors",
                            tickMinStep: 1,
                        },
                    ]}
                    xAxis={[{ data: ids, scaleType: "band" }]}
                />
            </Stack>
        </Skeleton>
    );
}

type ExerciseStats = {};

function prepareData(stats: Stat[]) {
    const time: Record<
        string,
        { time: number; count: number; errors: number }
    > = {};

    for (let stat of stats) {
        if (time[stat.exerciseId] == null) {
            time[stat.exerciseId] = {
                time: 0,
                count: 0,
                errors: 0,
            };
        }
        time[stat.exerciseId].time += stat.time;
        time[stat.exerciseId].count += 1;
        time[stat.exerciseId].errors += stat.errors;
    }

    return Object.entries(time).map(
        ([id, { time, count, errors }]) =>
            [id, { time: time / count, errors }] as const
    );
}
