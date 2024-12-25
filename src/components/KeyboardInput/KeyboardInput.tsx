import {
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    InvisibleInput,
    Placeholder,
    TextInputContainer,
    WrongInput,
} from "./styles";

interface Props {
    value: string;
    placeholder: string;
    disableInput?: boolean;
    onInput?: (char: string) => void;
}

export function KeyboardInput(props: Props) {
    const { value, placeholder, disableInput } = props;
    const allowInput = disableInput;
    const inputElement: MutableRefObject<HTMLInputElement> = useRef(null!);

    const spans = validate(value, placeholder).map((text, i) => {
        return text.good ? (
            <span key={i}>{text.text}</span>
        ) : (
            <WrongInput key={i}>{text.text}</WrongInput>
        );
    });

    const leftover = leftoverPlaceholder(value, placeholder);
    return (
        <>
            <TextInputContainer
                disabled={!allowInput}
                onClick={() => {
                    inputElement.current.focus();
                }}
            >
                <InvisibleInput
                    ref={inputElement}
                    value={value}
                    autoFocus={true}
                    disabled={!allowInput}
                    onChange={(e) => {
                        props.onInput?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (value.length >= placeholder.length) {
                            e.preventDefault();
                            return;
                        }
                        if (e.key === "Backspace") {
                            const target: HTMLInputElement =
                                e.target as HTMLInputElement;
                            e.preventDefault();
                        }
                    }}
                />

                {spans}
                <Placeholder>{leftover}</Placeholder>
            </TextInputContainer>
        </>
    );
}

function validate(
    value: string,
    placeholder: string
): { text: string; good: boolean }[] {
    const result = [];

    const length = Math.min(value.length, placeholder.length);

    for (let i = 0; i < length; i++) {
        let val = placeholder[i] == " " ? " " : placeholder[i];
        if (value[i] !== placeholder[i]) {
            result.push({ text: val, good: false });
        } else {
            result.push({ text: val, good: true });
        }
        // if (lookingForGood && value[i] !== placeholder[i]) {
        //     result.push(buf);
        //     buf = "";
        //     lookingForGood = false;
        // } else if (!lookingForGood && value[i] === placeholder[i]) {
        //     result.push(buf);
        //     buf = "";
        //     lookingForGood = true;
        // }
    }

    return result;
}

export function countErrors(value: string, placeholder: string): number {
    const length = Math.min(value.length, placeholder.length);
    let count = 0;
    for (let i = 0; i < length; i++) {
        if (value[i] !== placeholder[i]) {
            count++;
        }
    }
    return count;
}

function leftoverPlaceholder(value: string, placeholder: string): string {
    const length = Math.min(value.length, placeholder.length);
    let buf = "";
    for (let i = length; i < placeholder.length; i++) {
        buf += placeholder[i];
    }
    return buf;
}
