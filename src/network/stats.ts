import { AdminStat, NewStat, Stat } from "../dto/stats";
import { AbstractSubNetwork } from "./abstract_network";

export class StatsNetwork extends AbstractSubNetwork {
    async all(): Promise<Stat[]> {
        const response = await this.axios().get("/exercises");
        return response.data;
    }

    async create(newStat: NewStat) {
        const v = newStat;
        const response = await this.axios().post("/stats", {
            ...v,
            time: Math.floor(v.time * 10),
        });
        return response;
    }

    async getForLevel(level: number): Promise<Stat[]> {
        const response = await this.axios().get<Stat[]>(
            "/stats/level/" + level
        );
        return response.data.map((v) => ({
            ...v,
            time: v.time / 10,
        }));
    }

    async getAll(difficulty: number): Promise<AdminStat[]> {
        const response = await this.axios().get<AdminStat[]>(
            "/stats/diff/" + difficulty
        );
        return response.data.map((v) => {
            return {
                ...v,
                time: v.time / 10,
            };
        });
    }
}
