import { Exercise } from "../data/Exercise";
import { AdminStat, NewStat, Stat } from "../dto/stats";
import { AbstractSubNetwork } from "./abstract_network";

export class StatsNetwork extends AbstractSubNetwork {
    async all(): Promise<Stat[]> {
        const response = await this.axios().get("/exercises");
        return response.data;
    }

    async create(newStat: NewStat) {
        const response = await this.axios().post("/stats", newStat);
        return response.data;
    }

    async getForLevel(level: number): Promise<Stat[]> {
        const response = await this.axios().get("/stats/level/" + level);
        return response.data;
    }

    async getAll(difficulty: number): Promise<AdminStat[]> {
        const response = await this.axios().get("/stats/diff/" + difficulty);
        return response.data;
    }
}
