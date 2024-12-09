import { Button, Paper, TextField } from "@mui/material";
import { Column, Row, Txt } from "../utils/styles";
import { useForm } from "react-hook-form";
import { network } from "../network/network";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

type RegisterForm = {
    login: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit } = useForm<RegisterForm>();

    const nav = useNavigate();

    const onSubmit = (data: RegisterForm) => {
        network.auth
            .login(data.login, data.password)
            .then((token) => {
                network.newToken(token);

                let payload = jwtDecode(token);
                console.dir(payload);

                if (payload != null) {
                    let id = (payload as any).userId;
                    if (id == 1) {
                        nav("/admin/difficulty");
                    } else {
                        nav("/exercises");
                    }
                }
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
                            <Txt variant="h4">Авторизация</Txt>
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
                                    Войти
                                </Button>
                            </Row>
                            <Row>
                                <Txt
                                    color={"darkblue"}
                                    onClick={() => nav("../register")}
                                >
                                    Нет аккаунта? Зарегистрироваться
                                </Txt>
                            </Row>
                        </Column>
                    </form>
                </Paper>
            </Row>
        </Column>
    );
}
