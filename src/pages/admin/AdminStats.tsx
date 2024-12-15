import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton";
import { network } from "../../network/network";
import { AdminStat } from "../../dto/stats";
import { Exercise } from "../../data/Exercise";
import { Txt } from "../../utils/styles";
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

    const exercises = listToMap(exercisesList || []);
    useEffect(() => {
        network.difficulty.get(difficulty).then(setDiffSettings);
        network.stats.getAll(difficulty).then(setStats);
        network.exercises.getForLevel(difficulty).then(setExercises);
    }, [difficulty]);

    if (exercises == null || stats == null || diffSettings == null) {
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

    const attemptMap = groupByExercise(stats);
    const attempts = Array.from(attemptMap.values());

    const goodAttempts = attempts.map((exercise) =>
        exercise.filter((stat) => stat.errors < diffSettings.errors)
    );
    const failedAttempts = attempts.map((exercise) =>
        exercise.filter((stat) => stat.errors >= diffSettings.errors)
    );

    const goodAttemptsCount = goodAttempts.map((exercise) => exercise.length);
    const failedAttemptsCount = failedAttempts.map(
        (exercise) => exercise.length
    );

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
                <BarChart
                    height={500}
                    series={[
                        { data: goodAttemptsCount, stack: "a" },
                        { data: failedAttemptsCount, stack: "a" },
                    ]}
                    yAxis={[{ tickMinStep: 1 }]}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Номер упражнения</th>
                            <th>Количество ошибок</th>
                            <th>Среднее время нажатия на клавишу, с</th>
                            <th>Дата прохождения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats?.map((s) => (
                            <tr key={s.id}>
                                <td>{s.username}</td>
                                <td>{s.id}</td>
                                <td>{s.errors}</td>
                                <td>{s.time / s.chars}</td>
                                <td>{s.created.substring(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    return Array.from(map.values()).sort((a, b) => a[0].id - b[0].id);
}

function listToMap(list: Exercise[]): Map<number, Exercise> {
    const map = new Map<number, Exercise>();
    list.forEach((e) => map.set(e.id, e));
    return map;
}
