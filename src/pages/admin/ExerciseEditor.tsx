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
import { DifficultyData } from "../../dto/diff.ts";

export function ExerciseEditor() {
    const { id } = useParams();
    const [savedText, setSavedText] = useState("");
    const [exercise, setExercise] = useState<Exercise | null>(null);

    const [difficulty, setDifficulty] = useState(1);
    const [manual, setManual] = useState(true);
    const [length, setLength] = useState(exercise?.text.length);
    const nav = useNavigate();

    const [difficulties, setDifficulties] = useState<DifficultyData[]>([]);

    useEffect(() => {
        network.difficulty.all().then(setDifficulties);
    }, []);

    const onSubmit = () => {
        updateExercise(savedText, difficulty);
    };
    useEffect(() => {
        if (id != null) {
            network.exercises.get(+id).then((exercise) => {
                setExercise(exercise);
                setDifficulty(exercise.level);
                setLength(exercise.text.length);
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
                                text={savedText}
                                difficulty={difficulty}
                                difficultyError={false}
                                onDifficultyChange={setDifficulty}
                                onChange={setSavedText}
                                onSave={onSubmit}
                            />
                        ) : (
                            <AutomaticForm
                                difficulties={difficulties}
                                length={length!}
                                difficulty={difficulty}
                                onDifficultyChange={setDifficulty}
                                onLengthChange={setLength}
                                onSave={onSubmit}
                                text={savedText}
                                onGenerate={(text) => {
                                    setSavedText(text);
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </AdminSkeleton>
    );
}
