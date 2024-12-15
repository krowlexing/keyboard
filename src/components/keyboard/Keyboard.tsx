import { getKeyGroup, keyboard } from "../../data/keys";
import { Column, Row } from "../../utils/styles";
import { BigKey } from "./BigKey";
import { FixedKey } from "./FixedKey";

const specialKeys = [
    "back",
    "enter",
    "caps",
    "shift",
    "lshift",
    "spacebar",
    "tab",
];

type Props = {
    nextKey: string | undefined;
};

export function Keyboard(props: Props) {
    const { nextKey } = props;
    const keys = ["Й", "Ц", "У", "К", "Е", "Н"];
    return (
        <Column width={840}>
            {keyboard.map((row) => (
                <Row>
                    {row.map((key) => {
                        const group = getKeyGroup(key);
                        const color = group?.color || "white";
                        if (specialKeys.includes(key)) {
                            const align = ["enter", "lshift", "back"].includes(
                                key
                            )
                                ? "right"
                                : "left";

                            if (key === "spacebar") {
                                const color = nextKey == key ? "#a7e" : "white";
                                return (
                                    <BigKey
                                        keyColor={color}
                                        value="пробел"
                                        alt=" "
                                        align={"center"}
                                    />
                                );
                            }
                            return (
                                <BigKey
                                    keyColor={nextKey == key ? color : "white"}
                                    value={key}
                                    alt={key}
                                    align={align}
                                />
                            );
                        }
                        return (
                            <FixedKey
                                keyColor={nextKey == key ? color : "white"}
                                value={key}
                                alt={""}
                            />
                        );
                    })}
                </Row>
            ))}
        </Column>
    );
}
