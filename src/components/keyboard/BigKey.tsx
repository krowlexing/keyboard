type Props = {
    keyColor: string;
    value: string;
    alt: string;
    align: "left" | "right" | "center";
};

export function BigKey(props: Props) {
    const { keyColor, value, alt } = props;

    return (
        <div
            style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                flex: 1,
                height: "50px",
                textAlign: "center",
                position: "relative",
                margin: "3px",
                display: "flex",
                justifyContent: props.align,
                alignItems: "center",
                background: keyColor,
                border: "1px solid black",
                borderBottomWidth: "2px",
                borderRadius: 10,
            }}
        >
            <div style={{ position: "absolute", top: 3, right: 3 }}>{""}</div>
            <div>{value}</div>
        </div>
    );
}
