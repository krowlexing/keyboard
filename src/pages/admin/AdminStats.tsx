import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton";
import { network } from "../../network/network";
import { AdminStat, Stat } from "../../dto/stats";
import { Exercise } from "../../data/Exercise";
import { Column, Txt } from "../../utils/styles";
import { DifficultyData } from "../../dto/diff";
import { BarChart } from "@mui/x-charts";

interface Props {}

export function AdminStats(props: Props) {
    const [difficulty, setDifficulty] = useState(1);

    const [exercisesList, setExercises] = useState<Exercise[] | null>(null);
    const [diffSettings, setDiffSettings] = useState<DifficultyData | null>(
        null
    );
    const [stats, setStats] = useState<AdminStat[] | null>(null);

    const exercisesList2 = exercisesList ?? [];
    exercisesList2.sort((a, b) => a.id - b.id);
    const exercises = listToMap(exercisesList2);
    useEffect(() => {
        network.difficulty.get(difficulty).then(setDiffSettings);
        network.stats.getAll(difficulty).then(setStats);
        network.exercises.getForLevel(difficulty).then(setExercises);
    }, [difficulty]);

    if (
        exercises == null ||
        stats == null ||
        exercisesList == null ||
        diffSettings == null
    ) {
        return (
            <AdminSkeleton selected="stats">
                <Stack direction="row">
                    <DifficultyLevelPane
                        selected={difficulty}
                        onTabClick={setDifficulty}
                    />
                </Stack>
                <Txt>Подождите......</Txt>
            </AdminSkeleton>
        );
    }

    const usedExercises = Array.from(new Set(stats.map((s) => s.exerciseId)));
    const exercisesNumbers = exercisesList2
        .map((e, i) => [e, i + 1])
        .filter(([e, n]) => usedExercises.includes(+e))
        .map(([e, n]) => n);

    const data = prepareData(stats || []);

    const ids = data.map(
        (d) =>
            `Упражнение ${exercisesList2.findIndex((e) => e.id === +d[0]) + 1}`
    );

    const attemptMap = groupByExercise(stats);
    const attempts = sortById(attemptMap);

    console.dir(attempts);

    const goodAttempts = attempts.map((exercise) =>
        exercise.filter(
            (stat) =>
                (stat.errors === 0 || stat.errors < diffSettings.errors) &&
                stat.chars === exercises.get(stat.exerciseId)!.text.length
        )
    );
    const failedAttempts = attempts.map((exercise) =>
        exercise.filter(
            (stat) =>
                (stat.errors > 0 && stat.errors >= diffSettings.errors) ||
                stat.chars !== exercises.get(stat.exerciseId)!.text.length
        )
    );

    const goodAttemptsCount = goodAttempts.map((exercise) => exercise.length);
    const failedAttemptsCount = failedAttempts.map(
        (exercise) => exercise.length
    );

    const headerStyle = {
        position: "sticky",
        top: 0,
        background: "white",
    } as any;

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
                <Txt paddingTop={4}>Статистика по упражнениям</Txt>
                <BarChart
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: { vertical: "top", horizontal: "middle" },
                            padding: 0,
                        },
                    }}
                    height={500}
                    series={[
                        {
                            data: goodAttemptsCount,
                            label: "хорошо",
                            stack: "a",
                        },
                        {
                            data: failedAttemptsCount,
                            label: "плохо",
                            stack: "a",
                        },
                    ]}
                    xAxis={[
                        {
                            scaleType: "band",
                            data: [...ids],

                            tickPlacement: "middle",
                        },
                    ]}
                    yAxis={[{ tickMinStep: 1, label: "Количество" }]}
                />
                <Column
                    maxHeight={"270px"}
                    overflow={"scroll"}
                    position={"relative"}
                >
                    <table>
                        <thead style={{ top: 0, left: 0 }}>
                            <tr>
                                <th style={headerStyle}>Имя пользователя</th>
                                <th style={headerStyle}>Номер упражнения</th>
                                <th style={headerStyle}>Количество ошибок</th>
                                <th style={headerStyle}>
                                    {" "}
                                    Среднее время нажатия на клавишу, с
                                </th>
                                <th style={headerStyle}>Дата прохождения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.username}</td>
                                    <td>
                                        {exercisesList2.findIndex(
                                            (e) => e.id === s.exerciseId
                                        ) + 1}
                                    </td>
                                    <td>{s.errors}</td>
                                    <td>
                                        {Math.floor((s.time * 100) / s.chars) /
                                            100}
                                    </td>
                                    <td>{s.created.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Column>
            </Stack>
        </AdminSkeleton>
    );
}

function groupByExercise(stats: AdminStat[]): Map<number, AdminStat[]> {
    const map = new Map<number, AdminStat[]>();
    stats.forEach((s) => {
        if (map.has(s.exerciseId)) {
            map.get(s.exerciseId)?.push(s);
        } else {
            map.set(s.exerciseId, [s]);
        }
    });
    return map;
}

function sortById(map: Map<number, AdminStat[]>): AdminStat[][] {
    return Array.from(map.values()).sort(
        (a, b) => a[0].exerciseId - b[0].exerciseId
    );
}

function listToMap(list: Exercise[]): Map<number, Exercise> {
    const map = new Map<number, Exercise>();
    list.forEach((e) => map.set(e.id, e));
    return map;
}

function prepareData(stats: AdminStat[]) {
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
