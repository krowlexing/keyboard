export type NewStat = {
    exerciseId: number;
    chars: number;
    time: number;
    errors: number;
};

export type Stat = {
    id: number;
    userId: number;
    chars: number;
    exerciseId: number;
    time: number;
    errors: number;
};

export type AdminStat = {
    id: number;
    username: string;
    exerciseId: number;
    time: number;
    errors: number;
    chars: number;
    created: string;
};
