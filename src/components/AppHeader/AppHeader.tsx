import { useNavigate } from "react-router-dom";
import { AppMenuItem, HeaderContainer, Text } from "./styles";

interface Props {
    selected: "exercises" | "statistics" | "info" | "exit";
}

export function AppHeader(props: Props) {
    const { selected } = props;
    const nav = useNavigate();
    return (
        <HeaderContainer>
            <AppMenuItem
                selected={selected == "exercises"}
                onClick={() => nav("/exercises")}
            >
                Упражнения
            </AppMenuItem>
            <AppMenuItem
                selected={selected == "statistics"}
                onClick={() => nav("/stats")}
            >
                Статистика
            </AppMenuItem>
            <AppMenuItem selected={selected == "info"}>
                Справочная информация
            </AppMenuItem>
            <AppMenuItem selected={selected == "exit"}>Выхода нет</AppMenuItem>
        </HeaderContainer>
    );
}
