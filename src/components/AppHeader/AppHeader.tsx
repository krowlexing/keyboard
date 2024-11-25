import { AppMenuItem, HeaderContainer, Text } from "./styles";

interface Props {
    selected: "exercises" | "statistics" | "info" | "exit";
}

export function AppHeader(props: Props) {
    return (
        <HeaderContainer>
            <AppMenuItem selected>Упражнения</AppMenuItem>
            <AppMenuItem>Статистика</AppMenuItem>
            <AppMenuItem>Справочная информация</AppMenuItem>
            <AppMenuItem>Выхода нет</AppMenuItem>
        </HeaderContainer>
    );
}
