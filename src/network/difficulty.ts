import { DifficultyData } from "../dto/diff";
import { AbstractSubNetwork } from "./abstract_network";

export class DifficultyNetwork extends AbstractSubNetwork {
    async get(level: number) {
        const response = await this.axios().get("/diff/" + level);

        const v = response.data;
        return { ...v, timeLimit: v.timeLimit / 10 };
    }

    async update(level: number, data: DifficultyData) {
        const response = await this.axios().post("/diff/" + level, {
            ...data,
            timeLimit: Math.floor(data.timeLimit * 10),
        });
        return response;
    }

    async all(): Promise<DifficultyData[]> {
        const response = await this.axios().get<DifficultyData[]>("/diff");
        return response.data.map((v) => {
            return { ...v, timeLimit: v.timeLimit / 10 };
        });
    }
}
