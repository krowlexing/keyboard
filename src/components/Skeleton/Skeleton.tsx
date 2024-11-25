import { AppHeader } from "../AppHeader";

interface Props {
    selected: "exercises" | "statistics" | "info" | "exit";
    children?: React.ReactNode;
}

export function Skeleton(props: Props) {
    const { selected, children } = props;
    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "#999",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppHeader selected={selected} />
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    margin: 20,
                    background: "white",
                    borderRadius: 10,
                }}
            >
                {children}
            </div>
        </div>
    );
}
