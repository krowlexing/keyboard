type Props = {
    keyColor: string;
    value: string;
    alt: string;
};

export function FixedKey(props: Props) {
    const { keyColor, value, alt } = props;

    return (
        <div
            style={{
                width: "50px",
                height: "50px",
                textAlign: "center",
                position: "relative",
                margin: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: keyColor,
                border: "1px solid black",
                borderBottomWidth: "2px",
                borderRadius: 10,
            }}
        >
            <div style={{ position: "absolute", top: 3, right: 3 }}>{alt}</div>
            <div>{value}</div>
        </div>
    );
}
