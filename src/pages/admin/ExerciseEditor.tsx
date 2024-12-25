import { Paper, Stack } from "@mui/material";
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
import { validateText } from "./ExerciseCreation.tsx";
import { useAdmin } from "../../utils/index.ts";

export function ExerciseEditor() {
    const { id } = useParams();
    const [savedText, setSavedText] = useState("");
    const [exercise, setExercise] = useState<Exercise | null>(null);

    const [difficulty, setDifficulty] = useState(1);
    const [manual, setManual] = useState(true);
    const [length, setLength] = useState(exercise?.text.length);
    const [invalidLength, setInvalidLength] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const nav = useNavigate();

    const [difficulties, setDifficulties] = useState<DifficultyData[]>([]);

    useEffect(() => {
        network.difficulty.all().then(setDifficulties);
    }, []);

    const validate = () => {
        const selectedDiff = difficulties[difficulty - 1];
        if (
            savedText.length < selectedDiff.minChars ||
            savedText.length > selectedDiff.maxChars
        ) {
            setInvalidLength(true);
        }

        const valid = validateText(difficulties[difficulty - 1], savedText);
        if (!valid) {
            setInvalid(true);
        }

        return valid;
    };

    useEffect(() => {
        if (invalidLength) {
            const timeout = setTimeout(() => {
                setInvalidLength(false);
            }, 3000);

            return () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
            };
        }
    }, [invalidLength]);

    const onSubmit = () => {
        if (validate()) {
            updateExercise(savedText, difficulty);
        }
    };
    useEffect(() => {
        if (id != null) {
            network.exercises.get(+id).then((exercise) => {
                setExercise(exercise);
                setSavedText(exercise.text);
                setDifficulty(exercise.level);
                setLength(exercise.text.length);
            });
        }
    }, [id]);
    useAdmin();

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
                        sx={{ position: "relative" }}
                        width={900}
                        direction="column"
                        flexWrap="wrap"
                        justifyContent="start"
                        alignItems="center"
                        margin="10px"
                    >
                        {invalidLength ? (
                            <Paper
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    padding: "30px 0px 30px 30px",
                                    width: "97%",
                                    left: 0,
                                    zIndex: 100,
                                    textAlign: "center",
                                    background: "lightpink",
                                }}
                            >
                                Некорректная длина
                            </Paper>
                        ) : (
                            <></>
                        )}
                        <TypeSelector onChange={setManual} manual={manual} />
                        {invalid ? "Недопустимые символы" : ""}
                        {manual ? (
                            <ManualForm
                                text={savedText}
                                difficulty={difficulty}
                                difficultyError={false}
                                onDifficultyChange={setDifficulty}
                                onChange={(text) => {
                                    setSavedText(text);

                                    setInvalid(false);
                                }}
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
