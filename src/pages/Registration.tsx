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

export function Registration() {
    const { register, handleSubmit, formState } = useForm<RegisterForm>();
    const errors = formState.errors;

    formState.dirtyFields.login;
    const submitted = formState.isSubmitted;
    const nav = useNavigate();

    const onSubmit = (data: RegisterForm) => {
        network.auth
            .register(data.login, data.password)
            .then((token) => {
                console.log(token);
                network.newToken(token);
                let payload = jwtDecode(token);

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
                        <Column alignItems={"center"} width={300} gap={2}>
                            <Txt variant="h4">Регистрация</Txt>
                            <Column width={"100%"}>
                                <TextField
                                    error={!!errors.login && submitted}
                                    {...register("login", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 8,
                                    })}
                                    sx={{
                                        marginTop: 3,
                                        width: "100%",
                                    }}
                                    label="логин"
                                    size="small"
                                />
                                {errors.login ? (
                                    <Txt>длина от 4 до 8 символов</Txt>
                                ) : (
                                    ""
                                )}
                            </Column>
                            <Column width={"100%"}>
                                <TextField
                                    {...register("password", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 10,
                                    })}
                                    sx={{ width: "100%" }}
                                    label="пароль"
                                    type="password"
                                    size="small"
                                />
                                {errors.password ? (
                                    <Txt>длина от 4 до 10 символов</Txt>
                                ) : (
                                    ""
                                )}
                            </Column>
                            <Row width="100%">
                                <Button
                                    sx={{ flex: 1 }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Зарегистрироваться
                                </Button>
                            </Row>
                            <Row>
                                <Txt
                                    color={"darkblue"}
                                    onClick={() => nav("../login")}
                                >
                                    Уже есть аккаунт? Войти
                                </Txt>
                            </Row>
                        </Column>
                    </form>
                </Paper>
            </Row>
        </Column>
    );
}
