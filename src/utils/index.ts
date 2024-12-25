import { jwtDecode } from "jwt-decode";
import { DifficultyData } from "../dto/diff";
import { useNavigate } from "react-router";

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

export function isAdmin(): boolean | undefined {
    let token = localStorage.getItem("token");
    if (token == null) {
        return undefined;
    }
    let payload = jwtDecode(token);
    console.dir(payload);

    if (payload != null) {
        let id = (payload as any).userId;
        if (id == 1) {
            return true;
        }
    }

    return false;
}

export function useAdmin() {
    const nav = useNavigate();

    const admin = isAdmin();
    if (admin === undefined) {
        nav("/auth/login");
    } else if (admin === true) {
    } else {
        nav("/exercises");
    }
}
