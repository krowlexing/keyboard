import { Stack, Typography } from "@mui/material";
import { Skeleton } from "../components/Skeleton";
import { DifficultyLevelPane } from "../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { network } from "../network/network";
import { Stat } from "../dto/stats";
import { BarChart, LineChart } from "@mui/x-charts";
import { Exercise } from "../data/Exercise";
import { Txt } from "../utils/styles";

interface Props {}

export function Stats(props: Props) {
    const [difficulty, setDifficulty] = useState(1);
    const [exercices, setExercises] = useState<Exercise[] | null>(null);
    const [stats, setStats] = useState<Stat[] | null>(null);

    useEffect(() => {
        network.stats.getForLevel(difficulty).then(setStats);
        network.exercises.getForLevel(difficulty).then(setExercises);
    }, [difficulty]);

    if (exercices == null || stats == null) {
        return (
            <Skeleton selected="statistics">
                <Stack direction="row">
                    <DifficultyLevelPane
                        selected={difficulty}
                        onTabClick={setDifficulty}
                    />
                </Stack>
                <Txt>Подождите......</Txt>
            </Skeleton>
        );
    }

    exercices.sort((a, b) => a.id - b.id);
    const usedExercises = Array.from(new Set(stats.map((s) => s.exerciseId)));
    const exercisesNumbers = exercices
        .map((e, i) => [e, i + 1])
        .filter(([e, n]) => usedExercises.includes(+e))
        .map(([e, n]) => n);

    const data = prepareData(stats || []);

    const ids = data.map(
        (d) => `Упражнение ${exercices.findIndex((e) => e.id === +d[0]) + 1}`
    );
    const averageTime = data.map((d) => d[1].time);
    const errors = [{ data: data.map((d) => d[1].errors) }];

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
                paddingTop={1}
                flex={1}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    fontSize={14}
                    align="center"
                >
                    Среднее время нажатия на клавишу
                </Typography>
                <LineChart
                    series={[
                        { data: [null, ...averageTime, null], curve: "linear" },
                    ]}
                    yAxis={[
                        {
                            scaleType: "linear",
                            label: "Время, с",
                            tickMinStep: 1,
                        },
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
                <Typography
                    fontSize={14}
                    variant="h6"
                    component="h2"
                    align="center"
                >
                    Количество ошибок в каждом упражнении
                </Typography>
                <BarChart
                    title="text"
                    series={errors}
                    yAxis={[
                        {
                            scaleType: "linear",
                            label: "Количество ошибок",
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
