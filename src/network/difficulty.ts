import { DifficultyData } from "../dto/diff";
import { AbstractSubNetwork } from "./abstract_network";

export class DifficultyNetwork extends AbstractSubNetwork {
    async get(level: number) {
        const response = await this.axios().get("/diff/" + level);

        return response.data;
    }

    async update(level: number, data: DifficultyData) {
        const response = await this.axios().post("/diff/" + level, data);
        return response.data;
    }

    async all(): Promise<DifficultyData[]> {
        const response = await this.axios().get("/diff");
        return response.data;
    }
}
