import { Stack } from "@mui/material";
import { Skeleton } from "../../components/Skeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { DifficultyEditForm } from "../../components/admin/DifficultyEditForm.tsx";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton.tsx";
import { ManualForm } from "../../components/admin/exercise/ManualForm.tsx";
import { TypeSelector } from "../../components/admin/exercise/TypeSelector.tsx";
import { AutomaticForm } from "../../components/admin/exercise/AutomaticForm.tsx";
import { Exercise } from "../../data/Exercise.ts";
import { network } from "../../network/network.ts";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Txt } from "../../utils/styles.tsx";

export function ExerciseEditor() {
    const { id } = useParams();
    const [exercise, setExercise] = useState<Exercise | null>(null);

    const [difficulty, setDifficulty] = useState(1);
    const [manual, setManual] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        if (id != null) {
            network.exercises.get(+id).then((exercise) => {
                setExercise(exercise);
                setDifficulty(exercise.level);
            });
        }
    }, [id]);

    if (id == null) {
        return (
            <AdminSkeleton selected="edit">
                <Txt>Где id?......</Txt>
            </AdminSkeleton>
        );
    }
    if (exercise == null) {
        return <AdminSkeleton selected="edit">Подождите......</AdminSkeleton>;
    }

    const defaultText = exercise.text;

    const updateExercise = (text: string, level: number) => {
        return network.exercises
            .update(+id, text, level)
            .then(() => {
                nav(-1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <AdminSkeleton selected="edit">
            <Stack direction="row" flex={1}>
                <Stack flex={1} alignItems={"center"}>
                    <Stack
                        width={900}
                        direction="column"
                        flexWrap="wrap"
                        justifyContent="start"
                        alignItems="center"
                        margin="10px"
                    >
                        <TypeSelector onChange={setManual} manual={manual} />

                        {manual ? (
                            <ManualForm
                                text={defaultText}
                                defaultLevel={difficulty}
                                onSave={(text, level) =>
                                    updateExercise(text, level)
                                }
                            />
                        ) : (
                            <AutomaticForm text="Жили были...." />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </AdminSkeleton>
    );
}
