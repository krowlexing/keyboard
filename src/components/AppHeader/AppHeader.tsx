import { useNavigate } from "react-router-dom";
import { AppMenuItem, HeaderContainer, Text } from "./styles";
import { useState } from "react";
import { Paper } from "@mui/material";

interface Props {
    selected: "exercises" | "statistics" | "info" | "exit";
}

export function AppHeader(props: Props) {
    const { selected } = props;
    const nav = useNavigate();

    const [modal, setModal] = useState(false);

    const selection = modal ? "info" : selected;

    const exit = () => {
        localStorage.removeItem("token");
        nav("/auth/login");
    };

    return (
        <HeaderContainer>
            <AppMenuItem
                selected={selection == "exercises"}
                onClick={() => nav("/exercises")}
            >
                Упражнения
            </AppMenuItem>
            <AppMenuItem
                selected={selection == "statistics"}
                onClick={() => nav("/stats")}
            >
                Статистика
            </AppMenuItem>
            <AppMenuItem
                selected={selection == "info"}
                onClick={() => setModal(true)}
            >
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    <div>Справочная информация</div>
                    {modal && (
                        <>
                            <Paper
                                sx={{
                                    zIndex: 10,
                                    position: "absolute",
                                    padding: "3px",
                                    width: "210px",
                                    top: "50px",
                                    left: "-5px",
                                    borderRadius: "5px",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div style={{ marginBottom: "10px" }}>
                                    <a href="/dev.html">
                                        Сведения о разработчиках
                                    </a>
                                </div>
                                <div>
                                    <a href="/system.html">
                                        Сведения о системе
                                    </a>
                                </div>
                            </Paper>
                        </>
                    )}
                </div>
            </AppMenuItem>
            <AppMenuItem selected={selected == "exit"} onClick={exit}>
                Выхода нет
            </AppMenuItem>
            {modal && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                    }}
                    onClick={() => {
                        setModal(false);
                    }}
                ></div>
            )}
        </HeaderContainer>
    );
}
