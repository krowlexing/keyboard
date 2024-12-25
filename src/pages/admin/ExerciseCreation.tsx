import { Paper, Stack } from "@mui/material";
import { Skeleton } from "../../components/Skeleton";
import { DifficultyLevelPane } from "../../components/DifficultyLevelPane";
import { useEffect, useState } from "react";
import { DifficultyEditForm } from "../../components/admin/DifficultyEditForm.tsx";
import { AdminSkeleton } from "../../components/admin/AdminSkeleton.tsx";
import { ManualForm } from "../../components/admin/exercise/ManualForm.tsx";
import { TypeSelector } from "../../components/admin/exercise/TypeSelector.tsx";
import { AutomaticForm } from "../../components/admin/exercise/AutomaticForm.tsx";
import { network } from "../../network/network.ts";
import { set, useForm } from "react-hook-form";
import { DifficultyData, zones as zonesArray } from "../../dto/diff.ts";
import { zones } from "../../data/keys.ts";
import { useAdmin } from "../../utils/index.ts";

export function ExerciseCreation() {
    const [manual, setManual] = useState(true);

    const [difficulties, setDifficulties] = useState<DifficultyData[]>([]);

    const [savedText, setSavedText] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [length, setLength] = useState(50);

    const [invalidLength, setInvalidLength] = useState(false);

    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        network.difficulty.all().then((diff) => {
            setDifficulties(diff.reverse());
            setLength(diff[0].minChars);
        });
    }, []);

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
    useAdmin();

    const reset = () => {
        setSavedText("");
    };

    const validate = () => {
        const selectedDiff = difficulties[difficulty - 1];
        if (
            savedText.length < selectedDiff.minChars ||
            savedText.length > selectedDiff.maxChars
        ) {
            setInvalidLength(true);
            return;
        }

        const valid = validateText(difficulties[difficulty - 1], savedText);
        if (!valid) {
            setInvalid(true);
        }

        return valid;
    };

    const onSubmit = () => {
        if (validate()) {
            createExercise(savedText, difficulty);
            reset();
        }
    };

    const createExercise = (text: string, level: number) => {
        return network.exercises
            .create(text, level)
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <AdminSkeleton selected="create">
            <Stack direction="row" flex={1}>
                <Stack flex={1} alignItems={"center"}>
                    <Stack
                        position={"relative"}
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
                                    setInvalid(false);
                                    setSavedText(text);
                                }}
                                onSave={onSubmit}
                            />
                        ) : (
                            <AutomaticForm
                                length={length}
                                difficulties={difficulties}
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

export function validateText(
    difficulty: DifficultyData,
    text: string
): boolean {
    const goodZones = zonesArray(difficulty.zones);
    const zoneIds = goodZones
        .map((z, i) => (z ? i : null))
        .filter((z) => z != null);

    const availableChars = zoneIds.flatMap((id) => zones[id]);

    return text.split("").every((char) => availableChars.includes(char));
}
