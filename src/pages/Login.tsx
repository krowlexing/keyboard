import { Button, Paper, TextField } from "@mui/material";
import { Column, Row, Txt } from "../utils/styles";
import { useForm } from "react-hook-form";
import { network } from "../network/network";
import { useNavigate } from "react-router";

type RegisterForm = {
    login: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit } = useForm<RegisterForm>();

    const nav = useNavigate();

    const onSubmit = (data: RegisterForm) => {
        network.auth
            .register(data.login, data.password)
            .then((token) => {
                console.log(token);
                network.newToken(token);
                nav("/admin/difficulty");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Column
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
        >
            <Row justifyContent={"center"}>
                <Paper sx={{ padding: 7 }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: "100%" }}
                    >
                        <Column alignItems={"center"} width={300}>
                            <Txt variant="h4">Регистрация</Txt>
                            <TextField
                                {...register("login", { required: true })}
                                sx={{
                                    marginTop: 3,
                                    marginBottom: 3,
                                    width: "100%",
                                }}
                                label="логин"
                                size="small"
                            />
                            <TextField
                                {...register("password", { required: true })}
                                sx={{ width: "100%" }}
                                label="пароль"
                                type="password"
                                size="small"
                            />
                            <Row width="100%">
                                <Button
                                    sx={{ marginTop: 3, flex: 1 }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Зарегистрироваться
                                </Button>
                            </Row>
                        </Column>
                    </form>
                </Paper>
            </Row>
        </Column>
    );
}
