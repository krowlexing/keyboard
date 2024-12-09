import { Exercise } from "../data/Exercise";
import { AbstractSubNetwork } from "./abstract_network";

export class ExercisesNetwork extends AbstractSubNetwork {
    async all(): Promise<Exercise[]> {
        const response = await this.axios().get("/exercises");
        return response.data;
    }

    async create(text: string, level: number) {
        const response = await this.axios().post("/exercises", {
            text,
            level,
        });
        return response.data;
    }

    async get(id: number): Promise<Exercise> {
        const response = await this.axios().get("/exercises/" + id);
        return response.data;
    }

    async getForLevel(level: number): Promise<Exercise[]> {
        const response = await this.axios().get("/exercises/level/" + level);
        return response.data;
    }

    async update(id: number, text: string, level: number) {
        const response = await this.axios().put("/exercises/" + id, {
            text,
            level,
        });
        return response.data;
    }
}
