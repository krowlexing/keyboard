export const groups = Object.entries({
    "1a": {
        value: "45кеапми",
        color: "#3af",
    },
    "1b": {
        value: "67нгроть",
        color: "#17f",
    },
    "2a": {
        value: "3увс",
        color: "#79d079",
    },
    "2b": { value: "8шлб", color: "lightblue" },
    "3a": { value: "2цыч", color: "orange" },
    "3b": { value: "9щдю", color: "#fe0" },
    "4a": { value: "1йфя", color: "#f33" },
    "4b": { value: "0зжэхъ/", color: "pink" },
} as const).map(([key, value]) => ({
    key,
    value: value.value.split(""),
    color: value.color,
}));

export const keyboard = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "back"],
    ["tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\"],
    ["caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter"],
    ["shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "lshift"],
    ["ctrl", "win", "alt", "spacebar", "alt", "win", "ctrl"],
];

export function getKeyGroup(
    key: string
): { key: string; color: string } | undefined {
    for (let group of groups) {
        if (group.value.includes(key)) {
            return group;
        }
    }
    return undefined;
}
