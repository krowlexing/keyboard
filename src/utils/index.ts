import { DifficultyData } from "../dto/diff";

/**
 * Object.keys may return additional keys
 *
 * safe to use if `T` is not a supertype
 *
 * safe alternative - declare an array with all keys of T and iterate over them
 *
 * TODO: add typia to check for exact keys
 */
export function unsafeKeys<T extends object>(object: T): (keyof T)[] {
    return Object.keys(object) as (keyof T)[];
}

export function getExerciseDuration(
    difficulty: DifficultyData,
    text: string
): number {
    return difficulty.timeLimit * text.length;
}

export function prettyTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const leadingZero = minutes < 10 ? "0" : "";
    return `${leadingZero}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
