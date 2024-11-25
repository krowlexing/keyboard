import { Tab, Text } from "./styles";

interface Props {
    position?: "top" | "none" | "bottom";
    selected?: boolean;
    level: string;
    onClick: () => void;
}

export function DifficultyLevelTab(props: Props) {
    const { level, selected, position, onClick } = props;
    const text = `Уровень сложности - ${level}`;
    return (
        <Tab selected={selected} position={position} onClick={onClick}>
            <Text>{text}</Text>
        </Tab>
    );
}
