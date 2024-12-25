import { Button, Paper, TextField } from "@mui/material";
import { Column, Row, Txt } from "../utils/styles";
import { useForm } from "react-hook-form";
import { network } from "../network/network";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Error, Modal } from "./KeyboardPage";

type RegisterForm = {
    login: string;
    password: string;
};

export function Login() {
    const { register, handleSubmit, formState } = useForm<RegisterForm>();

    const nav = useNavigate();

    const errors = formState.errors;

    formState.dirtyFields.login;
    const submitted = formState.isSubmitted;
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (showError) {
            const timeout = setTimeout(() => {
                setShowError(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [showError]);

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
                console.log("hello");
                setShowError(true);
                console.log(error);
            });
    };

    return (
        <Column
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}
        >
            <Row justifyContent={"center"} position={"relative"}>
                {showError && (
                    <Modal message={Error("Неверный логин или пароль")} />
                )}
                <Paper sx={{ padding: 7 }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: "100%" }}
                    >
                        <Column alignItems={"center"} width={300} gap={3}>
                            <Txt variant="h4">Авторизация</Txt>
                            <Column width={"100%"}>
                                <TextField
                                    error={!!errors.login && submitted}
                                    {...register("login", {
                                        required: true,
                                        minLength: {
                                            value: 4,
                                            message: "длина от 4 до 8 символов",
                                        },
                                        maxLength: {
                                            value: 8,
                                            message: "длина от 4 до 8 символов",
                                        },
                                    })}
                                    sx={{
                                        marginTop: 3,
                                        width: "100%",
                                    }}
                                    label="логин"
                                    size="small"
                                />
                                {errors.login && submitted ? (
                                    <Txt>длина от 4 до 8 символов</Txt>
                                ) : (
                                    ""
                                )}
                            </Column>
                            <Column width={"100%"}>
                                <TextField
                                    {...register("password", {
                                        required: true,
                                        minLength: {
                                            value: 4,
                                            message:
                                                "длина от 4 до 10 символов",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message:
                                                "длина от 4 до 10 символов",
                                        },
                                    })}
                                    sx={{ width: "100%" }}
                                    label="пароль"
                                    type="password"
                                    size="small"
                                />

                                {errors.password && submitted ? (
                                    <Txt color={"red"}>
                                        {errors.password.message}
                                    </Txt>
                                ) : (
                                    <></>
                                )}
                            </Column>
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
