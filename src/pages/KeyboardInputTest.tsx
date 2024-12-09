import { useEffect, useState } from "react";
import { KeyboardInput } from "../components/KeyboardInput";
import { useParams } from "react-router";
import { network } from "../network/network";

interface Props {}

export function KeyboardInputTest(props: Props) {
    const { id } = useParams();

    const [exampleText, setExampleText] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        network.exercises.get(+id!).then((e) => {
            setExampleText(e.text);
        });
    }, [id]);

    if (id == null) {
        return <div>а где id....</div>;
    }

    return (
        <>
            <KeyboardInput
                value={value}
                placeholder={exampleText}
                onInput={(char) => {
                    setValue((val) => char);
                }}
            />
            <button onClick={() => setValue("")}>reset</button>
        </>
    );
}
