import { AbstractSubNetwork } from "./abstract_network";

export class AuthNetwork extends AbstractSubNetwork {
    async login(username: string, password: string) {
        const response = await this.axios().post("/auth/login", {
            username,
            password,
        });

        return response.data;
    }

    async register(username: string, password: string) {
        const response = await this.axios().post("/auth/register", {
            username,
            password,
        });
        return response.data;
    }

    async validate() {
        const response = await this.axios().get("/auth/validate");
        return response.data;
    }
}
