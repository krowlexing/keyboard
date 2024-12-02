import { useNavigate } from "react-router";
import { AppMenuItem, HeaderContainer } from "../AppHeader/styles";

export type MenuItems = "difficulty" | "create" | "edit" | "stats" | "exit";

interface Props {
    selected: MenuItems;
}

export function MenuHeader(props: Props) {
    const { selected } = props;
    const nav = useNavigate();
    return (
        <HeaderContainer>
            <AppMenuItem
                selected={selected == "difficulty"}
                onClick={() => nav("/admin/difficulty")}
            >
                Настройка уровней сложности
            </AppMenuItem>
            <AppMenuItem
                selected={selected == "create"}
                onClick={() => nav("/admin/create")}
            >
                Создание упражнений
            </AppMenuItem>
            <AppMenuItem
                selected={selected == "edit"}
                onClick={() => nav("/admin/edit")}
            >
                Редактирование упражнений
            </AppMenuItem>
            <AppMenuItem
                selected={selected == "stats"}
                onClick={() => nav("/admin/stats")}
            >
                Статистика
            </AppMenuItem>
            <AppMenuItem selected={selected == "exit"}>Выхода нет</AppMenuItem>
        </HeaderContainer>
    );
}
