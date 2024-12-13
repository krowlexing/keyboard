import { useNavigate } from "react-router";
import { AppMenuItem, HeaderContainer } from "../AppHeader/styles";
import { Help } from "@mui/icons-material";
import { useState } from "react";
import { Paper } from "@mui/material";

export type MenuItems = "difficulty" | "create" | "edit" | "stats" | "exit";

interface Props {
    selected: MenuItems;
}

export function MenuHeader(props: Props) {
    const { selected } = props;
    const nav = useNavigate();
    const [modal, setModal] = useState(false);

    const selection = modal ? "info" : selected;

    return (
        <HeaderContainer>
            <AppMenuItem
                selected={selection == "difficulty"}
                onClick={() => nav("/admin/difficulty")}
            >
                Настройка уровней сложности
            </AppMenuItem>
            <AppMenuItem
                selected={selection == "create"}
                onClick={() => nav("/admin/create")}
            >
                Создание упражнений
            </AppMenuItem>
            <AppMenuItem
                selected={selection == "edit"}
                onClick={() => nav("/admin/edit")}
            >
                Редактирование упражнений
            </AppMenuItem>
            <AppMenuItem
                selected={selection == "stats"}
                onClick={() => nav("/admin/stats")}
            >
                Статистика
            </AppMenuItem>
            <AppMenuItem selected={selection == "exit"}>
                Выхода нет
                <AppMenuItem
                    sx={{ marginLeft: 2 }}
                    selected={selection == "info"}
                    onClick={() => setModal(true)}
                >
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <div>
                            <Help />
                        </div>
                        {modal && (
                            <>
                                <Paper
                                    sx={{
                                        zIndex: 10,
                                        position: "absolute",
                                        padding: "3px",
                                        width: "210px",
                                        top: "50px",
                                        right: "0px",
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
