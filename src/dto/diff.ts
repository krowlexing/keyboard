export type DifficultyData = {
    minChars: number;
    maxChars: number;
    errors: number;
    timeLimit: number;
    zones: string;
};

export function zones(zones: string): boolean[] {
    const result = [false, false, false, false, false];

    for (let i = 0; i < zones.length; i++) {
        let n = Number(zones[i]);
        if (!isNaN(n)) {
            result[n - 1] = true;
        }
    }

    return result;
}

export function zonesToString(zones: boolean[]): string {
    let result = "";
    for (let i = 0; i < zones.length; i++) {
        if (zones[i]) {
            result += String(i + 1);
        }
    }
    return result;
}
